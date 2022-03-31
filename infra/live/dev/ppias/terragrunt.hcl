terraform {
  source = "../../../modules//ppias"
}

include {
  path = find_in_parent_folders()
}
