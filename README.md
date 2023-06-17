[![License: AGPL-3.0-or-later](https://img.shields.io/github/license/MatthiasKunnen/custom-ddns?style=for-the-badge)](./LICENSE.txt)

# Custom DDNS

Keep your A (ipv4) and AAAA (ipv6) records in sync with the public IP of your router. Useful in the following cases:
- Your router has DDNS functionality but does not support your DNS provider
- You do not want your router to have unlimited write access to your DNS records. E.g. you only need DDNS for a single subdomain and you have other 
- Your router supports DDNS and you want to update multiple DNS records across different domains and DNS providers.
- Your router does not have DDNS support, but you can implement a simple version yourself and want to do the heavier lifting on another system 

## Implementation
The following flow occurs on every IP update:  
`router -(notifies)> executor -(updates)> DNS provider`

The _router_, e.g. Unifi Dream Machine, must be configured to send a request to the _Executor_ with the new IP.

The _executor_ processes the new IP and updates the DNS records. 

The _DNS provider_, e.g. Cloudflare, provides an API that allows for updating the DNS records.

The reason behind this setup is to:
- Not store any API token on the router, this prevents the router from creating any DNS record (security consideration)
- Be able to support any DNS provider with an API using a single configuration file

### Routers
In theory, any router that supports a DDNS client can work. Some clients are explicitly tested and supported.

Follow these links to read how to configure the routers:
- [Unifi UDM](./routers/unifi-udm)

### Executors
Executors implement a public web server that takes requests from the routers. An executor is small and language/platform specific. Examples of platforms are Docker and Cloudflare Workers. The executor performs authentication and updates the DNS records using the configured [providers](#providers). 

Currently supported (platform/language):
- [Cloudflare Worker/TypeScript](./src/typescript/executors/cloudflare-worker)

### Providers
Providers are executed by the _Executors_ and contain the DNS provider specific code for updating the DNS records.

Currently supported (DNS provider/language):
- [Cloudflare/TypeScript](./src/typescript/providers/src/cloudflare) 

## Configuration and usage
Configuring Custom DDNS is done using `config.yaml`. 

Follow these steps:
- Based on your DNS provider, read the [provider specific documentation](#providers).
- Copy the [`config.example.yaml`](./config.example.yaml) to `config.yaml`.
- Change the configuration to meet your needs based on the provider you chose. A JSON schema is available to validate the YAML file: [`config.schema.json`](./config.schema.json).
- Verify your config by running `yarn run validate-config`
- Choose an [executor](#executors) and follow the deployment instructions.
- Configure your router to send the update request to the executor.

### Configuration spec
The source of truth for the `config.yaml` schema is the TypeScript [Config interface](./src/typescript/base/src/config.interface.ts). From this interface, the JSON schema [`config.schema.json`](./config.schema.json) is generated using `yarn run update-config-schema`.
