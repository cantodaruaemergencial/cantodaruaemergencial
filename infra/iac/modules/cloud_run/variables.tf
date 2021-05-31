variable "project" {
  type = string
}

variable "region" {
  type = string
}

variable "name" {
  type = string
}

variable "image" {
  type = string
}

variable "url" {
  type = string
}

variable "url2" {
  type    = string
  default = ""
}

variable "dns_managed_zone_name" {
  type = string
}

variable "container_port" {
  type    = number
  default = 8080
}

variable "env_vars" {
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}
