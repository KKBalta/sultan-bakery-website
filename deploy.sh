#!/bin/bash

# Simple Docker build/push and Cloud Run deploy

set -e

# Config (edit as needed)
PROJECT_ID="sultan-bakery-cafe"
SERVICE_NAME="sultan-bakery"
REGION="us-east1"
REPO_NAME="sultan-bakery-repo"

IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:latest"

echo "📋 Using project: ${PROJECT_ID} | region: ${REGION} | service: ${SERVICE_NAME}"
gcloud config set project ${PROJECT_ID} >/dev/null

echo "🔧 Ensuring required APIs are enabled (once per project)..."
gcloud services enable run.googleapis.com artifactregistry.googleapis.com >/dev/null

echo "🔐 Configuring Docker to authenticate to Artifact Registry..."
gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet

echo "📚 Ensuring Artifact Registry repo exists..."
if ! gcloud artifacts repositories describe ${REPO_NAME} --location=${REGION} >/dev/null 2>&1; then
  gcloud artifacts repositories create ${REPO_NAME} \
    --repository-format=docker \
    --location=${REGION} \
    --description="Docker repo for ${SERVICE_NAME}" >/dev/null
  echo "✅ Created repository: ${REPO_NAME} in ${REGION}"
else
  echo "✅ Repository exists: ${REPO_NAME} in ${REGION}"
fi

echo "🏗️  Building image for linux/amd64..."
docker build --platform=linux/amd64 -t ${IMAGE} .

echo "📦 Pushing image to Artifact Registry..."
docker push ${IMAGE}

echo "🚀 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE} \
  --region ${REGION} \
  --platform managed \
  --allow-unauthenticated \
  --port 8080

SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region=${REGION} --format="value(status.url)")
echo "✅ Deployed: ${SERVICE_URL}"
