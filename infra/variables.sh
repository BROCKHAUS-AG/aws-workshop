ROOT_INFRA_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

USER_SETTINGS="${ROOT_INFRA_DIR}/user-settings.sh"
if [ ! -f $USER_SETTINGS ]; then
    echo "user-settings.sh not found! Please create and retry"
    exit 1
fi

source $USER_SETTINGS

PROJECT_NAME=aws-workshop

# Route 53
DOMAIN_NAME=aws-workshop.fraetz-playground.com
HOSTED_ZONE_ID=ZGQET3IBGFQ60

# Certificate Manager
CERTIFICATE_ARN=arn:aws:acm:us-east-1:218943744013:certificate/405b979f-8600-4d13-80d3-1599ed07cd30

# S3
S3BUCKET_STACK=aws-workshop-test