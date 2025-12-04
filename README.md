
# 🛒 Full-Stack E-Commerce Application (React + Spring Boot + PostgreSQL)

A complete full-stack e-commerce web app where users can browse products, add them to the cart, perform checkout, place orders, and receive confirmation emails.
The application supports **product CRUD**, **image uploads**, **cart management**, **order processing**, and **email notifications**.

---

# 🚀 Tech Stack

### **Frontend**

* React
* React Router
* Context API
* Axios
* Bootstrap / CSS

### **Backend**

* Spring Boot
* Spring Data JPA
* REST APIs
* Email Sending (JavaMailSender)

### **Database**

* PostgreSQL

### **Tools**

* Postman (API testing)

---

# ⚙️ Project Workflow

---

# 🔹 React Frontend

### **1. Routing (App.jsx)**

| Route                 | Description                                 |
| --------------------- | ------------------------------------------- |
| `/`                   | Home → product listing + category filtering |
| `/add_product`        | Add new product                             |
| `/product/:id`        | Single product view                         |
| `/product/update/:id` | Update product                              |
| `/cart`               | Shopping cart                               |
| `/checkout`           | Checkout page (NEW)                         |
| `/order/success`      | Order confirmation page (NEW)               |

---

### **2. Global State (Context.jsx)**

#### Maintains:

* `cartItems` → items added to cart
* `selectedCategory` → filter products
* `checkoutData` → user checkout info (NEW)

---

### **3. Checkout Flow (NEW)**

#### From Cart → Checkout → Order Placed → Email Sent

1. User clicks **Checkout** inside Cart page.
2. Frontend opens `/checkout` where user enters:

   * Name
   * Email
   * Address
   * Payment mode (COD / Card Demo)
3. React sends request to backend:
   `POST /api/checkout/place-order`
4. Backend:

   * Creates order
   * Deducts stock
   * Clears cart
   * Sends confirmation email (JavaMailSender)
5. React redirects user to `/order/success`

---

### **4. Axios Communication**

Axios instance created with base URL:

```
http://localhost:8080/api
```

Used for:

* Product CRUD
* Cart updates
* Checkout
* Email sending

---

---

# 🔹 Spring Boot Backend

## ✅ **Product APIs**

| API                                | Description                   |
| ---------------------------------- | ----------------------------- |
| `GET /api/products`                | Get all products              |
| `GET /api/product/{id}`            | Get product by ID             |
| `GET /api/product/{id}/image`      | Fetch product image           |
| `POST /api/product`                | Add product with image upload |
| `PUT /api/product/{id}`            | Update product                |
| `DELETE /api/product/{id}`         | Delete product                |
| `GET /api/product/search?keyword=` | Search products               |

---

## 🔥 **Checkout + Order Placement (NEW)**

### ✔ CheckoutController.java (NEW)

Endpoints:

| API                              | Description                                 |
| -------------------------------- | ------------------------------------------- |
| `POST /api/checkout/place-order` | Places an order, deducts stock, sends email |

### Backend Workflow:

1. Receive order data + cart items
2. Validate stock
3. Deduct stock for each product
4. Save order in database (if order table exists)
5. Send confirmation email using EmailService
6. Return success response

---

## ✉️ **Email Notification System (NEW)**

### ✔ EmailService.java

* Uses `JavaMailSender`
* Sends HTML/plain text email after order placement

### ✔ EmailController.java

Exposes:

```
POST /api/email/send-order-email
```

### ✔ Email sent includes:

* Customer name
* Items ordered
* Total price
* Delivery address
* Order ID (optional)

---

# 🔹 PostgreSQL Database

### Stores:

* Product details
* Product images (`bytea`)
* Orders (if implemented)
* User checkout info (optional)

Database settings in `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

---

# 🔹 Postman Testing

### Product APIs:

* GET `/api/products`
* POST `/api/product` (multipart form-data)
* PUT `/api/product/{id}`
* DELETE `/api/product/{id}`

### Checkout (NEW)

* POST `/api/checkout/place-order`

### Email (NEW)

* POST `/api/email/send-order-email`

---

# 🛍️ Data Flow Examples

---

## ➕ Adding a Product

1. User opens `/add_product`
2. Sends **multipart/form-data** request
3. Backend stores:

   * Product info
   * Image bytes
4. PostgreSQL saves all data

---

## 👀 Viewing Products

1. React calls `GET /api/products`
2. Backend returns JSON
3. React loads product cards
4. Images rendered via `GET /api/product/{id}/image`

---

## 💳 Checkout Flow (NEW)

1. User completes checkout form
2. React sends data to `/checkout/place-order`
3. Backend:

   * Deducts stock
   * Saves order
   * Sends order confirmation email
4. Frontend shows order success page

---

# 📂 Project Structure

```
E-Commerce/
├── backend/
│   ├── controller/
│   │   ├── ProductController.java
│   │   ├── CheckoutController.java   ← NEW
│   │   └── EmailController.java      ← NEW
│   ├── service/
│   │   ├── ProductService.java
│   │   ├── EmailService.java         ← NEW
│   ├── model/
│   │   ├── Product.java
│   │   ├── OrderEmailRequest.java    ← NEW
│   ├── repository/
│   │   └── ProductRepository.java
│   ├── application.properties
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── axios.js
│   │   ├── Context/Context.jsx
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Cart.jsx  <-- NEW
│   │   │   ├── AddProduct.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── UpdateProduct.jsx
│   └── public/
```

---

# ▶️ How to Run

### Backend

```
cd backend
mvn spring-boot:run
```

### Frontend

```
cd frontend
npm install
npm start
```

---

# 🎯 Final Feature List

### **✔ Product Management**

* Add product
* Update product
* Delete product
* Search products
* Category filtering
* Image upload + retrieval

### **✔ Shopping Cart**

* Add to cart
* Remove from cart
* Update quantities
* Cart summary

### **⭐ NEW: Checkout + Order Processing**

* Checkout page
* Enter user details
* Payment option (COD / Demo Payment)
* Place order
* Email confirmation to customer

### **⭐ NEW: Email Service**

* Automated mail after order
* Custom email template
* Supports HTML body

---

If you want, I can also:
✅ Add **Order model + order history**
✅ Add **payment gateway (Razorpay/Stripe demo)**
✅ Add **admin panel**
✅ Generate full documentation PDF

Just tell me!

