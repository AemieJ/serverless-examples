## Microservice-like architecture with AWS Lambda + API Gateway + Serverless framework

1. Here, you will observe 2 services, namely `greet-service` having the collection of api endpoints `/user/{PROXY}` and `list-service` having the collection of endpoints `/list/{PROXY}`.

2. Create an API endpoint in AWS Console and copy its **API Id** and **Resource API Id** and place it in the `serverless.yaml` by replacing the following lines in it: 
```
apiGateway: 
    restApiId: <API ID>
    restApiRootResourceId: <Resource API ID>
```
and make any necessary changes in the configuration as per your AWS account.

2. Deploy the 2 services using the following instructions: 

```
$ cd greet-service
$ yarn && yarn deploy
$ cd .. && cd list-service
$ yarn && yarn deploy
```

> You need to perform `yarn` only for first time installation only. 

### Try it out! 
You will observe that these different services in lambda all point to the same api endpoint in API Gateway. You can try this API Gateway endpoints by yourself and experiment!