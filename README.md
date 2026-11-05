# CampusConnect

Web-based campus management and navigation system (MERN stack).

## Features
- Interactive campus map (click a building)
- Building and room information
- Room availability (available / occupied)
- Issue reporting (student) and issue management (admin)
- Campus announcements
- Admin dashboard (buildings, rooms, announcements, issues)
- Search (buildings and rooms)
- Login with student / admin roles

## Run the project
```
# 1. Backend
cd server
npm install
npm run seed      # adds admin + sample data
npm run dev

# 2. Frontend (new terminal)
cd client
npm install
npm run dev
```
Admin login: admin@campus.com / admin123
(MongoDB must be running locally, or put your Atlas link in server/.env)
