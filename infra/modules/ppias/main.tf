provider "aws" {
  region  = var.region
}

#resource "aws_acm_certificate" "this" {}

locals {
  bucket_name = var.env == "prod" ? var.name : "${var.env}-${var.name}"
}

resource "aws_ssm_parameter" "cloudfront_distribution_id" {
  name  = "/${var.name}/cloudfront/id"
  type  = "String"
  value = aws_cloudfront_distribution.this.id
}

resource "aws_ssm_parameter" "s3_bucket_name" {
  name  = "/${var.name}/s3/name"
  type  = "String"
  value = aws_s3_bucket.this.bucket
}


resource "aws_cloudfront_origin_access_identity" "this" {}

data "aws_iam_policy_document" "this" {
  statement {
    actions = ["s3:GetObject"]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.this.iam_arn]
    }
    resources = ["${aws_s3_bucket.this.arn}/*"]
  }
}


resource "aws_s3_bucket" "this" {
  bucket = local.bucket_name
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.this.json
}

resource "aws_s3_bucket_website_configuration" "this" {
  bucket = aws_s3_bucket.this.bucket
}

resource "aws_cloudfront_distribution" "this" {
  /*     aliases                        = [
        "paris.pias.science",
    ] */
  enabled             = true
  http_version        = "http2"
  is_ipv6_enabled     = true
  price_class         = "PriceClass_All"
  retain_on_delete    = false
  tags                = {}
  tags_all            = {}
  wait_for_deployment = true
  default_root_object = "index.html"
  aliases             = var.env == "prod" ? ["paris.pias.science"] : []

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS",
    ]
    cached_methods = [
      "GET",
      "HEAD",
    ]
    compress               = true
    default_ttl            = 3600
    max_ttl                = 86400
    min_ttl                = 0
    smooth_streaming       = false
    target_origin_id       = "${local.bucket_name}.s3.${var.region}.amazonaws.com"
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      headers                 = []
      query_string            = false
      query_string_cache_keys = []

      cookies {
        forward           = "none"
        whitelisted_names = []
      }
    }
  }

  origin {
    connection_attempts = 3
    connection_timeout  = 10
    domain_name         = "${local.bucket_name}.s3-website.${var.region}.amazonaws.com"
    origin_id           = "${local.bucket_name}.s3.${var.region}.amazonaws.com"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = var.env == "prod" ? "arn:aws:acm:us-east-1:720928668014:certificate/35951fda-9368-462a-8c57-afe5c7556d41" : null
    cloudfront_default_certificate = var.env == "prod" ? false : true
    minimum_protocol_version       = "TLSv1.2_2021"
    ssl_support_method             = "sni-only"
  }

}