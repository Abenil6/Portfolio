# Portfolio React Application

A modern, responsive portfolio website built with React, featuring a contact form and services management system.

## Features

- **Responsive Design**: Fully responsive portfolio that works on all devices
- **Contact Form**: Functional contact form with backend integration
- **Services Management**: Admin page to manage services (CRUD operations)
- **Modern UI**: Built with Tailwind CSS styling and Lucide React icons
- **Smooth Animations**: Engaging animations and transitions
- **Backend API**: Node.js/Express backend with MongoDB

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas account)

## Installation

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Copy Images

Copy your images from the original portfolio to the public folder:

```bash
cp -r ../images ./public/
```

## Running the Application

### Start MongoDB (if running locally)

```bash
mongod
```

### Start the Backend Server

```bash
cd server
npm run dev
```

The backend will run on `http://localhost:5000`

### Start the Frontend (in a new terminal)

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure

```
portfolio-react/
├── public/
│   └── images/          # Portfolio images
├── src/
│   ├── components/      # React components
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── BackToTop.jsx
│   ├── pages/           # Page components
│   │   ├── Portfolio.jsx
│   │   └── ServicesManagement.jsx
│   ├── App.jsx          # Main app component
│   └── index.css        # Global styles
├── server/              # Backend API
│   ├── server.js        # Express server
│   └── .env             # Environment variables
└── package.json
```

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages

### Services Management
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

## Pages

### Main Portfolio (`/`)
- Hero section with introduction
- About section
- Skills section with animated progress bars
- Projects showcase
- Contact form

### Services Management (`/admin/services`)
- View all services
- Add new services
- Edit existing services
- Delete services

## Author

**Abenezer Aschalew**
- Email: abenilee740@gmail.com
- GitHub: [@Abenil6](https://github.com/Abenil6)
- LinkedIn: [Abenezer Aschalew](https://www.linkedin.com/in/abenezer-aschalew-ab17ab261/)
