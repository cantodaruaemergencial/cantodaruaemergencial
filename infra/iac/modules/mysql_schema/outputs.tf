output "credentials" {
  value = {
    name = var.name
    user = google_sql_user.user.name
    pass = random_id.password.hex
  }
}