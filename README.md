# 📅 Calendar App

A full-stack calendar application with event management, built with React, TypeScript, Node.js, Express, and PostgreSQL.

![Calendar App Demo](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Calendar+App+Demo)

## ✨ Features

- 📅 **Monthly Calendar View** - Visual calendar grid with event display
- 📋 **List View** - Detailed event list with filtering
- ➕ **Event Management** - Create, edit, delete events
- 🎯 **Priority System** - 5-level priority with color coding
- 📱 **Responsive Design** - Works on desktop and mobile
- 🗓️ **Date Navigation** - Easy month browsing
- ⚡ **Auto Duration** - Events automatically set to 1-hour duration
- 🎨 **Modern UI** - Clean, intuitive interface

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **CSS-in-JS** styling
- **Axios** for API calls
- **Date/Time** handling

### Backend

- **Node.js** with Express
- **TypeScript**
- **PostgreSQL** database
- **RESTful API** design

### DevOps

- **Docker** & Docker Compose
- **VS Code** development setup
- **Git** version control

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone the repository

````bash
git clone https://github.com/yourusername/calendar-app.git
cd calendar-app
2. Set up environment variables
bash# Copy example environment file
cp .env.example .env

# Edit .env with your settings (optional - defaults work for development)
3. Start with Docker (Recommended)
bash# Start PostgreSQL database
docker-compose up -d postgres

# Install dependencies and start backend
cd backend
npm install
npm run build
npm start

# In another terminal, start frontend
cd frontend
npm install
npm start
4. Access the application

Frontend: http://localhost:3000
Backend API: http://localhost:3001
Database: localhost:5432

📋 Manual Setup (Alternative)
Database Setup
bash# Install PostgreSQL locally
# Create database and user
createdb calendar_db
psql calendar_db < init.sql
Backend Setup
bashcd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run build
npm start
Frontend Setup
bashcd frontend
npm install
npm start
🗂️ Project Structure
calendar-app/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── config/          # Database configuration
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml       # Docker services
├── init.sql                 # Database schema
└── README.md
🔧 API Endpoints
MethodEndpointDescriptionGET/api/eventsGet all eventsGET/api/events/:idGet event by IDPOST/api/eventsCreate new eventPUT/api/events/:idUpdate eventDELETE/api/events/:idDelete eventGET/api/events/priority/:priorityGet events by priority
📱 Usage
Creating Events

Click "+ Add Event" button or click on any calendar date
Fill in event details (title, description, start time, priority)
End time is automatically set to 1 hour after start time
Click "Create Event"

Managing Events

View: Switch between Calendar and List views using tabs
Edit: Click on any event to modify it
Delete: Use the delete button in event details
Filter: Filter events by priority level in List view

Navigation

Use "Previous" and "Next" buttons to navigate months
Click "Today" to jump to current date
Events are color-coded by priority level

🎨 Priority Colors

🟢 Low (1): Green
🔵 Normal (2): Blue
🟡 Medium (3): Yellow
🔴 High (4): Red
🟤 Critical (5): Dark Red

🧪 Development
Running Tests
bash# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
Building for Production
bash# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
🐳 Docker Commands
bash# Start all services
docker-compose up -d

# View logs
docker logs calendar_backend
docker logs calendar_postgres

# Stop services
docker-compose down

# Rebuild services
docker-compose up --build
🔍 Troubleshooting
Common Issues
Database Connection Error
bash# Check if PostgreSQL is running
docker ps

# Check backend logs
docker logs calendar_backend
Frontend Not Loading
bash# Check if backend is running on port 3001
curl http://localhost:3001/health

# Should return: {"status":"OK","timestamp":"..."}
Port Conflicts
bash# Check what's using the ports
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # PostgreSQL
🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Built with modern web technologies
Inspired by popular calendar applications
Thanks to the open-source community

📞 Support
If you have any questions or run into issues:

Check the Troubleshooting section
Open an issue on GitHub
Review the API documentation


Happy scheduling! 🎉

### 1.3 Create .env.example
Create `.env.example`:
Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
Server Configuration
NODE_ENV=development
PORT=3001
Optional: Custom database settings
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database

## Step 2: Initialize Git Repository

### 2.1 Initialize Git
```bash
cd calendar-app
git init
git add .
git commit -m "Initial commit: Calendar app with React, TypeScript, Express, PostgreSQL"
2.2 Create repository on GitHub

Go to https://github.com
Click "New repository"
Name it calendar-app
Don't initialize with README (we already have one)
Click "Create repository"

2.3 Connect local repo to GitHub
bash# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/calendar-app.git

# Push to GitHub
git branch -M main
git push -u origin main
Step 3: Optional Additional Files
3.1 Create LICENSE file
Create LICENSE:
MIT License



## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/calendar-app.git`
3. Install dependencies: `npm install` in both `backend/` and `frontend/`
4. Start development servers
5. Make your changes
6. Test your changes
7. Submit a pull request

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Add comments for complex logic
- Write meaningful commit messages

## Reporting Issues

- Use GitHub Issues to report bugs
- Include steps to reproduce
- Provide system information
- Include error messages if any

## Feature Requests

- Open a GitHub Issue with the "enhancement" label
- Describe the feature clearly
- Explain the use case
Step 4: Push Everything to GitHub
bash# Add all new files
git add .

# Commit with descriptive message
git commit -m "Add documentation, configuration files, and project setup"

# Push to GitHub
git push origin main
````
