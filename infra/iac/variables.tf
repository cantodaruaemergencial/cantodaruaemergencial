variable "project" {
  type = string
}

variable "region" {
  type    = string
  default = "us-east1"
}

variable "zone" {
  type    = string
  default = "us-east1-d"
}

variable "google_client_id" {
  type = string
}

variable "google_client_secret" {
  type = string
}

variable "dns_managed_zone_name" {
  type    = string
  default = "canto-da-rua-dns-zone"
}