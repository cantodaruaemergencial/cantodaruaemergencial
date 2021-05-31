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
  image                 = "gcr.io/cantodarua/api-dev:e6bc4793194d1a24c0d3e695148763e338a18e20"
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
    },
    {
      name  = "GOOGLE_CLIENT_ID"
      value = var.google_client_id
    },
    {
      name  = "GOOGLE_CLIENT_SECRET"
      value = var.google_client_secret
    }
  ]
}

output "dev_api" {
  value = module.api_dev.urls
}