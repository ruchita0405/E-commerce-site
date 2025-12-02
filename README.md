# 🔐 E-Commerce Authentication Service

Full-stack authentication microservice with JWT-based security, email verification, and role-based access control.

## ⚠️ SECURITY NOTICE

**This repository does NOT contain:**
- Database passwords
- Email credentials
- JWT secret keys
- API keys

**You must configure these yourself** using the template files provided.

---

## 🚀 Features

- ✅ User registration with email verification
- ✅ JWT-based authentication (access + refresh tokens)
- ✅ Password encryption with BCrypt
- ✅ Role-based access control (USER, ADMIN)
- ✅ Email activation system with 6-digit codes
- ✅ Admin dashboard
- ✅ Secure password reset flow
- ✅ Token refresh mechanism
- ✅ Protected routes

---

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.1.5**
- **Spring Security 6.1.5**
- **MySQL 8.0**
- **JWT (io.jsonwebtoken) 0.12.3**
- **JavaMail**
- **Hibernate/JPA**
- **Maven**

### Frontend
- **React 18.2.0**
- **React Router 6.20.1**
- **Axios 1.6.2**
- **CSS3**

---

## 📋 Prerequisites

- **Java 17+**
- **Node.js 16+**
- **MySQL 8.0+**
- **Maven 3.6+**
- **Gmail account** (for email service)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/auth-service.git
cd auth-service
```

### 2️⃣ Database Setup
```sql
-- Create database
CREATE DATABASE ecommerce_auth;

-- Run schema
mysql -u root -p ecommerce_auth < database/schema.sql
```

**Default admin credentials:**
- Email: `admin@techstore.com`
- Password: `admin123`
- ⚠️ **CHANGE THIS IN PRODUCTION!**

### 3️⃣ Backend Configuration
```bash
cd backend-app/src/main/resources
```

**Copy template to actual config:**
```bash
copy application.properties.template application.properties
```

**Edit `application.properties` and configure:**

1. **Database:**
```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_auth
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
```

2. **JWT Secret** (generate secure key):
```bash
   # Windows PowerShell
   [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
   
   # Or use online tool: https://generate-secret.vercel.app/64
```

Paste in `application.properties`:
```properties
   jwt.secret=YOUR_GENERATED_64_CHARACTER_SECRET_KEY
```

3. **Email Configuration:**
    - Enable 2-Factor Authentication on Gmail
    - Generate App Password: https://myaccount.google.com/apppasswords
    - Use App Password (NOT your Gmail password):
```properties
   spring.mail.username=your.email@gmail.com
   spring.mail.password=your16characterapppassword
```

### 4️⃣ Start Backend
```bash
cd backend-app
mvnw clean install
mvnw spring-boot:run
```

Backend runs on: **http://localhost:8080**

### 5️⃣ Frontend Configuration
```bash
cd frontend-react
```

**Copy template (if needed):**
```bash
copy .env.template .env
```

**Install dependencies:**
```bash
npm install
```

**Start frontend:**
```bash
npm start
```

Frontend runs on: **http://localhost:3000**

---

## 🔐 Security Configuration

### Generate JWT Secret

**Option 1 - OpenSSL (Linux/Mac):**
```bash
openssl rand -base64 64
```

**Option 2 - PowerShell (Windows):**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
```

**Option 3 - Online:**
- https://generate-secret.vercel.app/64

### Gmail App Password Setup

1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password: https://myaccount.google.com/apppasswords
4. Select "Mail" and your device
5. Copy the 16-character password
6. Use this in `application.properties`

---

## 📚 API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/register` | POST | ❌ | Register new user |
| `/activate` | POST | ❌ | Activate account with code |
| `/login` | POST | ❌ | Login and get JWT tokens |
| `/refresh/token` | POST | ✅ | Refresh access token |
| `/signout` | POST | ✅ | Logout user |
| `/password/update` | POST | ✅ | Change password |
| `/password/new` | POST | ✅ | Reset password |
| `/admin/*` | * | ✅ (Admin) | Admin endpoints |

---

## 🗂️ Project Structure
```
auth-service/
├── backend-app/                # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/ninehub/authentication/
│   │       ├── controller/     # REST endpoints
│   │       ├── service/        # Business logic
│   │       ├── entity/         # JPA entities
│   │       ├── repository/     # Database access
│   │       ├── security/       # Security config
│   │       └── dto/            # Data transfer objects
│   ├── src/main/resources/
│   │   ├── application.properties.template  # Config template
│   │   └── templates/          # Email templates
│   └── pom.xml
├── frontend-react/             # React frontend
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API calls
│   │   └── App.js              # Main app
│   └── package.json
├── database/
│   └── schema.sql              # Database schema
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 🧪 Testing

### Test Registration Flow
1. Go to http://localhost:3000/register
2. Fill in details
3. Check email for 6-digit code
4. Enter code on activation page
5. Login with credentials

### Test Admin Access
1. Login with admin credentials
2. Navigate to http://localhost:3000/admin
3. Access admin dashboard

---

## 🚨 Troubleshooting

### Backend won't start
- ✅ Check MySQL is running
- ✅ Verify database `ecommerce_auth` exists
- ✅ Check `application.properties` has correct credentials
- ✅ Ensure port 8080 is not in use

### Email not sending
- ✅ Verify Gmail App Password (NOT regular password)
- ✅ Check 2FA is enabled on Gmail
- ✅ Test SMTP connection: `telnet smtp.gmail.com 587`

### Login fails with "Bad credentials"
- ✅ Check user is activated (`is_actif = true`)
- ✅ Verify password in database matches BCrypt hash
- ✅ Check backend logs for detailed error

### Admin page redirects to home
- ✅ Check role in database: `SELECT role_id FROM users WHERE email = 'your@email.com'`
- ✅ Should be `2` for ADMIN
- ✅ Check localStorage: `localStorage.getItem('role')` should be `'ADMIN'`

---

## 👥 Team Members

1. [Member 1 Name]
2. [Member 2 Name]
3. [Member 3 Name]
4. [Member 4 Name]

---

## 📄 License

This project is part of an e-commerce platform educational project.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚠️ Important Notes

- **Never commit `application.properties`** - Use the template
- **Change default admin password** in production
- **Use strong JWT secret** (64+ characters)
- **Enable HTTPS** in production
- **Update CORS origins** for production URLs
- **Backup database** regularly

---

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

---

**Made with ❤️ for E-Commerce Platform**