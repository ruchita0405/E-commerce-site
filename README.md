<div align="center">

# 🌿 EcoMart - E-Commerce Platform

### *Sustainable Shopping Made Simple*

![EcoMart Banner](./docs/images/banner.png)

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/cloud/atlas)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About

**EcoMart** is a full-stack e-commerce platform built with a **microservices architecture** that specializes in eco-friendly and sustainable products. The project demonstrates modern web development practices including JWT authentication, email verification, real-time cart management, and responsive UI design.

### 🎯 Project Goals

- Demonstrate microservices architecture
- Implement secure authentication with JWT
- Build responsive, animated user interfaces
- Showcase integration of multiple technologies
- Create production-ready, scalable code

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ User registration with email validation
- ✅ OTP-based email verification
- ✅ JWT token authentication
- ✅ Password hashing with BCrypt
- ✅ Role-based access control (Customer/Admin)
- ✅ Secure session management

### 🛒 E-Commerce Functionality
- ✅ Product catalog with categories
- ✅ Advanced search and filtering
- ✅ Shopping cart with real-time updates
- ✅ Stock management
- ✅ Order placement and tracking
- ✅ Email order confirmations

### 👨‍💼 Admin Features
- ✅ User management dashboard
- ✅ Product CRUD operations
- ✅ Stock updates
- ✅ Order management
- ✅ User role assignment

### 🎨 User Experience
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Dark mode support
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Form validation

---

## 🏗️ Architecture

### Microservices Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐         ┌──────────────────┐        │
│  │  Auth Frontend   │         │  Main Frontend   │        │
│  │  (React - 3000)  │         │ (React - 5173)   │        │
│  └────────┬─────────┘         └────────┬─────────┘        │
│           │                             │                   │
└───────────┼─────────────────────────────┼───────────────────┘
            │                             │
            │         API CALLS           │
            │                             │
┌───────────┼─────────────────────────────┼───────────────────┐
│           │     BACKEND SERVICES        │                   │
├───────────┼─────────────────────────────┼───────────────────┤
│           │                             │                   │
│  ┌────────▼─────────┐    ┌──────────────▼────────┐        │
│  │  Auth Service    │    │  Checkout Service     │        │
│  │  Spring Boot     │    │  Spring Boot          │        │
│  │  Port: 8080      │    │  Port: 8082           │        │
│  │  + JWT           │    │  + Email Service      │        │
│  │  + OTP           │    │  + Stock Management   │        │
│  └────────┬─────────┘    └──────────┬────────────┘        │
│           │                          │                      │
│           │              ┌───────────▼────────┐            │
│           │              │  Homepage Service  │            │
│           │              │  Node.js/Express   │            │
│           │              │  Port: 3001        │            │
│           │              │  + Cart API        │            │
│           │              │  + Products API    │            │
│           │              └───────────┬────────┘            │
│           │                          │                      │
└───────────┼──────────────────────────┼──────────────────────┘
            │                          │
            │     DATABASE LAYER       │
            │                          │
┌───────────┼──────────────────────────┼──────────────────────┐
│           │                          │                       │
│  ┌────────▼─────────┐    ┌──────────▼────────────┐        │
│  │  MySQL Database  │    │  MongoDB Atlas        │        │
│  │  (User Auth)     │    │  (Products, Cart,     │        │
│  │  Port: 3306      │    │   Orders)             │        │
│  └──────────────────┘    └───────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Service Communication Flow

![Architecture Flow](./docs/images/architecture-flow.png)

---

## 🛠️ Tech Stack

