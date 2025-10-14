# 🚀 Quick Start Guide

## Prerequisites Check
- ✅ Node.js installed
- ✅ Dependencies installed (frontend & backend)
- ✅ Images copied to `public/images/`
- ⚠️ MongoDB setup needed

## Start Application

### Option 1: Automated (Recommended)
```bash
./START.sh
```

### Option 2: Manual

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Access Your Portfolio

- 🌐 **Main Portfolio**: http://localhost:5173
- ⚙️ **Admin Panel**: http://localhost:5173/admin/services
- 🔌 **API**: http://localhost:5000

## MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB (if not installed)
brew install mongodb-community  # macOS
# OR
sudo apt install mongodb  # Linux

# Start MongoDB
brew services start mongodb-community  # macOS
# OR
sudo systemctl start mongod  # Linux
```

### MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

## Email Setup (Optional)

For contact form notifications:

1. Use Gmail account
2. Enable 2FA: https://myaccount.google.com/security
3. Create App Password: https://myaccount.google.com/apppasswords
4. Update `server/.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   ```

## Test the Application

1. ✅ Open http://localhost:5173
2. ✅ Navigate through all sections
3. ✅ Test contact form
4. ✅ Visit http://localhost:5173/admin/services
5. ✅ Add/Edit/Delete a service

## Common Issues

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
pgrep mongod

# If not running, start it
brew services start mongodb-community  # macOS
```

### "Port 5173 already in use"
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9
```

### "Port 5000 already in use"
```bash
# Kill the process
lsof -ti:5000 | xargs kill -9
```

## Customize Your Portfolio

Edit these files:
- `src/components/Hero.jsx` - Your name and intro
- `src/components/About.jsx` - About section
- `src/components/Skills.jsx` - Your skills
- `src/components/Projects.jsx` - Your projects
- `src/components/Contact.jsx` - Contact info

## Project Structure
```
portfolio-react/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   └── App.jsx         # Main app
├── server/
│   ├── server.js       # Backend API
│   └── .env            # Configuration
└── public/
    └── images/         # Your images
```

## Need Help?

- 📖 Read `README.md` for full documentation
- 📋 Check `PROJECT_SUMMARY.md` for overview
- 🔧 Review `SETUP.md` for detailed setup

## Next Steps

1. ✅ Test the application
2. 🎨 Customize your content
3. 📝 Add more projects
4. 🚀 Deploy to production

---

**Ready to start?** Run `./START.sh` or follow the manual steps above!
