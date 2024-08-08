#!/bin/bash

# Function to start SQL Server (this is a placeholder, replace with your actual command if needed)
start_sql_server() {
  echo "Ensure SQL Server is running"
  # Add commands to start SQL Server if needed
}

# Function to start the backend server
start_backend() {
  echo "Starting backend server..."
  cd backend || { echo "Backend directory not found"; exit 1; }
  npm install || { echo "Failed to install backend dependencies"; exit 1; }
  export PORT=5000
  npm start &
  BACKEND_PID=$!
  cd ..
}

# Function to start the frontend server
start_frontend() {
  echo "Starting frontend server..."
  cd frontend || { echo "Frontend directory not found"; exit 1; }
  npm install || { echo "Failed to install frontend dependencies"; exit 1; }
  npm start &
  FRONTEND_PID=$!
  cd ..
}

# Start SQL Server
start_sql_server

# Start backend server
start_backend

# Start frontend server
start_frontend

echo "Both backend and frontend servers are starting..."

# Function to stop servers on exit
cleanup() {
  echo "Stopping backend and frontend servers..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  echo "Servers stopped."
}

# Trap EXIT signal to stop servers when the script exits
trap cleanup EXIT

# Wait indefinitely (to keep the script running)
while true; do
  sleep 1
done
