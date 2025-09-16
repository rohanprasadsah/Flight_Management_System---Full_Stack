# ✈️ Flight Management System

A comprehensive full-stack web application for managing flights and passenger bookings with **JWT-based authentication** and **role-based authorization**. Built with modern technologies including React fms-frontend and Spring Boot backend.

## 🏗️ Project Architecture

```
Flight Management System
├── fms-frontend (React + Vite)
│   ├── Modern UI with Tailwind CSS
│   ├── Redux state management
│   ├── JWT Authentication & Context API
│   └── Responsive design
└── Backend (Spring Boot)
    ├── RESTful API with Security
    ├── JWT Authentication
    ├── Role-based Authorization
    ├── PostgreSQL database
    └── JPA/Hibernate ORM
```

## 🌟 Features

### 🔐 Authentication & Authorization

- **JWT Token-based Authentication**: Secure login/logout with JSON Web Tokens
- **Role-based Access Control**: Three user roles (ADMIN, STAFF, CUSTOMER)
- **User Registration**: New users can register with role selection
- **Secure Endpoints**: Protected API endpoints with role-specific permissions
- **Session Management**: Persistent login state with localStorage
- **Password Security**: Encrypted password storage with BCrypt

### ✅ Flight Management

- **Add New Flights**: Create flights with details like name, source, destination, time, price, and image _(ADMIN only)_
- **View All Flights**: Display all available flights in a responsive grid layout _(All authenticated users)_
- **Update Flights**: Edit existing flight information _(ADMIN/STAFF)_
- **Delete Flights**: Remove flights from the system _(ADMIN only)_
- **Search Flights**: Filter flights by source and destination cities _(All authenticated users)_

### ✅ Passenger Management

- **Add Passengers**: Register passengers to specific flights _(All authenticated users)_
- **View Passengers**: List all passengers for a particular flight _(All authenticated users)_
- **Update Passenger Info**: Modify passenger details _(Owner/ADMIN/STAFF)_
- **Delete Passengers**: Remove passengers from flights _(ADMIN only)_
- **User-Passenger Association**: Link passengers with their respective users

### ✅ User Interface

- **Modern Design**: Clean, gradient-based UI with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Hover effects, transitions, and intuitive navigation
- **Authentication Flow**: Beautiful login/register forms with validation
- **Search Functionality**: Real-time flight search with form validation

## 🛠️ Technology Stack

### fms-frontend

- **Framework**: React 19.1.1
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM 7.8.1
- **Styling**: Tailwind CSS 4.1.12
- **Build Tool**: Vite 7.1.2
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm
- **Authentication**: Context API for state management
- **HTTP Client**: Fetch API for REST calls

### Backend

- **Framework**: Spring Boot 3.5.4
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven
- **Security**: Spring Security with JWT
- **Additional Libraries**:
  - **Authentication**: JWT (JSON Web Tokens) 0.12.5
  - **Security**: Spring Boot Security Starter
  - **Validation**: Spring Boot Validation Starter
  - **Email**: Spring Boot Mail Starter
  - **Lombok** (for reducing boilerplate code)
  - **Spring Boot DevTools** (for development)
  - **Jackson** (for JSON processing)

## 📁 Project Structure

### Root Directory Structure