### **Backend**

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Java](https://img.shields.io/badge/Java-17-orange?logo=java) | 17 | Programming Language |
| ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-brightgreen?logo=springboot) | 3.1.5 | Backend Framework |
| ![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) | 18.x | JavaScript Runtime |
| ![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express) | 4.x | Web Framework |
| ![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql) | 8.0 | Relational Database |
| ![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb) | 6.x | NoSQL Database |
| ![JWT](https://img.shields.io/badge/JWT-Auth-black?logo=jsonwebtokens) | - | Authentication |

### **Frontend**

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-18.2-blue?logo=react) | 18.2 | UI Library |
| ![Vite](https://img.shields.io/badge/Vite-4.x-purple?logo=vite) | 4.x | Build Tool |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-cyan?logo=tailwindcss) | 3.x | CSS Framework |
| ![DaisyUI](https://img.shields.io/badge/DaisyUI-3.x-5A0EF8?logo=daisyui) | 3.x | Component Library |
| ![Axios](https://img.shields.io/badge/Axios-1.x-purple?logo=axios) | 1.x | HTTP Client |

### **Additional Tools**

- **Maven** - Build automation for Java
- **npm** - Package manager for JavaScript
- **Postman** - API testing
- **Git** - Version control
- **Gmail SMTP** - Email service

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)** 17 or higher
```bash
  java -version
```

- **Node.js** 18.x or higher & npm
```bash
  node --version
  npm --version
```

- **MySQL** 8.0 or higher
```bash
  mysql --version
```

- **Maven** 3.8 or higher
```bash
  mvn --version
```

- **Git**
```bash
  git --version
```

- **MongoDB Atlas Account** (Free tier)
  - Sign up at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

- **Gmail Account** with App Password enabled

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ecomart.git
cd ecomart
```

### 2. Setup MySQL Database
```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE ecommerce_auth;

-- Create user (optional)
CREATE USER 'ecomart'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ecommerce_auth.* TO 'ecomart'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 3. Setup MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP address (or use `0.0.0.0/0` for development)
4. Get your connection string (looks like: `mongodb+srv://user:password@cluster.mongodb.net/`)

### 4. Setup Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Generate a password for "Mail"
5. Save the 16-character password

---

## ⚙️ Configuration

### **1. Auth Service Configuration**

**File:** `ecommerce-backend/src/main/resources/application.properties`
```properties
# Server
server.port=8080

# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_auth
spring.datasource.username=root
spring.datasource.password=your_mysql_password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
jwt.secret=your_super_secret_key_min_256_bits_change_in_production
jwt.expiration=86400000

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_16_digit_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# CORS
cors.allowed.origins=http://localhost:3000,http://localhost:5173
```

### **2. Checkout Service Configuration**

**File:** `ecommerce-backendcheckout/src/main/resources/application.properties`
```properties
# Server
server.port=8082

# MongoDB Atlas
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/test?retryWrites=true&w=majority

# Email Configuration (same as Auth Service)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_16_digit_app_password
```

### **3. Homepage Service Configuration**

**File:** `homepage-service/.env`
```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/test?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_min_256_bits_change_in_production
```

### **4. Frontend Configuration**

**Auth Frontend - File:** `ecommerce-frontend/src/config.js`
```javascript
export const API_BASE_URL = 'http://localhost:8080/api';
```

**Main Frontend - File:** `homepage-service/frontend/src/config.js`
```javascript
export const API_BASE_URL = 'http://localhost:3001/api';
export const AUTH_API_URL = 'http://localhost:8080/api';
export const CHECKOUT_API_URL = 'http://localhost:8082/api';
```

---

## 🎮 Running the Application

### **Start All Services**

#### **Terminal 1: Auth Service (Port 8080)**
```bash
cd ecommerce-backend
mvn clean install
mvn spring-boot:run
```

**Expected Output:**
```
✅ Started EcommerceBackendApplication in 3.5 seconds
🚀 Auth Service running on http://localhost:8080
```

#### **Terminal 2: Checkout Service (Port 8082)**
```bash
cd ecommerce-backendcheckout
mvn clean install
mvn spring-boot:run
```

**Expected Output:**
```
✅ Started EcommerceBackendcheckoutApplication in 2.1 seconds
🚀 Checkout Service running on http://localhost:8082
```

#### **Terminal 3: Homepage Service (Port 3001)**
```bash
cd homepage-service
npm install
npm start
```

**Expected Output:**
```
✅ Server is running on port 3001
✅ MongoDB connected successfully
```

#### **Terminal 4: Auth Frontend (Port 3000)**
```bash
cd ecommerce-frontend
npm install
npm start
```

**Expected Output:**
```
✅ Compiled successfully!
🌐 Local: http://localhost:3000
```

#### **Terminal 5: Main Frontend (Port 5173)**
```bash
cd homepage-service/frontend
npm install
npm run dev
```

**Expected Output:**
```
✅ VITE v4.5.0 ready in 450 ms
🌐 Local: http://localhost:5173
```

### **Verify All Services**

Open your browser and check:

- ✅ Auth Service: http://localhost:8080/api/auth/health
- ✅ Checkout Service: http://localhost:8082/api/products
- ✅ Homepage Service: http://localhost:3001/api/products
- ✅ Auth Frontend: http://localhost:3000
- ✅ Main Frontend: http://localhost:5173

---

## 📚 API Documentation

### **Authentication Endpoints**

#### **Register User**
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Check email for OTP."
}
```

#### **Verify OTP**
```http
POST http://localhost:8080/api/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### **Login**
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "userId": 1
  }
}
```

### **Product Endpoints**

#### **Get All Products**
```http
GET http://localhost:3001/api/products
```

#### **Get Product by ID**
```http
GET http://localhost:3001/api/products/{id}
```

#### **Create Product (Admin)**
```http
POST http://localhost:8082/api/products
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "name": "Bamboo Toothbrush",
  "description": "Eco-friendly bamboo toothbrush",
  "price": 199,
  "stockQuantity": 100,
  "categoryId": "123",
  "image": "https://example.com/image.jpg"
}
```

### **Cart Endpoints**

#### **Get User Cart**
```http
GET http://localhost:3001/api/cart/{userId}
Authorization: Bearer {jwt_token}
```

#### **Add to Cart**
```http
POST http://localhost:3001/api/cart/{userId}/items
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "productId": "123",
  "quantity": 2
}
```

### **Order Endpoints**

#### **Create Order**
```http
POST http://localhost:3001/api/orders
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "userId": "1",
  "items": [...],
  "totalAmount": 999,
  "address": {...}
}
```

#### **Send Order Email**
```http
POST http://localhost:8082/api/email/send-order-email
Content-Type: application/json

