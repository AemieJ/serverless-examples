'use strict';
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const sourceBucket = "entry-bucket-demo";
const destinationBucket = "backup-bucket-demo";

exports.handler = async (event) => {
    let response;
    const objectKey = event.Records[0].s3.object.key;
    const copySource = encodeURI(sourceBucket + '/' + objectKey);
    const copyParams = { 
        Bucket: destinationBucket, 
        CopySource: copySource, 
        Key: objectKey 
    };

    try {
        let data = await s3.copyObject(copyParams).promise();
        response = {
            statusCode: 200,
            body: data
        };
    } catch (err) {
        response = {
            statusCode: 500,
            body: err
        };
    }

    return response;
};