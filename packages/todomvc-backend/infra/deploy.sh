# exist script as soon as a command exits
# with status code != 0
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/../../../infra/variables.sh"
STACK_NAME="${PROJECT_NAME}-todomvc-backend"

echo ">>> packaging cloudformation stack ..."
aws cloudformation package \
  --template-file "${DIR}/backend.yaml" \
  --output-template-file "${DIR}/serverless-output.yaml" \
  --s3-bucket "${S3BUCKET_STACK}"

echo ">>> deploying cloudformation stack ..."
aws cloudformation deploy \
   --template-file "${DIR}/serverless-output.yaml" \
   --stack-name "$STACK_NAME" \
   --capabilities CAPABILITY_IAM
