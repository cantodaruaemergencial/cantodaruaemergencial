module "db_schema_dev" {
  source = "./modules/mysql_schema"

  project                = var.project
  name                   = "${var.project}-db-dev"
  database_instance_name = google_sql_database_instance.db.name
}

output "dev_db_schema" {
  value = module.db_schema_dev.credentials
}

module "api_dev" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "api-dev"
  image                 = "gcr.io/cantodarua/api-dev@sha256:671a4a8e5fbb16c74be0f97dd7946c8c1222e7b8517ab2be67c1f4c7dd9ce5c8"
  url                   = "api-dev.cantodaruaemergencial.com.br"
  dns_managed_zone_name = var.dns_managed_zone_name

  env_vars = [
    {
      name  = "DATABASE_HOST"
      value = google_sql_database_instance.db.public_ip_address
    },
    {
      name  = "DATABASE_NAME"
      value = module.db_schema_dev.credentials.name
    },
    {
      name  = "DATABASE_USERNAME"
      value = module.db_schema_dev.credentials.user
    },
    {
      name  = "DATABASE_PASSWORD"
      value = module.db_schema_dev.credentials.pass
    }
  ]
}

output "dev_api" {
  value = module.api_dev.urls
}


module "app_dev" {
  source = "./modules/static_website"

  project               = var.project
  website_domain_name   = "dev.cantodaruaemergencial.com.br"
  create_dns_entry      = true
  dns_managed_zone_name = var.dns_managed_zone_name
}

output "dev_app" {
  value = module.app_dev.website_url
}
