# PawShop - Pet Store E-Commerce

A full-stack pet store e-commerce application built with Spring Boot and React.

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3
- Spring Data JPA
- PostgreSQL

### Frontend
- React (Vite)
- Tailwind CSS
- Material UI (MUI)

## Features
- REST endpoints to Create, Read, Update, and Delete pets
- Persistent storage in PostgreSQL
- Responsive product gallery with species filters and sorting
- Search functionality
- Add to cart
- Beautiful, modern UI with Material UI components

## Project Structure
```
petstore/
├── backend/    # Spring Boot REST API
└── frontend/   # React + Vite + Tailwind + MUI
```

## Running Locally

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/pets | Get all pets |
| GET | /api/pets/{id} | Get pet by ID |
| POST | /api/pets | Create a new pet |
| PUT | /api/pets/{id} | Update a pet |
| DELETE | /api/pets/{id} | Delete a pet |
| GET | /api/pets/species/{species} | Filter by species |
| GET | /api/pets/search/{keyword} | Search pets |
