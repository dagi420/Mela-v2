# Mela - Personal Finance Manager

## Overview
Mela is a modern personal finance management application built with React and TypeScript. It helps users track expenses, manage investments, set financial goals, and gain insights through detailed reports and analytics.

## Technologies Used

### Frontend
- **React 18.3.1**: Core UI library
- **TypeScript 5.5.3**: Static typing and enhanced developer experience
- **Vite 5.4.2**: Build tool and development server
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **Chart.js & React-Chartjs-2**: Data visualization
- **Lucide React**: Modern icon library
- **React Router DOM**: Client-side routing

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Cors**: Cross-origin resource sharing

## Project Structure

```
mela-budget-app/
├── server/            # Backend server
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── middleware/    # Custom middleware
└── src/               # Frontend source
    ├── components/    # Reusable UI components
    ├── pages/         # Page components
    ├── hooks/         # Custom React hooks
    └── utils/         # Utility functions
```

## Key Features

1. **User Authentication**
   - JWT-based authentication
   - Secure password hashing
   - Protected routes

2. **Financial Management**
   - Expense tracking
   - Income management
   - Investment portfolio
   - Financial goals

3. **Analytics & Reporting**
   - Interactive charts
   - Financial insights
   - Performance metrics
   - Trend analysis

4. **User Interface**
   - Responsive design
   - Dark mode support
   - Animated transitions
   - Interactive data visualizations

## Development Setup

1. **Prerequisites**
   ```bash
   - Node.js (v18 or higher)
   - MongoDB
   ```

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   ```

3. **Running the Application**
   ```bash
   # Start the backend server
   npm run server

   # Start the frontend development server
   npm run dev
   ```

4. **Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mela_budget_app
   JWT_SECRET=your_jwt_secret_here
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register`: User registration
- `POST /api/auth/login`: User login

### Expenses
- `GET /api/expenses`: Get all expenses
- `POST /api/expenses`: Create new expense
- `PUT /api/expenses/:id`: Update expense
- `DELETE /api/expenses/:id`: Delete expense

### Income
- `GET /api/income`: Get all income entries
- `POST /api/income`: Add new income
- `DELETE /api/income/:id`: Delete income entry

### Investments
- `GET /api/investments`: Get all investments
- `POST /api/investments`: Add new investment
- `DELETE /api/investments/:id`: Delete investment

### Goals
- `GET /api/goals`: Get all financial goals
- `POST /api/goals`: Create new goal
- `PUT /api/goals/:id`: Update goal progress
- `DELETE /api/goals/:id`: Delete goal

## Design System

### Colors
- Primary: Custom blue palette
- Dark mode: Sophisticated dark theme
- Accent colors: Used for data visualization

### Typography
- Display Font: Cal Sans
- Body Font: Inter
- Optimized for readability and hierarchy

### Components
- Cards with backdrop blur
- Animated transitions
- Interactive charts
- Responsive layouts

## Performance Considerations

1. **Frontend**
   - Code splitting for route-based components
   - Optimized animations
   - Efficient state management
   - Lazy loading of heavy components

2. **Backend**
   - MongoDB indexing
   - JWT-based stateless authentication
   - Request validation
   - Error handling middleware

## Security Measures

1. **Authentication**
   - JWT token validation
   - Password hashing with bcrypt
   - Protected API routes

2. **Data Protection**
   - Input validation
   - XSS protection
   - CORS configuration
   - Secure HTTP headers

## Future Enhancements

1. **Features**
   - Budget planning tools
   - Bill reminders
   - Export financial reports
   - Mobile app version

2. **Technical**
   - Real-time updates
   - Advanced analytics
   - Data backup system
   - Performance monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.