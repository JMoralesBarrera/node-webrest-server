con este comando desde la powershell puedo generar un certificado ssl.

Invoke-Expression "& 'C:\Program Files\Git\usr\bin\openssl.exe' req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt"
