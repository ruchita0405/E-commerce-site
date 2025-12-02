# 🌐 Frontend Setup

## Initialise

npm init


## Install 

npm install


## Install main dependencies

npm install axios@^1.13.2 daisyui@^5.5.5 react@^19.2.0 react-dom@^19.2.0 react-router-dom@^7.9.6


## Install development tools

npm install -D @eslint/js@^9.39.1 @originjs/vite-plugin-federation@^1.4.1 @types/react@^19.2.5 @types/react-dom@^19.2.3 @vitejs/plugin-react@^5.1.1 autoprefixer@^10.4.22 concurrently@^9.2.1 eslint@^9.39.1 eslint-plugin-react-hooks@^7.0.1 eslint-plugin-react-refresh@^0.4.24 globals@^16.5.0 postcss@^8.5.6 tailwindcss@^3.4.18 vite@^7.2.4


## Start the frontend
npm run dev





# 🛠 Backend Setup

## Initialize 

npm init

## Install node modules

npm install


## Install backend dependencies
These libraries power the backend API, authentication, validation, and database:

npm install bcryptjs@^2.4.3 cors@^2.8.5 dotenv@^16.0.3 express@^4.18.2 express-mongo-sanitize@^2.2.0 express-rate-limit@^7.5.1 helmet@^7.1.0 joi@^17.11.0 jsonwebtoken@^9.0.2 mongoose@^8.0.3


## Install Nodemon for auto-restart during development

npm install -D nodemon@^3.0.2


## Environment Setup
Copy .env.example → .env, then fill in the values.

## To generate a secure JWT secret, run:

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"


## Paste the generated key into your .env file like:

JWT_SECRET=your_super_secret_string


## (Optional) Seed the database
If your project includes seed data, run:

npm run script/seed.js
or
node script/seed.js


## Start the backend server

npm run dev


Your backend API should now be live. 🚀


# Rough directory structure:

ecommerce-platform/
│
├── gateway/                             <-- API Gateway
│   └── spring-cloud-gateway/
│
├── microservices/
│   ├── product-service/                 <-- Node.js
│   ├── cart-service/                    <-- Spring Boot
│   └── auth-service/                    <-- Spring Boot
│
└── microfrontends/
    ├── homepage-mfe/                    <-- Node.js/React/Vue etc.
    ├── cart-mfe/
    └── auth-mfe/
