# Ascii-art-server

This backend service will create an HTTP endpoint to receive upload text file and webocket stream to send content of text file back to client line by line in given interval

## HTTP Endpoints

### POST /uploads
Uploads text file to server with interval. Text file content and interval is only stored into memory and will be deleted after streaming it complete.

#### Request

```
curl 'http://example.com/upload' \
  -X POST
  -H 'accept-language: en-US,en;q=0.9,tr;q=0.8' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundaryl2ODpiMqEmKFf9yT' \
  --data-raw $'------WebKitFormBoundaryl2ODpiMqEmKFf9yT\r\nContent-Disposition: form-data; name="file"; filename="astro.txt"\r\nContent-Type: text/plain\r\n\r\n\r\n------WebKitFormBoundaryl2ODpiMqEmKFf9yT\r\nContent-Disposition: form-data; name="interval"\r\n\r\n33\r\n------WebKitFormBoundaryl2ODpiMqEmKFf9yT--\r\n'
```
#### Response
```json
{ "fileId": "5d77909b-e5b4-4f8b-aeb4-1551aefe92a8" }
```

## WebSocket Stream
Streams uploaded text file back to user line by line in given interval.

#### Request

```
curl 'wss://example.com/?fileId=5d77909b-e5b4-4f8b-aeb4-1551aefe92a8' \
  -H 'Upgrade: websocket' \
  -H 'Origin: https://ascii-art-306j.onrender.com' \
  -H 'Cache-Control: no-cache' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8' \
  -H 'Pragma: no-cache' \
  -H 'Connection: Upgrade' \
  -H 'Sec-WebSocket-Key: S8FdOOChMSTqedQfnza3gA==' \
  -H 'Sec-WebSocket-Version: 13' \
  -H 'Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits'
```

#### Message
```json
{ "line":"Hello \n", "percentage":50 }
```


## Installing and Running with Docker Compose or Docker

### Install Docker Desktop
Use [this page](https://docs.docker.com/desktop/) to installation guide for your system(MacOs, Linux, Windows)

### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:3000.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

## Installing and Running Manually
Install node version 23.1.0 later. You can use [NVM](https://github.com/nvm-sh/nvm) to install different node versions.

### Install Dependencies
`npm install`

### Run Server
`npm run dev`
This will run nodejs server on `http://localhost:3000`