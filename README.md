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
id (varchar[255], primary)
username (varchar[255], not null)
email (varchar[255], not null)
password (varchar[255], not null)
gender (varchar[255], not null)
birthDate (date, not null)
height (integer[11], not null)
weight (integer[11], not null)
cholesterol (integer[11], not null)
glucose (integer[11], not null)
fatneed (float[11])
proteinneed (float[11])
caloryneed (float[11])
fiberneed (float[11])
carbohidrateNeed (float[11])
refresh_token (string[255])
- Table intakeusers:
id (varchar[255], primary)
userid (reference to users)
healthstatus (varchar[255])
fatintake (float[11])
caloryintake (float[11])
fiberintake (float[11])
carbohidrateintake (float[11])
feedback (varchar[255])


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

## API SPEC DOCUMENTATION

- link : https://app.swaggerhub.com/apis-docs/
- use swagger preview in vscode
1. Install swagger preview extensions in vscode
2. right click in file sdciwaregu-api-spec.yaml -> swagger preview
3. or just use shift+ctrl+p in file yaml

