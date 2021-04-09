## JWT Authentication flow with API Gateway + AWS Lambda with Mongo Atlas

1. Perform the following operations in the terminal:
```console
$ yarn 
$ yarn start
````
This will create an API gateway along with its respective lambda function and role. 

2. In mongo atlas, create a cluster and in the IP whitelist **Allow connection from everywhere** and perform a VPC peering with atlas. Step by step guide is provided from atlas itself. After this, click on connect to get the URI

3. Use this URI and move to your lambda function and create 3 environment variables
```
DB_CONNECT = <YOUR MONGO CONNECT URL>
TOKEN_SECRET = 10f98264e8506390aa03621b8975fdd173ff55f94a7685103e658518e66fb645
REFRESH_TOKEN_SECRET = 7fe9dae0d91c483b1a2960b3bc4b09cc6b2214e80e240161b97309dd841178ca
```

### Try it out! 
Go to the API gateway and within the stages section, get the base url and test out the endpoints in your favorite API tester including Postman, Talend API Tester, etc.