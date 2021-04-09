## Backing up data with Lambda & S3 

1. Create the buckets `entry-bucket-demo` and `backup-bucket-demo` in the s3 buckets with the default configuration.
2. From the terminal, run `yarn start`
    - If any update is applied, run `yarn update`
    - If you want to delete the lambda function along with its role, run `yarn delete`
3. Once the lambda function is created, go to the `entry-bucket-demo` and manually add an event configuration to trigger an event **(All object create events)** to the `backup` lambda function

### Try it out! 
Put any object in the `entry-bucket-demo` and the same file will be copied as backup in the `backup-bucket-demo`