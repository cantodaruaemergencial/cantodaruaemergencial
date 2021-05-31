# Infra - Canto da rua

## Local dev setup

For local development, this Application uses `docker-compose` as a base engine for our environment.

First, clone the main projects from [CantoDaRua Github](https://github.com/cantodaruaemergencial) in the same folder,
your local folders should look like this:

```bash
project
  |
  |-- app
  |-- api
  |-- infra
```

**Setup you api .env file**, you can check the minimal configuration in `api/.env.example`

```bash
# in project/api
cp .env.example .env
```

> Ask for development variables if needed to a project administrator.

Now simply run:

```bash
# in project/infra
docker-compose up
```

### EACCES error

If in any case you encounter an `EACCES` error this can be due to docker.
To solve it it can be simple as:

```bash
sudo chown -R ${USER} <folder>
```

---

## Terraform setup

```bash
export TF_VAR_project="[gpc_project]"
export GOOGLE_APPLICATION_CREDENTIALS="[path]"

terraform init
terraform plan
terraform apply
```

- **services to enable on gcp:**

  - `cloudresourcemanager.googleapis.com`
  - `sqladmin.googleapis.com`
  - `run.googleapis.com`
  - `compute.googleapis.com`
  - `servicenetworking.googleapis.com`
  - `vpcaccess.googleapis.com`
  - `cloudbuild.googleapis.com`

- **permissions needed on automation custom role**:

  - `artifactregistry.repositories.create`
  - `artifactregistry.repositories.delete`
  - `artifactregistry.repositories.get`
  - `artifactregistry.repositories.list`
  - `artifactregistry.repositories.update`
  - `cloudsql.databases.create`
  - `cloudsql.databases.delete`
  - `cloudsql.databases.get`
  - `cloudsql.databases.list`
  - `cloudsql.databases.update`
  - `cloudsql.instances.create`
  - `cloudsql.instances.delete`
  - `cloudsql.instances.get`
  - `cloudsql.instances.list`
  - `cloudsql.instances.update`
  - `cloudsql.users.create`
  - `cloudsql.users.delete`
  - `cloudsql.users.list`
  - `cloudsql.users.update`
  - `run.services.create`
  - `run.services.delete`
  - `run.services.get`
  - `run.services.getIamPolicy`
  - `run.services.list`
  - `run.services.setIamPolicy`
  - `run.services.update`
  - `storage.objects.create`
  - `storage.objects.delete`
  - `storage.objects.get`
  - `storage.objects.getIamPolicy`
  - `storage.objects.list`
  - `storage.objects.setIamPolicy`
  - `storage.objects.update`
  - `dns.resourceRecordSets.create`
  - `dns.resourceRecordSets.delete`
  - `dns.resourceRecordSets.list`
  - `dns.resourceRecordSets.update`

- **TO-DO** @matheusaraujo verificar permissões

- **roles service account need**:

  - custom role above
  - `Cloud Build Editor`
  - `Service Account User`
  - `Cloud Run Admin`
  - `Viewer`

- create oauth consent screen
