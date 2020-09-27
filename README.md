# KPIs simulation client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

You will need [Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed n your system (tested with Node v14.9.0 and npm v6.14.7).

Install dependencies:

```bash
npm install
```

## Configuration

The app uses environment variables to load following configuration settings:

- API host url
- Mapbox API access token

Mapbox JS API is used to render a map with Geojson markers. A public API token is already provided in the app. If you want to use your own, you will need to create a free account and get an API Token from Mapbox: [https://account.mapbox.com/](https://account.mapbox.com/).

To change the default env variables without overriding `.env`, rename the file `.env.local.sample` into `.env.local` and fill in the correspoding variables. The variables defined here will be picked in favor of those from `.env`.

## Start the application

```bash
npm start
```

The app will run under `http://localhost:3000/`.

## Tests

```bash
npm run test
```