```
Flight-Management-System/
├── fms-frontend/                        # React fms-frontend Application
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AddFlight.jsx
│   │   │   ├── AddPassenger.jsx
│   │   │   ├── AllFlights.jsx
│   │   │   ├── Flight.jsx
│   │   │   ├── FlightSearch.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Login.jsx            # 🔐 Login Component
│   │   │   ├── Navbar.jsx
│   │   │   ├── Passengers.jsx
│   │   │   ├── Register.jsx         # 🔐 Registration Component
│   │   │   ├── UpdateFlightById.jsx
│   │   │   └── UpdatePassengerById.jsx
│   │   ├── Context/
│   │   │   └── AuthContext.jsx      # 🔐 Authentication Context
│   │   ├── Services/
│   │   │   └── authService.js       # 🔐 Authentication Service
│   │   ├── Utils/
│   │   │   ├── addFlightSlice.js
│   │   │   ├── authApi.js           # 🔐 Auth API utilities
│   │   │   ├── authUtils.js         # 🔐 Auth helper functions
│   │   │   ├── SessionFixer.jsx     # 🔐 Session management
│   │   │   ├── store.js
│   │   │   └── useFetchFlights.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
├── FlightManagementSystem/           # Spring Boot Backend Application
│   └── FlightManagementSystem/
│       ├── src/main/java/com/fullstack/FlightManagementSystem/
│       │   ├── Config/
│       │   │   └── SecurityConfig.java      # 🔐 Security Configuration
│       │   ├── Controller/
│       │   │   ├── FlightController.java
│       │   │   └── PassengerController.java
│       │   ├── DTO/                         # 🔐 Data Transfer Objects
│       │   │   ├── AuthController.java      # 🔐 Authentication Controller
│       │   │   ├── AuthResponse.java        # 🔐 Auth Response DTO
│       │   │   ├── LoginRequest.java        # 🔐 Login Request DTO
│       │   │   └── RegisterRequest.java     # 🔐 Register Request DTO
│       │   ├── Exception/
│       │   │   ├── GlobalExceptionHandler.java
│       │   │   ├── IdNotFoundException.java
│       │   │   └── ResourceNotFoundException.java
│       │   ├── Model/
│       │   │   ├── ApiResponse.java
│       │   │   ├── Flight.java
│       │   │   ├── Passengers.java
│       │   │   ├── Users.java               # 🔐 User Entity
│       │   │   └── UserRole.java            # 🔐 User Role Enum
│       │   ├── Repository/
│       │   │   ├── FlightRepository.java
│       │   │   ├── FRepo.java
│       │   │   ├── PRepo.java
│       │   │   └── UserRepository.java      # 🔐 User Repository
│       │   ├── Security/                    # 🔐 Security Package
│       │   │   ├── JwtAuthenticationFilter.java  # JWT Filter
│       │   │   └── JwtUtil.java             # JWT Utility
│       │   ├── Service/
│       │   │   ├── FlightService.java
│       │   │   ├── PassengerService.java
│       │   │   └── UserService.java         # 🔐 User Service
│       │   └── FlightManagementSystemApplication.java
│       ├── src/main/resources/
│       │   └── application.properties       # Includes JWT config
│       ├── target/                          # Build output
│       ├── .gitignore
│       ├── pom.xml                          # Updated with security deps
│       ├── mvnw
│       └── mvnw.cmd
└── README.md                                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Java 17** or higher
- **Maven** (v3.6 or higher)
- **PostgreSQL** database
- **Git** (for version control)

### Quick Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rohanprasadsah/Flight-Management-System-Full_Stack.git
   cd Flight-Management-System-Full_Stack
   ```

### Backend Setup

2. **Navigate to Backend Directory**

   ```bash
   cd FlightManagementSystem/FlightManagementSystem
   ```

3. **Configure Database**

   - Create a PostgreSQL database named `flightmanagementsystem`
   - Update `src/main/resources/application.properties` with your database credentials:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/flightmanagementsystem
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

   # JWT Configuration
   jwt.secret=YourSecretKeyForJWTTokenGenerationShouldBeLongAndSecure123456789
   jwt.expiration=86400000
   ```

4. **Run the Backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   ✅ Backend will run on `http://localhost:8080`

### fms-frontend Setup

5. **Navigate to fms-frontend Directory** (open new terminal)

   ```bash
   cd fms-frontend
   ```

6. **Install Dependencies**

   ```bash
   npm install
   ```

7. **Start Development Server**

   ```bash
   npm run dev
   ```

   ✅ fms-frontend will run on `http://localhost:5173`

8. **First Time Setup - Create Admin User**

   - Navigate to `http://localhost:5173/register`
   - Register with role "ADMIN" to get full system access
   - Or register as "CUSTOMER" for limited access

9. **Build for Production**
   ```bash
   npm run build
   ```

## 🔗 API Endpoints

### 🔐 Authentication Endpoints

- `POST /auth/register` - Register new user (Public)
- `POST /auth/login` - User login (Public)

