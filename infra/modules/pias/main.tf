provider "aws" {
  region  = var.region
  profile = "prod"
}

#resource "aws_acm_certificate" "this" {}


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



resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.this.json
}




resource "aws_cloudfront_distribution" "this" {
    aliases                        = [
        "ppias.science",
    ]
    enabled                        = true
    http_version                   = "http2"
    is_ipv6_enabled                = true
    price_class                    = "PriceClass_All"
    retain_on_delete               = false
    tags                           = {}
    tags_all                       = {}
    wait_for_deployment            = true

    default_cache_behavior {
        allowed_methods        = [
            "GET",
            "HEAD",
        ]
        cached_methods         = [
            "GET",
            "HEAD",
        ]
        compress               = true
        default_ttl            = 86400
        max_ttl                = 31536000
        min_ttl                = 0
        smooth_streaming       = false
        target_origin_id       = "pppias.s3.eu-west-3.amazonaws.com"
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
        domain_name         = "ppias.s3-website.eu-west-3.amazonaws.com"
        origin_id           = "ppias.s3.eu-west-3.amazonaws.com"

        custom_origin_config {
            http_port                = 80
            https_port               = 443
            origin_keepalive_timeout = 5
            origin_protocol_policy   = "http-only"
            origin_read_timeout      = 30
            origin_ssl_protocols     = [
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
        acm_certificate_arn            = "arn:aws:acm:us-east-1:720928668014:certificate/6410e59c-599e-4ef8-ad49-b4eedd26c635"
        cloudfront_default_certificate = false
        minimum_protocol_version       = "TLSv1.2_2021"
        ssl_support_method             = "sni-only"
    }
}

resource "aws_s3_bucket" "this" {
    bucket                      = "ppias"
    hosted_zone_id              = "Z3R1K369G5AVDG"
    request_payer               = "BucketOwner"
    tags                        = {}
    tags_all                    = {}
    website_domain              = "s3-website.eu-west-3.amazonaws.com"
    website_endpoint            = "ppias.s3-website.eu-west-3.amazonaws.com"

    versioning {
        enabled    = false
        mfa_delete = false
    }

    website {
        error_document = "error.html"
        index_document = "index.html"
    }
}
