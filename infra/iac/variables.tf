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

variable "dns_managed_zone_name" {
  type    = string  
}