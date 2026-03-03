# Frontend 

## Overview
This project implements a modular node-based pipeline builder with backend DAG validation.

## Key Features
- Config-driven BaseNode abstraction
- 5 additional scalable node types
- Dynamic TextNode variable handle detection
- Responsive UI styling
- Backend DAG validation using Kahn's Algorithm
- Frontend-backend integration via /pipelines/parse

## Run Instructions

### Backend
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload

### Frontend
cd frontend

npm install

npm start
