S3BUCKET=aws-workshop
STAGE=dev

aws cloudformation package \
  --template-file backend.yaml \
  --output-template-file serverless-output.yaml \
  --s3-bucket $S3BUCKET

aws cloudformation deploy \
   --template-file serverless-output.yaml \
   --stack-name "$S3BUCKET-$STAGE"
