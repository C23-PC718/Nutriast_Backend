# Nutriast JS API

## Project Description
### Title:
NutriAst App - CC/API Backend
### Description:
Our project scope includes developing a mobile app that enables users to input their daily food and beverage intake, comparing their nutrient intake to daily nutritional requirements using a dataset containing nutritional information for various foods. The app provides positive feedback if the intake meets daily nutritional needs and offers suggestions if it is insufficient or excessive. Additionally, the app has a weekly health condition survey feature to monitor users' health and provide tailored advice. The system stores users' historical data and uses machine learning to make predictions about future eating patterns.
### Team and JobDesk:
The project is divided into three teams that collaborate to create an ML-based prediction application. The ML team creates a model in Python, the CC team creates APIs in Python and JavaScript for database and prediction purposes, and the MD team develops the front-end and builds a mobile application.
### Tools
> Languages: NodeJS (express)

> VSCode as IDE

> Google Cloud Platform: App Engine, CloudSQL DB, Bucket Storage
...
### Database
- Table users:
-> id (varchar[255], primary)
-> Username (varchar[255], not null)
-> Email (varchar[255], not null)
-> Password (varchar[255], not null)
-> Gender (varchar[255], not null)
-> BirthDate (date, not null)
-> Height (float[11], not null)
-> Weight (float[11], not null)
-> FatNeed (float[11], not null)
-> ProteinNeed (float[11], not null)
-> CaloryNeed (float[11], not null)
-> FibreNeed (float[11], not null)
-> CarbohidrateNeed (float[11], not null)
- Intake users:
-> id (varchar[255], primary)
-> user_id (ForeignKey to users)
-> HealthStatus (varchar[255]])
-> FatIntake (float[11])
-> CaloryIntake (float[11])
-> FiberIntake (float[11])
-> CarbohidrateIntake (float[11])
-> Feedback (float[11])


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
