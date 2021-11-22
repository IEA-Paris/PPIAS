locals {
  common_vars = read_terragrunt_config(find_in_parent_folders("common.hcl"))
  s3_key_path = run_cmd("--terragrunt-quiet", "bash", "-c", "echo ${path_relative_to_include()} | cut -d'/' -f2- | tr -d '\n'")
  env_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
}

remote_state {
  backend = "s3"

  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }

  config = {
    bucket  = "${local.common_vars.inputs.project_name}-${local.env_vars.inputs.env}-tfstate"
    key     = "${local.s3_key_path}/terraform.tfstate"
    region  = local.common_vars.inputs.region
    encrypt = true
  }
}

inputs = merge(
  local.common_vars.inputs,
  local.env_vars.inputs
)
