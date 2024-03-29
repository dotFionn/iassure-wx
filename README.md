# IASsure-WX

## idea

This service is designed to gather weather data to be used by [IASsure](https://github.com/MorpheusXAUT/IASsure) by [MorpheusXAUT](https://github.com/MorpheusXAUT). It uses the [Open-Meteo.com](https://open-meteo.com)-API to gather the necessary data to provide to the plugin.

## Installation/Deployment

IASsure-WX can be installed using docker. The image is available at `hub.fsisp.de/library/iassure-wx`.

Tags:
  - `latest` - The newest recommended build, built from `main`
  - `dev` - The newest development/staging build, built from `develop`
  - Other than those tags, every image is tagged with the git commit id

## Configuration

IASsure-WX can be configured using the `wx-config.json`-file. For now it contains test data but will include production data for at least the Langen FIR. It necessary, another file can be mounted on top of it (`/opt/wx-config.json`). You may also choose to make the necessary changes to the file in this repository. The file is documented in the schema definition file (`wx-config.schema.json`).

## Environment Variables

Some options can be defined using environment variables:

```bash 
# defines the port, the application will listen on
PORT=3000
# defines the base path used for the api
BASE_PATH=/api
# defines ips that are allowed as proxy ips
# See http://expressjs.com/en/guide/behind-proxies.html
TRUST_PROXY=
# set to true to disable /api-Endpoint. will also disable frontend.
DISABLE_DEFAULT_API_ENDPOINT=
```
