# Vehicle Travel Details Calculation - Server (Backend)

## What is this project?
This is the Node.js/Express backend application for the Vehicle Travel Details Calculation project. It serves as the secure API and database handler, powered by MongoDB.

## What is the purpose of the project?
The primary purpose of this backend is to securely store and provide vehicle telemetry data (GPS coordinates, ignition status, timestamps) to the client application for analysis. It handles complex data processing, secure token issuance, and user session management.

## Main Features
* **Authentication System**: Secure user registration and login using JWT (JSON Web Tokens). It issues short-lived access tokens and secure HTTP-only refresh cookies for session persistence without compromising security.
* **Trip Data Management**: Provides structured REST API endpoints to retrieve massive arrays of vehicle telemetry data points efficiently.
* **Database Integration**: Connects to MongoDB via Mongoose to reliably store user accounts and vehicle trip logs.
* **REST API Architecture**: Clean, modular route structure separating authentication concerns from trip data retrieval.
