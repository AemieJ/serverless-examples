'use strict';
const AWS = require("aws-sdk");

exports.handler = function (event, context) {
    const s3 = new AWS.S3();
    const sourceBucket = "entry-bucket-demo";
    const destinationBucket = "backup-bucket-demo";

    const objectKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const copySource = encodeURI(sourceBucket + '/' + objectKey);
    const copyParams = { 
        Bucket: destinationBucket, 
        CopySource: copySource, 
        Key: objectKey 
    };
    s3.copyObject(copyParams, function (err, data) {
        if (err) console.log(err);
        else console.log('Data has been backed up');
    });
};