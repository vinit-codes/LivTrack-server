# LivTrack Server 🏥

A comprehensive health tracking backend API built with Node.js and Express, designed to manage and monitor various health metrics including blood tests, cholesterol levels, eye health, and PCOS-related data. The platform features OCR capabilities for extracting health data from medical reports and provides secure user authentication.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality

- 🔐 **User Authentication**: Secure JWT-based authentication and authorization
- 📊 **Health Metrics Tracking**:
  - Blood test results monitoring
  - Cholesterol level tracking
  - Eye health metrics
  - PCOS (Polycystic Ovary Syndrome) data management
- 📸 **OCR Integration**: Extract health data from medical reports using Tesseract.js and Google Cloud Vision API
- 📈 **Dashboard Analytics**: Comprehensive health data visualization and insights
- 🔒 **Protected Routes**: Middleware-based route protection for user data security
- 📤 **File Upload**: Support for uploading medical documents and reports

### Additional Features

- Cross-Origin Resource Sharing (CORS) enabled
- MongoDB database integration
- RESTful API architecture
- Modular and scalable codebase

## 🛠 Technology Stack

### Backend Framework

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework

### Database

- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Authentication & Security

- **JWT (jsonwebtoken)**: Token-based authentication
- **bcryptjs**: Password hashing and encryption

### OCR & AI

- **Tesseract.js**: OCR library for text extraction
- **Google Cloud Vision API**: Advanced image analysis and text detection
- **OpenAI**: AI-powered text analysis

### Additional Libraries

- **Multer**: File upload handling
- **Axios**: HTTP client
- **JSDOM**: HTML parsing and manipulation
- **dotenv**: Environment variable management
- **CORS**: Cross-origin resource sharing

### Development Tools

- **Nodemon**: Auto-restart server during development

## 📁 Project Structure

```
LivTrack-server/
│
├── healthControllers/          # Business logic for health metrics
│   ├── bloodMetricsController.js
│   ├── cholesterolMetricsController.js
│   ├── dashBoardController.js
│   ├── eyeMetricsController.js
│   ├── ocrController.js
│   └── pcosController.js
│
├── healthModels/               # MongoDB schemas for health data
│   ├── bloodMetricModel.js
│   ├── cholesterolMetricModel.js
│   ├── eyeMetricModel.js
│   └── pcosModel.js
│
├── userControllers/            # User authentication logic
│   └── authController.js
│
├── userModels/                 # User data models
│   └── userModel.js
│
├── middleware/                 # Express middleware
│   ├── authMiddleware.js      # JWT authentication
│   └── uploadMiddleware.js    # File upload handling
│
├── routes/                     # API route definitions
│   ├── authRoutes.js          # Authentication endpoints
│   ├── dashRoutes.js          # Dashboard endpoints
│   ├── healthRoutes.js        # Health metrics endpoints
│   └── ocrRoutes.js           # OCR processing endpoints
│
├── utils/                      # Utility functions
│   ├── ocrUtils.js            # OCR processing helpers
│   └── textParser.js          # Text parsing utilities
│
├── eng.traineddata            # Tesseract OCR English language data
├── server.js                  # Main application entry point
└── package.json               # Project dependencies
```

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Google Cloud Account** (for Vision API)
- **OpenAI API Key** (optional, for AI features)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd LivTrack-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) section)

4. **Start the server**

   **Development mode:**

   ```bash
   npm run dev
   ```

   **Production mode:**

   ```bash
   npm start
   ```

The server will start running on `http://localhost:5001` (or the port specified in your `.env` file).

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DATABASE=mongodb+srv://username:<PASSWORD>@cluster.mongodb.net/livtrack?retryWrites=true&w=majority
DATABASE_PASSWORD=your_mongodb_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Google Cloud Vision API
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_KEYFILE=path/to/your/keyfile.json

# OpenAI API (Optional)
OPENAI_API_KEY=your_openai_api_key

