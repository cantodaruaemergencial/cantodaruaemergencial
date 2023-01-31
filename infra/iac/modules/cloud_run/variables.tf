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

variable "use_dns" {
  type    = bool
  default = true
}

variable "url" {
  type    = string
  default = ""
}

variable "url2" {
  type    = string
  default = ""
}

variable "dns_managed_zone_name" {
  type    = string
  default = "value"
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
