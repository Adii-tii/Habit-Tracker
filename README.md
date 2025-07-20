# HabitTracker - Your Personal Habit & Task Management App

A modern, full-stack web application designed to help users build better habits, track tasks, and achieve their goals with AI-powered suggestions and comprehensive analytics.

## Features

### Core Functionality
- **Habit Tracking**: Create and monitor daily habits with streak counting
- **Task Management**: Organize tasks with categories, priorities, and deadlines
- **AI-Powered Suggestions**: Get personalized habit and task recommendations from Bo, your AI assistant
- **Analytics Dashboard**: Visual insights into your progress and patterns
- **Calendar Integration**: Plan and view your habits and tasks on a calendar
- **Pomodoro Timer**: Stay focused with built-in time management tools
- **User Authentication**: Secure login and registration system

### Advanced Features
- **Progress Tracking**: Monitor habit streaks and completion rates
- **Custom Categories**: Organize habits and tasks with custom tags
- **Priority Management**: Set and manage task priorities
- **Reminder System**: Never miss important tasks or habits
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Modern UI with customizable appearance

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **Firebase** - Authentication and real-time features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing

### AI Integration
- **Google Gemini API** - AI-powered suggestions and assistance
- **Custom AI Assistant (Bo)** - Personalized habit and task recommendations

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/habittracker.git
cd habittracker
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd client
npm install
```

### 3. Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

#### Frontend Environment Variables
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Database Setup
1. Set up a MongoDB database (local or cloud)
2. Update the `MONGODB_URI` in your backend `.env` file
3. The application will automatically create the necessary collections

### !!IMPORTANT
Generate your own google gemini api key using google AI studio and replace the existing API key in the code (client\src\components\appComponents\ai\AiSuggestions.jsx). 
The API_KEY defined is for demonstration purpose only.

### 5. Start the Application

#### Development Mode
```bash
# Start backend server (from server directory)
cd server
node index.js

# Start frontend (from client directory)
cd client
npm run dev
```

#### Production Mode
```bash
# Build frontend
cd client
npm run build

# Start backend
cd server
npm start
```

## 🎯 Usage

### Getting Started
1. **Register/Login**: Create an account or sign in to your existing account
2. **Create Your First Habit**: Use the AI suggestions or create custom habits
3. **Track Progress**: Mark habits as complete and watch your streaks grow
4. **Explore Features**: Try the calendar, analytics, and AI suggestions

### Key Features Guide

#### AI Assistant (Bo)
- Ask for habit suggestions: "Help me build better learning habits"
- Get task recommendations: "I need help with work productivity"
- Request detailed plans: "Create a fitness routine for beginners"

#### Habit Management
- Create habits with custom categories and priorities
- Track daily completion and build streaks
- Set time-based or checklist-based habits
- View progress in the analytics dashboard

#### Task Organization
- Create tasks with deadlines and priorities
- Organize with custom categories and tags
- Use the calendar view for planning
- Set reminders for important tasks

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/users/register - Register new user
POST /api/users/login - User login
```

### Habit Endpoints
```
GET /api/habits/user/:userId - Get user's habits
POST /api/habits/saveHabit - Create new habit
PUT /api/habits/:habitId - Update habit
DELETE /api/habits/:habitId - Delete habit
```

### Task Endpoints
```
GET /api/quicktasks/user/:userId - Get user's tasks
POST /api/quicktasks - Create new task
PUT /api/quicktasks/:id - Update task
DELETE /api/quicktasks/:id - Delete task
```

### Reminder Endpoints
```
GET /api/reminders/user/:userId - Get user's reminders
POST /api/reminders - Create new reminder
DELETE /api/reminders/:id - Delete reminder
```

### Feedback Endpoint
```
POST /api/feedback - Send feedback to developers
```

## 🏗️ Project Structure

```
HabitTracker/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── appComponents/  # Main app components
│   │   │   │   ├── ai/         # AI suggestions
│   │   │   │   ├── analytics/  # Analytics dashboard
│   │   │   │   ├── calendar/   # Calendar components
│   │   │   │   ├── dashboard/  # Dashboard components
│   │   │   │   ├── habit/      # Habit management
│   │   │   │   ├── layout/     # Layout components
│   │   │   │   ├── modals/     # Modal components
│   │   │   │   ├── settings/   # Settings components
│   │   │   │   └── ui/         # UI components
│   │   │   ├── AuthModal.jsx   # Authentication modal
│   │   │   ├── UserContext.jsx # User context provider
│   │   │   └── ...
│   │   ├── assets/         # Static assets
│   │   ├── utilityFunctions/ # Utility functions
│   │   └── ...
│   ├── public/             # Public assets
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Add appropriate comments and documentation
- Test your changes thoroughly
- Update the README if needed

## 🐛 Known Issues

- Feedback system may require email configuration
- AI suggestions occasionally return invalid task types
- Mobile responsiveness needs improvement in some areas

## 🔮 Future Enhancements

- [ ] Push notifications for reminders
- [ ] Social features and habit sharing
- [ ] Advanced analytics and insights
- [ ] Integration with third-party apps
- [ ] Mobile app development
- [ ] Offline mode support
- [ ] Advanced AI features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini API** for AI-powered suggestions
- **Tailwind CSS** for the beautiful UI components
- **Lucide React** for the amazing icons
- **MongoDB** for the reliable database
- **React Community** for the excellent documentation and tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/habittracker/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Made with ❤️ by the HabitTracker Team**

*Building better habits, one day at a time.*
