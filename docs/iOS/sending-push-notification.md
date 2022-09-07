# Sending Push Notifications Using Command-Line Tools



## Premise

1. Prepare a DER-encoded certificate file. The file extension is `cer` .

2. Prepare a private key file. The file extension is `pem` .

:warning: If you export the certificate file and get the exported file with  `p12` extension. You can use the following command to convert the `p12` file to `pem` file.

```shell
openssl pkcs12 -in <absolute-path-of-p12-file> -out <absolute-path-of-pem-file> -nodes -passin 'pass:<password-of-p12-file>'

# if the password of p12 file is empty, use the following command
# openssl pkcs12 -in <absolute-path-of-p12-file> -out <absolute-path-of-pem-file> -nodes -passin 'pass:'
```

3. Prepare a device token from your app, as a hexadecimal-encoded ASCII string.



## Code

```bash
#! /bin/bash

CERTIFICATE_FILE_NAME="<absolute-path-of-cer-file"
CERTIFICATE_KEY_FILE_NAME="<absolute-path-of-pem-file"
TOPIC="<your-apps-bundle-id>"
DEVICE_TOKEN="<your-device-token-with-hexadecimal-fromat>"
APNS_HOST_NAME="api.sandbox.push.apple.com"

curl -v \
--header "apns-topic: ${TOPIC}" \
--header "apns-push-type: alert" \
--cert "${CERTIFICATE_FILE_NAME}" \
--cert-type DER \
--key "${CERTIFICATE_KEY_FILE_NAME}" \
--key-type PEM \
--data '{"aps":{"alert":"test"}}' \
--http2 "https://${APNS_HOST_NAME}/3/device/${DEVICE_TOKEN}"
```



## Reference

[Sending Push Notifications Using Command-Line Tool](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns/)

[Sending Notification Requests to APNs](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns/)

