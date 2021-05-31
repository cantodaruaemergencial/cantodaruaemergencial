resource "google_cloud_run_service" "cloud_run" {
  name     = var.name
  location = var.region

  template {
    spec {
      containers {
        image = var.image
        ports {
          container_port = var.container_port
        }
        dynamic "env" {
          for_each = var.env_vars
          content {
            name  = env.value["name"]
            value = env.value["value"]
          }
        }
      }
    }
  }
  autogenerate_revision_name = true
}

resource "google_cloud_run_service_iam_member" "iam_member" {
  service  = google_cloud_run_service.cloud_run.name
  location = google_cloud_run_service.cloud_run.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_domain_mapping" "mapping" {
  location = var.region
  name     = var.url

  metadata {
    namespace = var.project
  }

  spec {
    route_name     = google_cloud_run_service.cloud_run.name
    force_override = true
  }
}

resource "google_dns_record_set" "cname" {
  provider     = google-beta
  depends_on   = [google_cloud_run_service.cloud_run]
  project      = var.project
  name         = "${var.url}."
  managed_zone = var.dns_managed_zone_name
  type         = "CNAME"
  ttl          = 300
  rrdatas      = ["ghs.googlehosted.com."]
}

resource "google_cloud_run_domain_mapping" "mapping2" {
  count    = var.url2 == "" ? 0 : 1
  location = var.region
  name     = var.url2

  metadata {
    namespace = var.project
  }

  spec {
    route_name     = google_cloud_run_service.cloud_run.name
    force_override = true
  }
}