### ✈️ Flight Endpoints

- `GET /FMS/findAll` - Get all flights _(All authenticated users)_
- `GET /FMS/find/{id}` - Get flight by ID _(All authenticated users)_
- `GET /FMS/findBySourceAndDestination` - Search flights by source and destination _(All authenticated users)_
- `POST /FMS/save` - Create new flight _(ADMIN only)_
- `PUT /FMS/putUpdate/{id}` - Update flight _(ADMIN/STAFF)_
- `DELETE /FMS/delete/{id}` - Delete flight _(ADMIN only)_
- `POST /FMS/savePassenger/{id}` - Add passenger to flight _(All authenticated users)_

### 👥 Passenger Endpoints

- `GET /FMS/Passenger/findAll` - Get all passengers _(ADMIN/STAFF)_
- `GET /FMS/Passenger/find/{id}` - Get passenger by ID _(Owner/ADMIN/STAFF)_
- `GET /FMS/Passenger/findByFirstName` - Search passengers by first name _(All authenticated users)_
- `POST /FMS/Passenger/save` - Add new passenger _(All authenticated users)_
- `PUT /FMS/Passenger/updatePassenger/{id}` - Update passenger details _(Owner/ADMIN/STAFF)_
- `DELETE /FMS/Passenger/delete/{id}` - Delete passenger _(ADMIN only)_

### 🔑 Role-based Access Control

- **ADMIN**: Full access to all endpoints
- **STAFF**: Can manage flights and passengers (except delete operations)
- **CUSTOMER**: Can view flights, manage their own passenger bookings

## 🎨 UI/UX Features

### Design Elements

- **Modern Gradients**: Beautiful color combinations throughout the interface
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Responsive Grid**: Adaptive layout that works on desktop, tablet, and mobile
- **Interactive Cards**: Flight and passenger information displayed in elegant cards
- **Form Validation**: Real-time validation for all input forms
- **Loading States**: Visual feedback during API calls

### Navigation

- **React Router**: Single Page Application with smooth navigation
- **Breadcrumb Navigation**: Easy to understand current page location
- **404 Error Page**: Custom error page for non-existent routes

## 🔧 Key Components Explained

### 🔐 Authentication Components

#### AuthContext.jsx

- React Context for global authentication state management
- Manages user login/logout state
- Provides authentication methods to child components
- Handles localStorage for persistent sessions

#### Login.jsx & Register.jsx

- Beautiful authentication forms with gradient backgrounds
- Form validation and error handling
- Integration with AuthContext for state management
- Role selection during registration (ADMIN, STAFF, CUSTOMER)

#### authService.js

- Service layer for authentication API calls
- Handles login and registration requests
- Error handling for authentication failures
- JWT token management

### fms-frontend Components

#### AllFlights.jsx

- Main dashboard component displaying all flights
- Integrates search functionality
- Handles flight deletion (role-based)
- Uses Redux for state management
- Authentication-protected routes

#### Flight.jsx

- Individual flight card component
- Displays flight details with attractive styling
- Reusable component used throughout the app
- Role-based action buttons

#### FlightSearch.jsx

- Search form component for filtering flights
- Real-time search by source and destination
- Form validation and submission handling
- Authentication required for access

#### AddFlight.jsx & UpdateFlightById.jsx

- Forms for creating and updating flight information
- Form validation and error handling
- Redux integration for state updates
- Role-based access (ADMIN for create, ADMIN/STAFF for update)

### Backend Components

#### 🔐 Security & Authentication

##### Users.java (Model)

```java
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String password;  // BCrypt encrypted

    private String name;

    @Enumerated(EnumType.STRING)
    private UserRole role;  // ADMIN, STAFF, CUSTOMER

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user")
    private List<Passengers> passengers;
}
```

##### JwtUtil.java

- JWT token generation and validation
- Token expiration management
- Secret key handling for token signing
- Email extraction from tokens

##### AuthController.java

- Handles user registration and login
- JWT token generation on successful authentication
- Password validation using BCrypt
- Returns AuthResponse with user details and token

##### SecurityConfig.java

