# EVENTHORIZON

### Description

An Event Management System (EMS) where users can both organize events and register for events.

### Tech Stack

- Backend:
  - Node.js
  - Express
  - MySQL
  - Firebase (for images and login with Google)
- Frontend:
  - React
  - Tailwind
  - Antdesign (for admin dashboard)

### How to Get Started

- Use `git clone`
- Create a MySQL database on your machine
- Add `.env` file to the root folder and another `.env` file inside client folder.
- Add to the first `.env` file the following variables:
  - DB_USER
  - DB_PW
  - DB_NAME
  - JWT_SECRET
- Add to the `.env` file which is inside client folder the following variables:
  - REACT_APP_FIREBASE_API_KEY
  - REACT_APP_FIREBASE_AUTH_DOMAIN
  - REACT_APP_FIREBASE_PROJECT_ID,- REACT_APP_FIREBASE_STORAGE_BUCKET
  - REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  - REACT_APP_FIREBASE_APP_ID
  - REACT_APP_FIREBASE_MEASUREMENT_ID
- Run `npm run both` in the root folder to start both the backend and the frontend, which can independently be run by the following commands: `npm run dev` (backend), `cd client` then `npm start` (frontend)
- Run `node insert_sample` in the root folder to insert sample data
