# Quick Setup Guide

## Step 1: Install Dependencies

### Frontend
```bash
npm install
```

### Backend
```bash
cd server
npm install
cd ..
```

## Step 2: Setup Environment Variables

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add your configuration:
- MongoDB URI (use MongoDB Atlas or local MongoDB)
- Email credentials (optional, for contact form notifications)

## Step 3: Copy Images

```bash
mkdir -p public/images
cp ../images/* public/images/
```

## Step 4: Start the Application

### Terminal 1 - Start Backend
```bash
cd server
npm run dev
```

### Terminal 2 - Start Frontend
```bash
npm run dev
```

## Access the Application

- **Portfolio**: http://localhost:5173
- **Services Management**: http://localhost:5173/admin/services
- **Backend API**: http://localhost:5000

## MongoDB Setup Options

### Option 1: Local MongoDB
Install MongoDB locally and run:
```bash
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`

## Email Setup (Optional)

To enable email notifications for contact form:

1. Use Gmail account
2. Enable 2-factor authentication
3. Generate App Password: https://myaccount.google.com/apppasswords
4. Add to `server/.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

## Troubleshooting

### Port Already in Use
If port 5173 or 5000 is in use, you can change them:
- Frontend: Edit `vite.config.js`
- Backend: Change `PORT` in `server/.env`

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env`
- Check network access in MongoDB Atlas

### Module Not Found
Run `npm install` in both root and server directories

## Next Steps

1. Customize your portfolio content in `src/components/`
2. Add your projects in `src/components/Projects.jsx`
3. Update contact information in `src/components/Contact.jsx`
4. Add services via the admin panel at `/admin/services`
