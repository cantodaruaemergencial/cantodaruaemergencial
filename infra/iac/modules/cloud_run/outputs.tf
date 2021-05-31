output "urls" {
  value = {
    "cloud_run_url" = google_cloud_run_service.cloud_run.status[0].url
    "public_url"    = "https://${var.url}"
  }
}