{
  "to": "customer@example.com",
  "customerName": "John Doe",
  "orderId": 123456,
  "totalAmount": 999,
  "items": [...]
}
```

**Full API Documentation:** [View Postman Collection](./docs/API_COLLECTION.json)

---

## 🗄️ Database Schema

### **MySQL - Users Table**
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'CUSTOMER',
    is_active BOOLEAN DEFAULT FALSE,
    otp VARCHAR(6),
    otp_expiry DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role)
);
```

### **MongoDB - Products Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  compareAtPrice: Number,
  stockQuantity: Number,
  categoryId: String,
  categoryName: String,
  image: String,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **MongoDB - Cart Collection**
```javascript
{
  userId: String,
  items: [{
    _id: String,
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    categoryName: String,
    stockQuantity: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

**Full Schema Documentation:** [View Database Schema](./docs/DATABASE_SCHEMA.md)

---

## 📸 Screenshots

### **Homepage**
![Homepage](./docs/images/homepage.png)

### **Product Catalog**
![Products](./docs/images/products.png)

### **Shopping Cart**
![Cart](./docs/images/cart.png)

### **Checkout Flow**
![Checkout](./docs/images/checkout.png)

### **Authentication**
<div align="center">
  <img src="./docs/images/login.png" width="45%" />
  <img src="./docs/images/register.png" width="45%" />
</div>

### **Admin Dashboard**
![Admin](./docs/images/admin-dashboard.png)

### **Email Templates**
<div align="center">
  <img src="./docs/images/otp-email.png" width="45%" />
  <img src="./docs/images/order-email.png" width="45%" />
</div>

### **Mobile Responsive**
<div align="center">
  <img src="./docs/images/mobile-home.png" width="30%" />
  <img src="./docs/images/mobile-products.png" width="30%" />
  <img src="./docs/images/mobile-cart.png" width="30%" />
</div>

---

## 📁 Project Structure
```
ecomart/
├── ecommerce-backend/                 # Auth Service (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/backend/ecommerce_backend/
│   │   │   │       ├── Config/        # Security, CORS, JWT config
│   │   │   │       ├── Controller/    # REST endpoints
│   │   │   │       ├── Model/         # Entity classes
│   │   │   │       ├── Repository/    # JPA repositories
│   │   │   │       ├── Service/       # Business logic
│   │   │   │       └── Security/      # JWT filters
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
├── ecommerce-backendcheckout/        # Checkout Service (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/backend/ecommerce_backendcheckout/
│   │   │   │       ├── Config/
│   │   │   │       ├── Controller/
│   │   │   │       ├── Model/
│   │   │   │       ├── Repository/
│   │   │   │       └── Service/
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
│
├── homepage-service/                  # Homepage Service (Node.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   │
│   └── frontend/                      # Main Frontend (React + Vite)
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── context/
│       │   ├── hooks/
│       │   ├── utils/
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── public/
│       ├── index.html
│       └── package.json
│
├── ecommerce-frontend/                # Auth Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── docs/                              # Documentation
│   ├── images/                        # Screenshots
│   ├── API_COLLECTION.json            # Postman collection
│   └── DATABASE_SCHEMA.md             # Database documentation
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🧪 Testing