# CORS Configuration
FRONTEND_URL=http://localhost:5001
```

### Environment Variable Descriptions:

| Variable                  | Description                                |
| ------------------------- | ------------------------------------------ |
| `PORT`                    | Port number for the server                 |
| `DATABASE`                | MongoDB connection string                  |
| `DATABASE_PASSWORD`       | MongoDB password                           |
| `JWT_SECRET`              | Secret key for JWT token generation        |
| `JWT_EXPIRES_IN`          | Token expiration time                      |
| `GOOGLE_CLOUD_PROJECT_ID` | Google Cloud project ID for Vision API     |
| `GOOGLE_CLOUD_KEYFILE`    | Path to Google Cloud credentials JSON file |
| `OPENAI_API_KEY`          | OpenAI API key for AI features             |
| `FRONTEND_URL`            | Frontend application URL for CORS          |

## 🌐 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint  | Description              | Auth Required |
| ------ | --------- | ------------------------ | ------------- |
| POST   | `/signup` | Register new user        | ❌            |
| POST   | `/login`  | User login               | ❌            |
| POST   | `/logout` | User logout              | ✅            |
| GET    | `/me`     | Get current user profile | ✅            |

### Health Metrics Routes (`/api/v1/health`)

#### Eye Metrics

| Method | Endpoint             | Description                       | Auth Required |
| ------ | -------------------- | --------------------------------- | ------------- |
| POST   | `/eye-metrics`       | Add eye health data               | ✅            |
| GET    | `/eye-metrics`       | Get all eye metrics               | ✅            |
| GET    | `/eye-metrics-graph` | Get eye metrics for visualization | ✅            |
| PUT    | `/eye-metrics/:id`   | Update eye metric                 | ✅            |
| DELETE | `/eye-metrics/:id`   | Delete eye metric                 | ✅            |

#### Cholesterol Metrics

| Method | Endpoint                     | Description                        | Auth Required |
| ------ | ---------------------------- | ---------------------------------- | ------------- |
| POST   | `/cholesterol-metrics`       | Add cholesterol data               | ✅            |
| GET    | `/cholesterol-metrics`       | Get cholesterol history            | ✅            |
| GET    | `/cholesterol-metrics-graph` | Get cholesterol visualization data | ✅            |
| PUT    | `/cholesterol-metrics/:id`   | Update cholesterol record          | ✅            |
| DELETE | `/cholesterol-metrics/:id`   | Delete cholesterol record          | ✅            |

#### Blood Metrics

| Method | Endpoint               | Description                     | Auth Required |
| ------ | ---------------------- | ------------------------------- | ------------- |
| POST   | `/blood-metrics`       | Add blood test results          | ✅            |
| GET    | `/blood-metrics`       | Get blood test history          | ✅            |
| GET    | `/blood-metrics-graph` | Get blood metrics visualization | ✅            |
| PUT    | `/blood-metrics/:id`   | Update blood test record        | ✅            |
| DELETE | `/blood-metrics/:id`   | Delete blood test record        | ✅            |

#### PCOS Metrics

| Method | Endpoint            | Description        | Auth Required |
| ------ | ------------------- | ------------------ | ------------- |
| POST   | `/pcos-metrics`     | Add PCOS data      | ✅            |
| GET    | `/pcos-metrics`     | Get PCOS history   | ✅            |
| PUT    | `/pcos-metrics/:id` | Update PCOS record | ✅            |
| DELETE | `/pcos-metrics/:id` | Delete PCOS record | ✅            |

### OCR Routes (`/api/v1/ocr`)

| Method | Endpoint   | Description                            | Auth Required |
| ------ | ---------- | -------------------------------------- | ------------- |
| POST   | `/extract` | Extract text from medical report image | ✅            |
| POST   | `/parse`   | Parse extracted medical data           | ✅            |

### Dashboard Routes (`/api/v1/dashBoard`)

| Method | Endpoint      | Description                       | Auth Required |
| ------ | ------------- | --------------------------------- | ------------- |
| GET    | `/overview`   | Get comprehensive health overview | ✅            |
| GET    | `/statistics` | Get health statistics and trends  | ✅            |

## 💡 Usage

### Example: User Registration

```javascript
// POST /api/v1/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "passwordConfirm": "securePassword123"
}
```

### Example: Adding Blood Metrics

```javascript
// POST /api/v1/health/blood-metrics
// Headers: Authorization: Bearer <jwt_token>
{
  "date": "2025-12-18",
  "hemoglobin": 14.5,
  "wbc": 7000,
  "rbc": 5.2,
  "platelets": 250000,
  "notes": "Regular checkup"
}
```

### Example: OCR Text Extraction

```javascript
// POST /api/v1/ocr/extract
// Headers:
//   Authorization: Bearer <jwt_token>
//   Content-Type: multipart/form-data
// Body: FormData with 'image' field containing the medical report image
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication system
- **Protected Routes**: Middleware ensures only authenticated users can access sensitive data
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Request validation to prevent malicious data

## 🚦 Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:

```json
{
  "status": "error",
  "message": "Error description here"
}
```

## 🧪 Development

### Running with Nodemon

For development with auto-restart on file changes:

```bash
npm run dev
```

### Project Standards

- Use ES6+ JavaScript features
- Follow RESTful API design principles
- Maintain modular code structure
- Write descriptive commit messages
- Document new endpoints and features

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Developer**: [Your Name]
- **Repository**: LivTrack-server

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🗺 Roadmap

- [ ] Add unit and integration tests
- [ ] Implement real-time notifications
- [ ] Add more health metrics (blood pressure, glucose, etc.)
- [ ] Develop data export functionality
- [ ] Create API documentation with Swagger
- [ ] Add email verification for user registration
- [ ] Implement password reset functionality
- [ ] Add data visualization endpoints

---

**Made with ❤️ for better health tracking**
