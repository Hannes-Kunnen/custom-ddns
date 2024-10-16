"use strict";export const DdnsConfig = validate10;const schema11 = {"$id":"DdnsConfig","$ref":"#/definitions/Config","$schema":"http://json-schema.org/draft-07/schema#","definitions":{"CloudflareHost":{"anyOf":[{"$ref":"#/definitions/CloudflareHostAdvanced"},{"type":"string"}]},"CloudflareHostAdvanced":{"additionalProperties":false,"properties":{"name":{"description":"The Fully Qualified Domain Name to update the DNS record of.","type":"string"},"proxied":{"description":"Whether to enable proxy. If not specified, update will not overwrite existing setting and create will use the Cloudflare default.","type":["boolean","null"]},"ttl":{"description":"The Time To Live in seconds to be set on DNS records. If not specified, update will not set TTL and create will use automatic TTL.","type":["number","null"]}},"required":["name"],"type":"object"},"CloudflareProviderConfig":{"additionalProperties":false,"examples":[{"apiToken":{"from":"Env","name":"CLOUDFLARE_API_TOKEN"},"hosts":["foo.example.com",{"name":"bar.example.com","proxied":true,"ttl":60}],"zoneId":"06653d4635e1aa208992"}],"properties":{"apiToken":{"$ref":"#/definitions/Variable","description":"The API token used when updating DNS records on Cloudflare. Needs DNS:Edit permissions.","examples":[{"from":"Env","name":"CLOUDFLARE_API_TOKEN"}]},"hosts":{"description":"The hosts to update the DNS record of.","examples":[["foo.example.com",{"name":"bar.example.com","proxied":true,"ttl":60}]],"items":{"$ref":"#/definitions/CloudflareHost"},"type":"array"},"useHostsFromRequest":{"default":false,"description":"When `false` (default), only the hosts in the config will have their IP set. This is more secure as the router will not be able to set arbitrary A and AAAA records.\n\nWhen `true`, any hostname specified in the request will be updated. The hostnames specified in the request are combined with the `hosts` property.","type":["boolean","null"]},"zoneId":{"$ref":"#/definitions/Variable","description":"The Cloudflare Zone ID. See <https://developers.cloudflare.com/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/0>","examples":["0eb4e056cd3ad6653d4635e1aa208992"]}},"required":["apiToken","zoneId"],"type":"object"},"Config":{"additionalProperties":false,"description":"Schema for the configuration that powers the custom DDNS executors.","properties":{"configs":{"description":"The list of configs makes it possible to update multiple domains across multiple providers. See <http://github.com/MatthiasKunnen/custom-ddns/config.yaml>.","items":{"$ref":"#/definitions/ConfigsItem"},"type":"array"}},"required":["configs"],"type":"object"},"ConfigsItem":{"additionalProperties":false,"properties":{"authPassword":{"$ref":"#/definitions/Variable","description":"The password that is used to authenticate the update request."},"providers":{"$ref":"#/definitions/ProvidersConfig","description":"The providers. Multiple providers can be configured simultaneously."},"tag":{"description":"When specified, this limits this config item to only be executed when this tag is specified in the update query params.","type":["string","null"]}},"required":["authPassword","providers"],"type":"object"},"ProvidersConfig":{"additionalProperties":false,"description":"An object containing the provider (key), and its respective configuration (value).","properties":{"cloudflare":{"$ref":"#/definitions/CloudflareProviderConfig"}},"type":"object"},"Variable":{"anyOf":[{"type":"string"},{"additionalProperties":false,"properties":{"from":{"const":"Env","description":"Where to get the variable from.","type":"string"},"name":{"description":"The name of the variable.","type":"string"}},"required":["from","name"],"type":"object"}],"description":"Variables can either have their value set directly or the location of its value can be described.","examples":[{"var":"value"},{"var":{"from":"Env","name":"ENV_VAR"}}]}}};const schema12 = {"additionalProperties":false,"description":"Schema for the configuration that powers the custom DDNS executors.","properties":{"configs":{"description":"The list of configs makes it possible to update multiple domains across multiple providers. See <http://github.com/MatthiasKunnen/custom-ddns/config.yaml>.","items":{"$ref":"#/definitions/ConfigsItem"},"type":"array"}},"required":["configs"],"type":"object"};const schema13 = {"additionalProperties":false,"properties":{"authPassword":{"$ref":"#/definitions/Variable","description":"The password that is used to authenticate the update request."},"providers":{"$ref":"#/definitions/ProvidersConfig","description":"The providers. Multiple providers can be configured simultaneously."},"tag":{"description":"When specified, this limits this config item to only be executed when this tag is specified in the update query params.","type":["string","null"]}},"required":["authPassword","providers"],"type":"object"};const schema14 = {"anyOf":[{"type":"string"},{"additionalProperties":false,"properties":{"from":{"const":"Env","description":"Where to get the variable from.","type":"string"},"name":{"description":"The name of the variable.","type":"string"}},"required":["from","name"],"type":"object"}],"description":"Variables can either have their value set directly or the location of its value can be described.","examples":[{"var":"value"},{"var":{"from":"Env","name":"ENV_VAR"}}]};const schema15 = {"additionalProperties":false,"description":"An object containing the provider (key), and its respective configuration (value).","properties":{"cloudflare":{"$ref":"#/definitions/CloudflareProviderConfig"}},"type":"object"};const schema16 = {"additionalProperties":false,"examples":[{"apiToken":{"from":"Env","name":"CLOUDFLARE_API_TOKEN"},"hosts":["foo.example.com",{"name":"bar.example.com","proxied":true,"ttl":60}],"zoneId":"06653d4635e1aa208992"}],"properties":{"apiToken":{"$ref":"#/definitions/Variable","description":"The API token used when updating DNS records on Cloudflare. Needs DNS:Edit permissions.","examples":[{"from":"Env","name":"CLOUDFLARE_API_TOKEN"}]},"hosts":{"description":"The hosts to update the DNS record of.","examples":[["foo.example.com",{"name":"bar.example.com","proxied":true,"ttl":60}]],"items":{"$ref":"#/definitions/CloudflareHost"},"type":"array"},"useHostsFromRequest":{"default":false,"description":"When `false` (default), only the hosts in the config will have their IP set. This is more secure as the router will not be able to set arbitrary A and AAAA records.\n\nWhen `true`, any hostname specified in the request will be updated. The hostnames specified in the request are combined with the `hosts` property.","type":["boolean","null"]},"zoneId":{"$ref":"#/definitions/Variable","description":"The Cloudflare Zone ID. See <https://developers.cloudflare.com/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/0>","examples":["0eb4e056cd3ad6653d4635e1aa208992"]}},"required":["apiToken","zoneId"],"type":"object"};const schema18 = {"anyOf":[{"$ref":"#/definitions/CloudflareHostAdvanced"},{"type":"string"}]};const schema19 = {"additionalProperties":false,"properties":{"name":{"description":"The Fully Qualified Domain Name to update the DNS record of.","type":"string"},"proxied":{"description":"Whether to enable proxy. If not specified, update will not overwrite existing setting and create will use the Cloudflare default.","type":["boolean","null"]},"ttl":{"description":"The Time To Live in seconds to be set on DNS records. If not specified, update will not set TTL and create will use automatic TTL.","type":["number","null"]}},"required":["name"],"type":"object"};function validate15(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;const _errs0 = errors;let valid0 = false;const _errs1 = errors;const _errs2 = errors;if(errors === _errs2){if(data && typeof data == "object" && !Array.isArray(data)){let missing0;if((data.name === undefined) && (missing0 = "name")){const err0 = {instancePath,schemaPath:"#/definitions/CloudflareHostAdvanced/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"};if(vErrors === null){vErrors = [err0];}else {vErrors.push(err0);}errors++;}else {const _errs4 = errors;for(const key0 in data){if(!(((key0 === "name") || (key0 === "proxied")) || (key0 === "ttl"))){const err1 = {instancePath,schemaPath:"#/definitions/CloudflareHostAdvanced/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};if(vErrors === null){vErrors = [err1];}else {vErrors.push(err1);}errors++;break;}}if(_errs4 === errors){if(data.name !== undefined){const _errs5 = errors;if(typeof data.name !== "string"){const err2 = {instancePath:instancePath+"/name",schemaPath:"#/definitions/CloudflareHostAdvanced/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err2];}else {vErrors.push(err2);}errors++;}var valid2 = _errs5 === errors;}else {var valid2 = true;}if(valid2){if(data.proxied !== undefined){let data1 = data.proxied;const _errs7 = errors;if((typeof data1 !== "boolean") && (data1 !== null)){const err3 = {instancePath:instancePath+"/proxied",schemaPath:"#/definitions/CloudflareHostAdvanced/properties/proxied/type",keyword:"type",params:{type: schema19.properties.proxied.type},message:"must be boolean,null"};if(vErrors === null){vErrors = [err3];}else {vErrors.push(err3);}errors++;}var valid2 = _errs7 === errors;}else {var valid2 = true;}if(valid2){if(data.ttl !== undefined){let data2 = data.ttl;const _errs9 = errors;if((!((typeof data2 == "number") && (isFinite(data2)))) && (data2 !== null)){const err4 = {instancePath:instancePath+"/ttl",schemaPath:"#/definitions/CloudflareHostAdvanced/properties/ttl/type",keyword:"type",params:{type: schema19.properties.ttl.type},message:"must be number,null"};if(vErrors === null){vErrors = [err4];}else {vErrors.push(err4);}errors++;}var valid2 = _errs9 === errors;}else {var valid2 = true;}}}}}}else {const err5 = {instancePath,schemaPath:"#/definitions/CloudflareHostAdvanced/type",keyword:"type",params:{type: "object"},message:"must be object"};if(vErrors === null){vErrors = [err5];}else {vErrors.push(err5);}errors++;}}var _valid0 = _errs1 === errors;valid0 = valid0 || _valid0;if(!valid0){const _errs11 = errors;if(typeof data !== "string"){const err6 = {instancePath,schemaPath:"#/anyOf/1/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err6];}else {vErrors.push(err6);}errors++;}var _valid0 = _errs11 === errors;valid0 = valid0 || _valid0;}if(!valid0){const err7 = {instancePath,schemaPath:"#/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};if(vErrors === null){vErrors = [err7];}else {vErrors.push(err7);}errors++;validate15.errors = vErrors;return false;}else {errors = _errs0;if(vErrors !== null){if(_errs0){vErrors.length = _errs0;}else {vErrors = null;}}}validate15.errors = vErrors;return errors === 0;}function validate14(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(errors === 0){if(data && typeof data == "object" && !Array.isArray(data)){let missing0;if(((data.apiToken === undefined) && (missing0 = "apiToken")) || ((data.zoneId === undefined) && (missing0 = "zoneId"))){validate14.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];return false;}else {const _errs1 = errors;for(const key0 in data){if(!((((key0 === "apiToken") || (key0 === "hosts")) || (key0 === "useHostsFromRequest")) || (key0 === "zoneId"))){validate14.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];return false;break;}}if(_errs1 === errors){if(data.apiToken !== undefined){let data0 = data.apiToken;const _errs2 = errors;const _errs4 = errors;let valid2 = false;const _errs5 = errors;if(typeof data0 !== "string"){const err0 = {instancePath:instancePath+"/apiToken",schemaPath:"#/definitions/Variable/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err0];}else {vErrors.push(err0);}errors++;}var _valid0 = _errs5 === errors;valid2 = valid2 || _valid0;if(!valid2){const _errs7 = errors;if(errors === _errs7){if(data0 && typeof data0 == "object" && !Array.isArray(data0)){let missing1;if(((data0.from === undefined) && (missing1 = "from")) || ((data0.name === undefined) && (missing1 = "name"))){const err1 = {instancePath:instancePath+"/apiToken",schemaPath:"#/definitions/Variable/anyOf/1/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"};if(vErrors === null){vErrors = [err1];}else {vErrors.push(err1);}errors++;}else {const _errs9 = errors;for(const key1 in data0){if(!((key1 === "from") || (key1 === "name"))){const err2 = {instancePath:instancePath+"/apiToken",schemaPath:"#/definitions/Variable/anyOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};if(vErrors === null){vErrors = [err2];}else {vErrors.push(err2);}errors++;break;}}if(_errs9 === errors){if(data0.from !== undefined){let data1 = data0.from;const _errs10 = errors;if(typeof data1 !== "string"){const err3 = {instancePath:instancePath+"/apiToken/from",schemaPath:"#/definitions/Variable/anyOf/1/properties/from/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err3];}else {vErrors.push(err3);}errors++;}if("Env" !== data1){const err4 = {instancePath:instancePath+"/apiToken/from",schemaPath:"#/definitions/Variable/anyOf/1/properties/from/const",keyword:"const",params:{allowedValue: "Env"},message:"must be equal to constant"};if(vErrors === null){vErrors = [err4];}else {vErrors.push(err4);}errors++;}var valid3 = _errs10 === errors;}else {var valid3 = true;}if(valid3){if(data0.name !== undefined){const _errs12 = errors;if(typeof data0.name !== "string"){const err5 = {instancePath:instancePath+"/apiToken/name",schemaPath:"#/definitions/Variable/anyOf/1/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err5];}else {vErrors.push(err5);}errors++;}var valid3 = _errs12 === errors;}else {var valid3 = true;}}}}}else {const err6 = {instancePath:instancePath+"/apiToken",schemaPath:"#/definitions/Variable/anyOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};if(vErrors === null){vErrors = [err6];}else {vErrors.push(err6);}errors++;}}var _valid0 = _errs7 === errors;valid2 = valid2 || _valid0;}if(!valid2){const err7 = {instancePath:instancePath+"/apiToken",schemaPath:"#/definitions/Variable/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};if(vErrors === null){vErrors = [err7];}else {vErrors.push(err7);}errors++;validate14.errors = vErrors;return false;}else {errors = _errs4;if(vErrors !== null){if(_errs4){vErrors.length = _errs4;}else {vErrors = null;}}}var valid0 = _errs2 === errors;}else {var valid0 = true;}if(valid0){if(data.hosts !== undefined){let data3 = data.hosts;const _errs14 = errors;if(errors === _errs14){if(Array.isArray(data3)){var valid4 = true;const len0 = data3.length;for(let i0=0; i0<len0; i0++){const _errs16 = errors;if(!(validate15(data3[i0], {instancePath:instancePath+"/hosts/" + i0,parentData:data3,parentDataProperty:i0,rootData}))){vErrors = vErrors === null ? validate15.errors : vErrors.concat(validate15.errors);errors = vErrors.length;}var valid4 = _errs16 === errors;if(!valid4){break;}}}else {validate14.errors = [{instancePath:instancePath+"/hosts",schemaPath:"#/properties/hosts/type",keyword:"type",params:{type: "array"},message:"must be array"}];return false;}}var valid0 = _errs14 === errors;}else {var valid0 = true;}if(valid0){if(data.useHostsFromRequest !== undefined){let data5 = data.useHostsFromRequest;const _errs17 = errors;if((typeof data5 !== "boolean") && (data5 !== null)){validate14.errors = [{instancePath:instancePath+"/useHostsFromRequest",schemaPath:"#/properties/useHostsFromRequest/type",keyword:"type",params:{type: schema16.properties.useHostsFromRequest.type},message:"must be boolean,null"}];return false;}var valid0 = _errs17 === errors;}else {var valid0 = true;}if(valid0){if(data.zoneId !== undefined){let data6 = data.zoneId;const _errs19 = errors;const _errs21 = errors;let valid6 = false;const _errs22 = errors;if(typeof data6 !== "string"){const err8 = {instancePath:instancePath+"/zoneId",schemaPath:"#/definitions/Variable/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err8];}else {vErrors.push(err8);}errors++;}var _valid1 = _errs22 === errors;valid6 = valid6 || _valid1;if(!valid6){const _errs24 = errors;if(errors === _errs24){if(data6 && typeof data6 == "object" && !Array.isArray(data6)){let missing2;if(((data6.from === undefined) && (missing2 = "from")) || ((data6.name === undefined) && (missing2 = "name"))){const err9 = {instancePath:instancePath+"/zoneId",schemaPath:"#/definitions/Variable/anyOf/1/required",keyword:"required",params:{missingProperty: missing2},message:"must have required property '"+missing2+"'"};if(vErrors === null){vErrors = [err9];}else {vErrors.push(err9);}errors++;}else {const _errs26 = errors;for(const key2 in data6){if(!((key2 === "from") || (key2 === "name"))){const err10 = {instancePath:instancePath+"/zoneId",schemaPath:"#/definitions/Variable/anyOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};if(vErrors === null){vErrors = [err10];}else {vErrors.push(err10);}errors++;break;}}if(_errs26 === errors){if(data6.from !== undefined){let data7 = data6.from;const _errs27 = errors;if(typeof data7 !== "string"){const err11 = {instancePath:instancePath+"/zoneId/from",schemaPath:"#/definitions/Variable/anyOf/1/properties/from/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err11];}else {vErrors.push(err11);}errors++;}if("Env" !== data7){const err12 = {instancePath:instancePath+"/zoneId/from",schemaPath:"#/definitions/Variable/anyOf/1/properties/from/const",keyword:"const",params:{allowedValue: "Env"},message:"must be equal to constant"};if(vErrors === null){vErrors = [err12];}else {vErrors.push(err12);}errors++;}var valid7 = _errs27 === errors;}else {var valid7 = true;}if(valid7){if(data6.name !== undefined){const _errs29 = errors;if(typeof data6.name !== "string"){const err13 = {instancePath:instancePath+"/zoneId/name",schemaPath:"#/definitions/Variable/anyOf/1/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err13];}else {vErrors.push(err13);}errors++;}var valid7 = _errs29 === errors;}else {var valid7 = true;}}}}}else {const err14 = {instancePath:instancePath+"/zoneId",schemaPath:"#/definitions/Variable/anyOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};if(vErrors === null){vErrors = [err14];}else {vErrors.push(err14);}errors++;}}var _valid1 = _errs24 === errors;valid6 = valid6 || _valid1;}if(!valid6){const err15 = {instancePath:instancePath+"/zoneId",schemaPath:"#/definitions/Variable/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};if(vErrors === null){vErrors = [err15];}else {vErrors.push(err15);}errors++;validate14.errors = vErrors;return false;}else {errors = _errs21;if(vErrors !== null){if(_errs21){vErrors.length = _errs21;}else {vErrors = null;}}}var valid0 = _errs19 === errors;}else {var valid0 = true;}}}}}}}else {validate14.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}validate14.errors = vErrors;return errors === 0;}function validate13(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(errors === 0){if(data && typeof data == "object" && !Array.isArray(data)){const _errs1 = errors;for(const key0 in data){if(!(key0 === "cloudflare")){validate13.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];return false;break;}}if(_errs1 === errors){if(data.cloudflare !== undefined){if(!(validate14(data.cloudflare, {instancePath:instancePath+"/cloudflare",parentData:data,parentDataProperty:"cloudflare",rootData}))){vErrors = vErrors === null ? validate14.errors : vErrors.concat(validate14.errors);errors = vErrors.length;}}}}else {validate13.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}validate13.errors = vErrors;return errors === 0;}function validate12(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(errors === 0){if(data && typeof data == "object" && !Array.isArray(data)){let missing0;if(((data.authPassword === undefined) && (missing0 = "authPassword")) || ((data.providers === undefined) && (missing0 = "providers"))){validate12.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];return false;}else {const _errs1 = errors;for(const key0 in data){if(!(((key0 === "authPassword") || (key0 === "providers")) || (key0 === "tag"))){validate12.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];return false;break;}}if(_errs1 === errors){if(data.authPassword !== undefined){let data0 = data.authPassword;const _errs2 = errors;const _errs4 = errors;let valid2 = false;const _errs5 = errors;if(typeof data0 !== "string"){const err0 = {instancePath:instancePath+"/authPassword",schemaPath:"#/definitions/Variable/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err0];}else {vErrors.push(err0);}errors++;}var _valid0 = _errs5 === errors;valid2 = valid2 || _valid0;if(!valid2){const _errs7 = errors;if(errors === _errs7){if(data0 && typeof data0 == "object" && !Array.isArray(data0)){let missing1;if(((data0.from === undefined) && (missing1 = "from")) || ((data0.name === undefined) && (missing1 = "name"))){const err1 = {instancePath:instancePath+"/authPassword",schemaPath:"#/definitions/Variable/anyOf/1/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"};if(vErrors === null){vErrors = [err1];}else {vErrors.push(err1);}errors++;}else {const _errs9 = errors;for(const key1 in data0){if(!((key1 === "from") || (key1 === "name"))){const err2 = {instancePath:instancePath+"/authPassword",schemaPath:"#/definitions/Variable/anyOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};if(vErrors === null){vErrors = [err2];}else {vErrors.push(err2);}errors++;break;}}if(_errs9 === errors){if(data0.from !== undefined){let data1 = data0.from;const _errs10 = errors;if(typeof data1 !== "string"){const err3 = {instancePath:instancePath+"/authPassword/from",schemaPath:"#/definitions/Variable/anyOf/1/properties/from/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err3];}else {vErrors.push(err3);}errors++;}if("Env" !== data1){const err4 = {instancePath:instancePath+"/authPassword/from",schemaPath:"#/definitions/Variable/anyOf/1/properties/from/const",keyword:"const",params:{allowedValue: "Env"},message:"must be equal to constant"};if(vErrors === null){vErrors = [err4];}else {vErrors.push(err4);}errors++;}var valid3 = _errs10 === errors;}else {var valid3 = true;}if(valid3){if(data0.name !== undefined){const _errs12 = errors;if(typeof data0.name !== "string"){const err5 = {instancePath:instancePath+"/authPassword/name",schemaPath:"#/definitions/Variable/anyOf/1/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err5];}else {vErrors.push(err5);}errors++;}var valid3 = _errs12 === errors;}else {var valid3 = true;}}}}}else {const err6 = {instancePath:instancePath+"/authPassword",schemaPath:"#/definitions/Variable/anyOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};if(vErrors === null){vErrors = [err6];}else {vErrors.push(err6);}errors++;}}var _valid0 = _errs7 === errors;valid2 = valid2 || _valid0;}if(!valid2){const err7 = {instancePath:instancePath+"/authPassword",schemaPath:"#/definitions/Variable/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};if(vErrors === null){vErrors = [err7];}else {vErrors.push(err7);}errors++;validate12.errors = vErrors;return false;}else {errors = _errs4;if(vErrors !== null){if(_errs4){vErrors.length = _errs4;}else {vErrors = null;}}}var valid0 = _errs2 === errors;}else {var valid0 = true;}if(valid0){if(data.providers !== undefined){const _errs14 = errors;if(!(validate13(data.providers, {instancePath:instancePath+"/providers",parentData:data,parentDataProperty:"providers",rootData}))){vErrors = vErrors === null ? validate13.errors : vErrors.concat(validate13.errors);errors = vErrors.length;}var valid0 = _errs14 === errors;}else {var valid0 = true;}if(valid0){if(data.tag !== undefined){let data4 = data.tag;const _errs15 = errors;if((typeof data4 !== "string") && (data4 !== null)){validate12.errors = [{instancePath:instancePath+"/tag",schemaPath:"#/properties/tag/type",keyword:"type",params:{type: schema13.properties.tag.type},message:"must be string,null"}];return false;}var valid0 = _errs15 === errors;}else {var valid0 = true;}}}}}}else {validate12.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}validate12.errors = vErrors;return errors === 0;}function validate11(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(errors === 0){if(data && typeof data == "object" && !Array.isArray(data)){let missing0;if((data.configs === undefined) && (missing0 = "configs")){validate11.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];return false;}else {const _errs1 = errors;for(const key0 in data){if(!(key0 === "configs")){validate11.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];return false;break;}}if(_errs1 === errors){if(data.configs !== undefined){let data0 = data.configs;const _errs2 = errors;if(errors === _errs2){if(Array.isArray(data0)){var valid1 = true;const len0 = data0.length;for(let i0=0; i0<len0; i0++){const _errs4 = errors;if(!(validate12(data0[i0], {instancePath:instancePath+"/configs/" + i0,parentData:data0,parentDataProperty:i0,rootData}))){vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);errors = vErrors.length;}var valid1 = _errs4 === errors;if(!valid1){break;}}}else {validate11.errors = [{instancePath:instancePath+"/configs",schemaPath:"#/properties/configs/type",keyword:"type",params:{type: "array"},message:"must be array"}];return false;}}}}}}else {validate11.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}validate11.errors = vErrors;return errors === 0;}function validate10(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){/*# sourceURL="DdnsConfig" */;let vErrors = null;let errors = 0;if(!(validate11(data, {instancePath,parentData,parentDataProperty,rootData}))){vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);errors = vErrors.length;}validate10.errors = vErrors;return errors === 0;}
