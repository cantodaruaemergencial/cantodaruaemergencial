module "db_schema_mvp" {
  source = "./modules/mysql_schema"

  project                = var.project
  name                   = "${var.project}-db-mvp"
  database_instance_name = google_sql_database_instance.db.name
}

output "mvp_db_schema" {
  value = module.db_schema_mvp.credentials
}

module "api_mvp" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "api-mvp"
  image                 = "gcr.io/cantodarua/api-mvp:3030cada97bb4254a172da0e9945c9ab317183a8"
  url                   = "api-mvp.cantodaruaemergencial.com.br"
  dns_managed_zone_name = var.dns_managed_zone_name

  env_vars = [
    {
      name  = "DATABASE_HOST"
      value = google_sql_database_instance.db.public_ip_address
    },
    {
      name  = "DATABASE_NAME"
      value = module.db_schema_mvp.credentials.name
    },
    {
      name  = "DATABASE_USERNAME"
      value = module.db_schema_mvp.credentials.user
    },
    {
      name  = "DATABASE_PASSWORD"
      value = module.db_schema_mvp.credentials.pass
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

output "mvp_api" {
  value = module.api_mvp.urls
}

module "app_mvp" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "app-mvp"
  image                 = "gcr.io/cantodarua/app-mvp:31fee52d243716b1bd58d311479a22cc010e8028"
  url                   = "mvp.cantodaruaemergencial.com.br"
  dns_managed_zone_name = var.dns_managed_zone_name
  container_port        = 3000

  env_vars = [
    {
      name  = "NEXT_PUBLIC_STRAPI_API_URL"
      value = module.api_mvp.urls.public_url
    }
  ]
}

output "mvp_app" {
  value = module.app_mvp.urls
}
