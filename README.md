# ✈️ Flight Management System

A comprehensive full-stack web application for managing flights and passenger bookings, built with modern technologies including React frontend and Spring Boot backend.

## 🏗️ Project Architecture

```
Flight Management System
├── Frontend (React + Vite)
│   ├── Modern UI with Tailwind CSS
│   ├── Redux state management
│   └── Responsive design
└── Backend (Spring Boot)
    ├── RESTful API
    ├── PostgreSQL database
    └── JPA/Hibernate ORM
```

## 🌟 Features

### ✅ Flight Management
- **Add New Flights**: Create flights with details like name, source, destination, time, price, and image
- **View All Flights**: Display all available flights in a responsive grid layout
- **Update Flights**: Edit existing flight information
- **Delete Flights**: Remove flights from the system
- **Search Flights**: Filter flights by source and destination cities

### ✅ Passenger Management
- **Add Passengers**: Register passengers to specific flights
- **View Passengers**: List all passengers for a particular flight
- **Update Passenger Info**: Modify passenger details
- **Passenger-Flight Association**: Link passengers with their respective flights

### ✅ User Interface
- **Modern Design**: Clean, gradient-based UI with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Hover effects, transitions, and intuitive navigation
- **Search Functionality**: Real-time flight search with form validation

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19.1.1
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM 7.8.1
- **Styling**: Tailwind CSS 4.1.12
- **Build Tool**: Vite 7.1.2
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm

### Backend
- **Framework**: Spring Boot 3.5.4
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven
- **Additional Libraries**:
  - Lombok (for reducing boilerplate code)
  - Spring Boot DevTools (for development)
  - Jackson (for JSON processing)

## 📁 Project Structure

### Root Directory Structure
```
Flight-Management-System/
├── FMS-Frontend/                    # React Frontend Application
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AddFlight.jsx
│   │   │   ├── AddPassenger.jsx
│   │   │   ├── AllFlights.jsx
│   │   │   ├── Flight.jsx
│   │   │   ├── FlightSearch.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Passengers.jsx
│   │   │   ├── UpdateFlightById.jsx
│   │   │   └── UpdatePassengerById.jsx
│   │   ├── Utils/
│   │   │   ├── addFlightSlice.js
│   │   │   ├── store.js
│   │   │   └── useFetchFlights.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
├── FlightManagementSystem/           # Spring Boot Backend Application
│   └── FlightManagementSystem/
│       ├── src/main/java/com/fullstack/FlightManagementSystem/
│       │   ├── Config/
│       │   │   └── GlobalCorsConfig.java
│       │   ├── Controller/
│       │   │   ├── FlightController.java
│       │   │   └── PassengerController.java
│       │   ├── Exception/
│       │   │   ├── GlobalExceptionHandler.java
│       │   │   ├── IdNotFoundException.java
│       │   │   └── ResourceNotFoundException.java
│       │   ├── Model/
│       │   │   ├── ApiResponse.java
│       │   │   ├── Flight.java
│       │   │   └── Passengers.java
│       │   ├── Repository/
│       │   │   ├── FlightRepository.java
│       │   │   ├── FRepo.java
│       │   │   └── PRepo.java
│       │   ├── Service/
│       │   │   ├── FlightService.java
│       │   │   └── PassengerService.java
│       │   └── FlightManagementSystemApplication.java
│       ├── src/main/resources/
│       │   └── application.properties
│       ├── target/                   # Build output (excluded from git)
│       ├── .gitignore
│       ├── .gitattributes
│       ├── pom.xml
│       ├── mvnw
│       └── mvnw.cmd
└── README.md                         # This file
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
   - Create a PostgreSQL database named `flight_management`
   - Update `src/main/resources/application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/flight_management
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   ```

4. **Run the Backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   ✅ Backend will run on `http://localhost:8080`

### Frontend Setup

5. **Navigate to Frontend Directory** (open new terminal)
   ```bash
   cd Flight-Management-System-Full_Stack/FMS-Frontend
   ```

6. **Install Dependencies**
   ```bash
   npm install
   ```

7. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   ✅ Frontend will run on `http://localhost:5173`

8. **Build for Production**
   ```bash
   npm run build
   ```

## 🔗 API Endpoints

### Flight Endpoints
- `GET /FMS/findAll` - Get all flights
- `GET /FMS/find/{id}` - Get flight by ID
- `GET /FMS/findBySource&Destination` - Search flights by source and destination
- `POST /FMS/save` - Create new flight
- `PUT /FMS/putUpdate/{id}` - Update flight
- `DELETE /FMS/delete/{id}` - Delete flight

### Passenger Endpoints
- `GET /FMS/passengers/{flightId}` - Get passengers for a flight
- `POST /FMS/savePassenger/{flightId}` - Add passenger to flight
- `PUT /FMS/updatePassenger/{id}` - Update passenger details
- `DELETE /FMS/deletePassenger/{id}` - Delete passenger

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

### Frontend Components

#### AllFlights.jsx
- Main dashboard component displaying all flights
- Integrates search functionality
- Handles flight deletion
- Uses Redux for state management

#### Flight.jsx
- Individual flight card component
- Displays flight details with attractive styling
- Reusable component used throughout the app

#### FlightSearch.jsx
- Search form component for filtering flights
- Real-time search by source and destination
- Form validation and submission handling

#### AddFlight.jsx & UpdateFlightById.jsx
- Forms for creating and updating flight information
- Form validation and error handling
- Redux integration for state updates

### Backend Components

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
- RESTful controller handling HTTP requests
- CRUD operations for flights
- Exception handling and response formatting

#### FlightService.java
- Business logic layer
- Data validation and processing
- Repository interaction

## 🗄️ Database Design

### Flight Table
| Column | Type | Description |
|--------|------|-------------|
| f_id | INT (PK) | Primary key |
| name | VARCHAR | Flight name |
| source | VARCHAR | Departure city |
| destination | VARCHAR | Arrival city |
| time | VARCHAR | Flight time |
| price | DECIMAL | Ticket price |
| img | VARCHAR | Image URL |

### Passengers Table
| Column | Type | Description |
|--------|------|-------------|
| p_id | INT (PK) | Primary key |
| firstName | VARCHAR | First name |
| lastName | VARCHAR | Last name |
| age | INT | Passenger age |
| flight_id | INT (FK) | Foreign key to Flight |

## 🛡️ Error Handling

### Frontend
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

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for API endpoints

### Backend Deployment
1. Package the application: `mvn clean package`
2. Deploy the JAR file to your server
3. Configure database connection
4. Set up reverse proxy (nginx) if needed

## 📝 Development Scripts

### Frontend Scripts
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

- [ ] User authentication and authorization
- [ ] Payment gateway integration
- [ ] Email notifications for bookings
- [ ] Flight booking system
- [ ] Admin dashboard for analytics
- [ ] Real-time flight status updates
- [ ] Mobile app development
- [ ] PDF ticket generation
- [ ] Multi-language support

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

*Built with ❤️ using React and Spring Boot*
