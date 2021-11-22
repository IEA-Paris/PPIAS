terraform {
  source = "../../../modules//pias"
}

include {
  path = find_in_parent_folders()
}
