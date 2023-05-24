# Nutriast JS API

## Installation
1. Clone repository following this command
```
https://github.com/slvally/Nutriast_Backend.git
```
2. Install dependencies
```
npm install
```
3. run application 
```
npm run dev
```

# API SPEC DOCUMENTATION
- link : https://app.swaggerhub.com/apis-docs/

# Deploy to GCP
1. clone and change directory
```
git clone <git_link> file_name
cd file_name
```
2. create image
```
gcloud builds submit --tag gcr.io/<project_id>/file_name
```
2. deploy image
```
gcloud run deploy --image gcr.io/<project_id>/file_name
```
3. deploy app
```
gcloud app deploy
```