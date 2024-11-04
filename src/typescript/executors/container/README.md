# Container Executor

An executor built using Fastify that can be used anywhere a container can be run e.g. Google Cloud Run.

**Note**: this container also has a route for `/robots.txt`, see [routes](#routes).

## Build

The image needs to be built from the root of this repository, see the code below as an example.

```shell
docker build --tag *your-tag* -f  src/typescript/executors/container/Dockerfile .
```

## Deploy

Deploy this container can be done using any software that can deploy containers e.g. docker.
To access the `config.yaml` with the providers configuration, mount a file/folder to the container and point to it using the `CONFIG_FILE` environment variable.

The following environment variables can be used to change the behavior:

- `NODE_ENV` (default: `production`)  
  Changes the logging behavior to display pretty logs if set to `development`.
- `CONFIG_FILE` (default: `/config.yaml`)  
  The location of the providers config file.
- `PORT` (default: `5100`)  
  The port on which the Fastify server will listen.
- `HOST` (default: `0.0.0.0`)  
  The address on which the Fastify server will listen.

## Routes

### update-ip

`/update-ip` only accepts get request and requires `basic-authentication`.
The `username` is ignored, but the `password` should be the `authPassword` provided in the providers `config.yaml` file.  
**Note**: In case a tag is included, the `password` should be the `authPassword` of that specific config.

Query parameters:

- `ip` string **required**  
  The new IP address to use when updating the DNS records.
- `tags` comma-separated-string  
  List of tags to execute the DNS record update on.
- `hosts` comma-separated-string  
  List of additional hosts to update the DNS records of.  
  **Note**: this list is only used if the specific provider config has `useHostsFromRequest` enabled.

### robots.txt

`/robots.txt` only accepts get request and returns a simple `text/plain` result with the following content to disallow robots.
```text
User-agent: *
Disallow: /
```
