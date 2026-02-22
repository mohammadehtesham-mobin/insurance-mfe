# Insurance Micro Frontend Application
## Overview

This project demonstrates a Micro Frontend (MFE) architecture for an Insurance application.

The application allows users to:
- View insurance policy details
- Initiate premium payment
- Process payment

The solution is built using Angular and Webpack Module Federation, and consists of a Container application and two independent Micro Frontends.

## Architecture

The system consists of three applications:

| Application | Port | Description |
|------------|------|-------------|
| Container App | 4200 | Host application that loads MFEs |
| Policy MFE | 4201 | Displays policy details and triggers payment |
| Payment MFE | 4202 | Receives premium amount and processes payment |

The Container dynamically loads MFEs at runtime using Webpack Module Federation.

## Cross-MFE Communication

Communication between Policy and Payment MFEs is implemented using:

- LocalStorage for shared data
- Custom Browser Event (`premium-updated`) for notification

Flow:
Policy MFE → stores premium amount → dispatches event  
Payment MFE → listens → reads data → updates UI

## Cross Cutting Concerns

The following cross-cutting concerns are implemented:

### 1. Webpack Bundling
Webpack Module Federation is used for runtime integration between Container and MFEs.

### 2. CSS Preprocessor
SCSS is used for styling across all applications.

### 3. Web Worker
Payment processing is handled in a Web Worker to simulate background processing.

Due to local development cross-origin constraints, an inline Blob-based worker is used.

### 4. Client Storage
LocalStorage is used to store premium data (no backend required).

## Technology Stack

- Angular 19
- TypeScript
- Webpack (Module Federation)
- SCSS
- Web Workers
- LocalStorage

## Project Structure

insurance-mfe/
│
├── container-app/
├── policy-mfe/
└── payment-mfe/

## How to Run Locally

### Install dependencies

In each application:

container-app
policy-mfe
payment-mfe

Run:
npm install

### Start applications (in separate terminals)

#### Policy MFE
ng serve --port 4201

#### Payment MFE
ng serve --port 4202

#### Container App
ng serve --port 4200

### Open browser
http://localhost:4200