resource "google_sql_database" "schema" {
  name     = var.name
  project  = var.project
  instance = var.database_instance_name
}

resource "random_id" "password" {
  byte_length = 16
}

resource "google_sql_user" "user" {
  name     = "${var.name}-user"
  project  = var.project
  instance = var.database_instance_name
  host     = "%"
  password = random_id.password.hex
}