### **Backend Testing**
```bash
# Auth Service tests
cd ecommerce-backend
mvn test

# Checkout Service tests
cd ecommerce-backendcheckout
mvn test
```

### **API Testing with Postman**

1. Import the Postman collection: `docs/API_COLLECTION.json`
2. Set environment variables:
   - `AUTH_URL`: http://localhost:8080
   - `CHECKOUT_URL`: http://localhost:8082
   - `API_URL`: http://localhost:3001
3. Run the collection

### **Frontend Testing**
```bash
# Main frontend
cd homepage-service/frontend
npm test

# Auth frontend
cd ecommerce-frontend
npm test
```

---

## 🚢 Deployment

### **Docker Deployment**
```bash
# Build Docker images
docker-compose build

# Start all services
docker-compose up -d

# Stop all services
docker-compose down
```

### **Production Deployment Checklist**

- [ ] Change JWT secret to strong random key
- [ ] Update CORS origins to production URLs
- [ ] Use environment variables for sensitive data
- [ ] Set `spring.jpa.hibernate.ddl-auto=validate` in production
- [ ] Enable HTTPS/SSL
- [ ] Setup database backups
- [ ] Configure monitoring (Sentry, Datadog)
- [ ] Setup CI/CD pipeline (GitHub Actions)
- [ ] Use production email service (SendGrid, AWS SES)
- [ ] Implement rate limiting
- [ ] Add logging aggregation

**Deployment Platforms:**
- **Backend:** AWS EC2, Google Cloud Run, Heroku
- **Frontend:** Vercel, Netlify, AWS S3 + CloudFront
- **Database:** AWS RDS (MySQL), MongoDB Atlas

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
```bash
   git checkout -b feature/AmazingFeature
```
3. **Commit your changes**
```bash
   git commit -m 'Add some AmazingFeature'
```
4. **Push to the branch**
```bash
   git push origin feature/AmazingFeature
```
5. **Open a Pull Request**

### **Code Style Guidelines**

- Follow Java naming conventions
- Use ESLint for JavaScript
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Contact

**Your Name** - [Your Email](mailto:your.email@example.com)

**Project Link:** [https://github.com/yourusername/ecomart](https://github.com/yourusername/ecomart)

**LinkedIn:** [Your LinkedIn](https://linkedin.com/in/yourprofile)

**Portfolio:** [Your Portfolio](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- Icons by [Heroicons](https://heroicons.com/)
- Inspiration from various e-commerce platforms

---

## 📊 Project Statistics

- **Total Lines of Code:** ~5,000+
- **Backend Services:** 3
- **Frontend Applications:** 2
- **API Endpoints:** 25+
- **Database Collections/Tables:** 6
- **React Components:** 20+
- **Development Time:** [Your timeline]

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

✅ **Microservices Architecture**  
✅ **RESTful API Design**  
✅ **JWT Authentication**  
✅ **Database Design (SQL & NoSQL)**  
✅ **Frontend Development with React**  
✅ **State Management (Context API)**  
✅ **Responsive UI Design**  
✅ **Email Integration**  
✅ **Security Best Practices**  
✅ **Git Version Control**

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ by Varad Jumbad, Ruchita Kamble, KartarSingh Gothwal

[⬆ Back to Top](#-ecomart---e-commerce-platform)

</div>
