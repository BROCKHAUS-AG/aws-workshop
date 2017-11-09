# exist script as soon as a command exits
# with status code != 0
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/../../../infra/variables.sh"
STACK_NAME="${PROJECT_NAME}-todomvc-backend"

function prepare_swagger_file {
  sed -e "s/<<region>>/${REGION}/g" \
      -e "s/<<accountId>>/${ACCOUNTID}/g" \
      "${DIR}/swagger.yaml" > "${DIR}/swagger-output.yaml"
}


function update_stack {
  echo ">>> packaging cloudformation stack ..."
  aws cloudformation package \
    --region ${REGION} \
    --template-file "${DIR}/todomvc-backend-stack.yaml" \
    --output-template-file "${DIR}/todomvc-backend-stack-output.yaml" \
    --s3-bucket "${S3BUCKET_STACK}"

  echo ">>> deploying cloudformation stack ..."
  aws cloudformation deploy \
    --region ${REGION} \
    --template-file "${DIR}/todomvc-backend-stack-output.yaml" \
    --stack-name "$STACK_NAME" \
    --capabilities CAPABILITY_IAM
}

case $1 in
"stack")
  prepare_swagger_file
  update_stack
  ;;
*)
  prepare_swagger_file
  update_stack
  ;;
esac

