#!/bin/bash
set -e
echo "Waiting for MinIO..."
until curl -f http://minio:9000/minio/health/live 2>/dev/null || curl -f http://postgres:5432 2>/dev/null || true; do sleep 2; break; done
python -c "
import boto3, os, time
from botocore.client import Config
time.sleep(2)
try:
    s3 = boto3.client('s3', endpoint_url=os.getenv('S3_ENDPOINT'), aws_access_key_id=os.getenv('S3_ACCESS_KEY'), aws_secret_access_key=os.getenv('S3_SECRET_KEY'), config=Config(signature_version='s3v4'), region_name='us-east-1')
    s3.create_bucket(Bucket=os.getenv('S3_BUCKET', 'reviewfactory'))
    print('Bucket created')
except Exception as e:
    print(f'Bucket: {e}')
"
playwright install chromium || true
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
