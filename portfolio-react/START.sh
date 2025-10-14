#!/bin/bash

echo "🚀 Starting Portfolio Application..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "Please start MongoDB first:"
    echo "  - macOS: brew services start mongodb-community"
    echo "  - Linux: sudo systemctl start mongod"
    echo "  - Or use MongoDB Atlas (cloud)"
    echo ""
fi

# Check if .env exists
if [ ! -f "server/.env" ]; then
    echo "⚠️  server/.env file not found!"
    echo "Creating from .env.example..."
    cp server/.env.example server/.env
    echo "✅ Please edit server/.env with your configuration"
    echo ""
fi

# Start backend
echo "🔧 Starting Backend Server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application started!"
echo ""
echo "📍 Access URLs:"
echo "   - Portfolio: http://localhost:5173"
echo "   - Services Admin: http://localhost:5173/admin/services"
echo "   - Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
