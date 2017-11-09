# exist script as soon as a command exits 
# with status code != 0
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/../../../infra/variables.sh" 
STACK_NAME="${PROJECT_NAME}-todomvc-frontend"


function update_stack {
  echo ">>> packaging cloudformation stack ..."
  aws cloudformation package \
    --region ${REGION} \
    --template-file "${DIR}/todomvc-frontend-stack.yaml" \
    --output-template-file "${DIR}/todomvc-frontend-stack-output.yaml" \
    --s3-bucket "${S3BUCKET_STACK}"


  echo ">>> deploying cloudformation stack ..."
  aws cloudformation deploy \
    --region ${REGION} \
    --template-file "${DIR}/todomvc-frontend-stack-output.yaml" \
    --stack-name $STACK_NAME \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        HostedZoneId="${HOSTED_ZONE_ID}" \
        DomainName="${DOMAIN_NAME}" \
        AcmCertificateArn="${CERTIFICATE_ARN}"
}

function load_stack_output {
  OUTPUT_S3BUCKET=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --output text --query "Stacks[0].Outputs[2].OutputValue");
  OUTPUT_S3BUCKET_WEBSITE_URL=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --output text --query "Stacks[0].Outputs[1].OutputValue");
  OUTPUT_CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --output text --query "Stacks[0].Outputs[0].OutputValue");
}

function print_stack_output {
  echo "S3Bucket=${OUTPUT_S3BUCKET}"
  echo "S3BucketWebsiteURL=${OUTPUT_S3BUCKET_WEBSITE_URL}"
  echo "CloudFrontDistributionId=${OUTPUT_CLOUDFRONT_DISTRIBUTION_ID}"
}

function deploy {
  echo ">>> deploying build react application to S3 bucket ..."
  aws s3 sync "${DIR}/../build/" "s3://${OUTPUT_S3BUCKET}"

  echo ">>> creating invalidation for cloudfront ..."
  aws cloudfront create-invalidation \
    --distribution-id "${OUTPUT_CLOUDFRONT_DISTRIBUTION_ID}" \
    --paths "/*" > /dev/null
}


case $1 in
"stack")
  update_stack
  ;;
"web")
  load_stack_output
  deploy
  ;;
"output")
  load_stack_output
  print_stack_output
  ;;
*)
  update_stack
  load_stack_output
  deploy
  ;;
esac
