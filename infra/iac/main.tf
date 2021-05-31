terraform {
  backend "gcs" {
    bucket = "cantodarua_tfstate"
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

provider "google-beta" {
  project = var.project
}

resource "google_sql_database_instance" "db" {
  name                = "${var.project}-mysql-2"
  database_version    = "MYSQL_8_0"
  region              = var.region
  deletion_protection = false

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      ipv4_enabled = "true"
      authorized_networks {
        value = "0.0.0.0/0"
      }
    }

  }
}

output "database_public_ip" {
  value = google_sql_database_instance.db.public_ip_address
}

module "db_schema" {
  source = "./modules/mysql_schema"

  project                = var.project
  name                   = "${var.project}-db"
  database_instance_name = google_sql_database_instance.db.name
}

output "db_schema" {
  value = module.db_schema.credentials
}

module "api" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "api"
  image                 = "gcr.io/cantodarua/api:42223af589755fe820adac57b4ef840d6f441593"
  url                   = "api.cantodaruaemergencial.com.br"
  dns_managed_zone_name = var.dns_managed_zone_name

  env_vars = [
    {
      name  = "DATABASE_HOST"
      value = google_sql_database_instance.db.public_ip_address
    },
    {
      name  = "DATABASE_NAME"
      value = module.db_schema.credentials.name
    },
    {
      name  = "DATABASE_USERNAME"
      value = module.db_schema.credentials.user
    },
    {
      name  = "DATABASE_PASSWORD"
      value = module.db_schema.credentials.pass
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

output "api" {
  value = module.api.urls
}

module "app" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "app"
  image                 = "gcr.io/cantodarua/app:190a10d01a1568e6e20dce725c9798b6d1d24f60"
  url                   = "www.cantodaruaemergencial.com.br"
  url2                  = "cantodaruaemergencial.com.br"
  dns_managed_zone_name = var.dns_managed_zone_name
  container_port        = 3000

  env_vars = [
    {
      name  = "NEXT_PUBLIC_STRAPI_API_URL"
      value = module.api.urls.public_url
    }
  ]
}

output "app" {
  value = module.app.urls
}