- Spring Security configuration
- JWT filter chain setup
- CORS configuration
- Public endpoint definitions

#### Flight.java (Model)

```java
@Entity
public class Flight {
    private int f_id;
    private String name;
    private String source;
    private String destination;
    private String time;
    private BigDecimal price;
    private String img;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.REMOVE)
    private List<Passengers> passengers;
}
```

#### FlightController.java

- RESTful controller with role-based security
- `@PreAuthorize` annotations for endpoint protection
- CRUD operations for flights with role restrictions
- Exception handling and response formatting

#### FlightService.java

- Business logic layer
- Data validation and processing
- Repository interaction
- Security context integration

## 🗄️ Database Design

### Users Table 🔐

| Column     | Type             | Description                        |
| ---------- | ---------------- | ---------------------------------- |
| id         | INT (PK)         | Primary key                        |
| email      | VARCHAR (Unique) | User email address                 |
| password   | VARCHAR          | Encrypted password (BCrypt)        |
| name       | VARCHAR          | User full name                     |
| role       | ENUM             | User role (ADMIN, STAFF, CUSTOMER) |
| created_at | TIMESTAMP        | Account creation timestamp         |
| updated_at | TIMESTAMP        | Last update timestamp              |

### Flight Table

| Column      | Type     | Description    |
| ----------- | -------- | -------------- |
| f_id        | INT (PK) | Primary key    |
| name        | VARCHAR  | Flight name    |
| source      | VARCHAR  | Departure city |
| destination | VARCHAR  | Arrival city   |
| time        | VARCHAR  | Flight time    |
| price       | DECIMAL  | Ticket price   |
| img         | VARCHAR  | Image URL      |

### Passengers Table

| Column    | Type     | Description             |
| --------- | -------- | ----------------------- |
| p_id      | INT (PK) | Primary key             |
| firstName | VARCHAR  | First name              |
| lastName  | VARCHAR  | Last name               |
| age       | INT      | Passenger age           |
| flight_id | INT (FK) | Foreign key to Flight   |
| user_id   | INT (FK) | Foreign key to Users 🔐 |

### 🔗 Relationships

- **Users → Passengers**: One-to-Many (A user can have multiple passenger bookings)
- **Flight → Passengers**: One-to-Many (A flight can have multiple passengers)
- **Users → Flight**: Many-to-Many (through Passengers table)

## 🛡️ Error Handling

### fms-frontend

- Try-catch blocks for API calls
- User-friendly error messages
- Loading states and feedback
- Form validation with real-time feedback

### Backend

- Global exception handler using `@ControllerAdvice`
- Custom exceptions for specific scenarios
- Proper HTTP status codes
- Detailed error responses

## 🚀 Deployment

### fms-frontend Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for API endpoints

### Backend Deployment

1. Package the application: `mvn clean package`
2. Deploy the JAR file to your server
3. Configure database connection
4. Set up reverse proxy (nginx) if needed

## 📝 Development Scripts

### fms-frontend Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Backend Maven Commands

```bash
mvn clean compile      # Compile the project
mvn test              # Run tests
mvn package           # Create JAR file
mvn spring-boot:run   # Run the application
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Future Enhancements

- [x] ✅ **User authentication and authorization** - _(Completed with JWT)_
- [ ] Payment gateway integration
- [ ] Email notifications for bookings (Email service ready)
- [ ] Flight booking confirmation system
- [ ] Admin dashboard with analytics and charts
- [ ] Real-time flight status updates
- [ ] Mobile app development
- [ ] PDF ticket generation
- [ ] Multi-language support
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] User profile management
- [ ] Flight capacity management
- [ ] Booking history for users

## 🐛 Known Issues

- Search functionality could be enhanced with auto-complete
- Need to add input validation for special characters
- Mobile responsiveness could be improved for very small screens

## 📞 Contact

**Developer**: ROHAN  
**Project**: Flight Management System  
**Tech Stack**: React + Spring Boot + PostgreSQL

---

## 📄 License

This project is developed for educational and portfolio purposes. Feel free to use it as a reference for your own projects.

---

_Built using React and Spring Boot_
