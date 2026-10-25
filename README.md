TechStore — Full Stack E-commerce Application

TechStore is a full-stack e-commerce application developed as a final project for the Kodilla Full Stack Developer Bootcamp.

The application allows customers to browse products, manage their shopping cart, and place orders through an online checkout.

Live Demo

Live application: https://kodilla-techstore.onrender.com

Technologies

Frontend

React

TypeScript

Redux Toolkit

Vite

CSS

Local Storage

Backend

Node.js

NestJS

TypeScript

Prisma ORM

REST API

Database

MySQL (local development)

PostgreSQL (production)

Deployment

Render

GitHub

Features

Product listing with images, descriptions, and prices

Product details

Shopping cart management

Adding and removing products from the cart

Updating product quantities

Cart persistence using Local Storage

Checkout form with input validation

Order creation through the backend API

Order and order item storage in the database

Responsive user interface

Project Structure

kodilla-techstore/
├── client/ # React frontend
├── server/ # NestJS backend
├── build.sh # Render build script
└── README.md # Project documentation

API Endpoints

Method

Endpoint

Description

GET

/api/products

Retrieve all products

GET

/api/products/:id

Retrieve product details

POST

/api/orders

Create a new order

Customer orders are not publicly accessible through a GET endpoint.

Local Development

Requirements

Node.js

npm

MySQL

Backend

Navigate to the server directory.

Install dependencies:

npm install

Configure the DATABASE_URL environment variable in server/.env.

Generate Prisma Client:

npx prisma generate

Prepare the local database using the Prisma schema.

Start the backend:

npm run start:dev

Frontend

Navigate to the client directory.

Install dependencies:

npm install

Start the development server:

npm run dev

Deployment

The production application is deployed on Render.

The React frontend is built with Vite and served by the NestJS backend. The production database uses PostgreSQL and Prisma ORM.

The deployment process is configured through the root build.sh script.

Author

Developed as part of the Kodilla Full Stack Developer Bootcamp.

Repository

https://github.com/Kam9521/kodilla-techstore
