<div align="center">

# Atlas Physiotherapy

### Clinic Management System

A full-stack MERN application designed to digitize and streamline the day-to-day operations of a physiotherapy clinic.

**Appointments · Doctor Scheduling · Patient Management · Payments · Role-Based Dashboards**

<br/>

![Project Status](https://img.shields.io/badge/Status-Completed-168B62?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-MERN-2563EB?style=for-the-badge)
![Responsive](https://img.shields.io/badge/UI-Responsive-0F766E?style=for-the-badge)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Why This Project](#why-this-project)
- [Core Features](#core-features)
- [User Roles](#user-roles)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Project Structure](#project-structure)
- [Key Workflows](#key-workflows)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Overview

**Atlas Physiotherapy** is a clinic management system built to bring the essential operations of a physiotherapy clinic into one centralized application.

The platform supports multiple types of users, each with a dedicated experience and role-appropriate functionality. It brings together patient records, appointment scheduling, doctor availability, treatment sessions, payment tracking, and administrative oversight.

The application is designed around practical clinic workflows rather than a one-size-fits-all dashboard. Its modular structure separates the React frontend from the Node.js/Express backend, while role-specific components and backend controllers keep responsibilities organized.

> **Project status:** The frontend and backend development are complete. Deployment links and screenshots will be added to this repository as they become available.

## Why This Project

This project is inspired by practical experience working in a physiotherapy clinic and observing the everyday coordination required between patients, receptionists, doctors, and clinic administration.

The goal was to translate those real operational needs into a software solution: reduce manual coordination, make appointment information easier to manage, provide visibility into payments, and give each user a focused workspace.

Atlas Physiotherapy is also a hands-on full-stack engineering project, covering frontend development, API integration, authentication, database-backed workflows, reusable UI components, and role-based access.

## Core Features

### Appointment Management

- Create and manage patient appointments.
- Organize appointments by doctor, date, time, and treatment/session type.
- Track appointment statuses and changes.
- Support appointment cancellation and updates.
- Prevent conflicting or duplicate session bookings through application business rules.

### Doctor & Availability Management

- Manage doctors dynamically rather than relying on a fixed number of doctors.
- Configure doctor duty and time-slot availability.
- Keep appointment scheduling connected to doctor availability.
- Preserve already-booked appointments when duty or availability information changes.

### Patient Management

- Maintain patient profiles and related information.
- Search patient records using relevant details.
- View appointment and treatment history.
- Provide patients with access to their own appointment and payment information.

### Payments & Revenue Tracking

- Track payment status for appointments and sessions.
- Organize treatment-related payment records.
- Support revenue views for treatment categories such as:
  - Physiotherapy
  - Cupping
  - Dry Needling
  - Checkup
- Filter financial information by date range and doctor.

### Role-Based Dashboards

- Provide dedicated workspaces for administrators, doctors, receptionists, and patients.
- Present role-relevant information and actions.
- Keep public-facing pages separate from authenticated application areas.

### Authentication & Access Control

- JWT-based authentication.
- Access and refresh token workflow.
- Cookie-based token handling.
- Backend middleware for protected routes and role-based authorization.

### Responsive User Interface

- Responsive layouts for desktop, tablet, and mobile.
- Reusable React components and shared UI elements.
- Role-specific component organization.
- A clean medical SaaS visual direction using emerald/teal accents, light backgrounds, and white content surfaces.

## User Roles

| Role | Main Responsibilities |
| :--- | :--- |
| **Admin** | Clinic-wide oversight, doctor management, administrative operations, and financial reporting. |
| **Doctor** | Access doctor-specific appointments and patient/treatment workflows. |
| **Receptionist** | Coordinate patient records, appointment booking, scheduling, and payment-related operations. |
| **Patient** | Access personal information, book appointments, and review appointment, session, and payment records. |
| **Visitor** | Browse public clinic information and publicly available pages. |

Access to protected functionality is controlled through the application's authentication and authorization flow.

## Technology Stack

The project uses the MERN stack and supporting frontend libraries.

| Area | Technologies |
| :--- | :--- |
| Frontend | React.js, JavaScript |
| Styling | Tailwind CSS |
| Routing | React Router |
| State management | Redux Toolkit |
| Icons | Lucide React |
| Backend runtime | Node.js |
| Backend framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Image/file handling | Multer and Cloudinary |

## Application Architecture

Atlas Physiotherapy is organized as two separate applications:

```text
AtlasPhysiotherapy/
│
├── AtlasFrontend/       # React client application
│
└── AtlasBackend/        # Node.js and Express API
```

### Frontend

The frontend is organized around role-specific components and shared application functionality.

- **Admin, Doctor, Patient, Receptionist:** dedicated component areas for each role.
- **General components:** shared UI elements used across the application.
- **authServices:** authentication-related frontend services.
- **Redux:** centralized application state.
- **Routing:** route configuration and navigation.
- **forms:** reusable form-related components.
- **utils:** shared helper functions.
- **api.js:** API communication configuration.

### Backend

The backend follows a modular structure that separates request handling, business logic, data models, and shared infrastructure.

- **controllers:** request-handling logic, separated by application domain and user role.
- **models:** Mongoose data models.
- **routes:** API route definitions.
- **middlewares:** authentication, authorization, and other request middleware.
- **db:** database connection setup.
- **utils:** shared backend utilities.

This separation makes the codebase easier to navigate and maintain as application functionality grows.

## Project Structure

The following is a simplified view of the repository based on the project structure:

```text
AtlasPhysiotherapy/
│
├── AtlasFrontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── authServices/
│       ├── components/
│       │   ├── Admin/
│       │   ├── Doctor/
│       │   ├── GeneralComponents/
│       │   ├── Patient/
│       │   └── Receptionist/
│       ├── forms/
│       ├── Redux/
│       ├── Routing/
│       ├── utils/
│       ├── api.js
│       ├── App.css
│       ├── App.jsx
│       └── index.css
│
├── AtlasBackend/
│   ├── public/
│   └── src/
│       ├── controllers/
│       │   ├── admin/
│       │   ├── appointment/
│       │   ├── doctor/
│       │   ├── patient/
│       │   ├── receptionist/
│       │   └── user/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       ├── app.js
│       ├── constants.js
│       └── index.js
│
└── README.md
```

*Note: The tree above highlights the main application areas. It is intentionally simplified and does not list every individual file.*

## Key Workflows

### 1. Appointment Lifecycle

A patient appointment moves through the application's booking and management workflow. Authorized users can review and manage appointment information, while status and payment information remain associated with the relevant record.

### 2. Doctor Availability

Doctor duty and available time slots are used when coordinating appointments. Changes to a doctor's schedule are handled with care so that existing bookings are not unintentionally discarded.

### 3. Patient and Receptionist Operations

Receptionists can work with patient information and appointment records as part of the clinic's daily coordination. Patients have a separate area for their own bookings and related records.

### 4. Payment Overview

Payment records can be reviewed in relation to treatment category, doctor, and selected date range, supporting day-to-day tracking and administrative review.

## Getting Started

Follow these steps to run the frontend and backend locally.

### Prerequisites

Make sure the following are installed and available:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (included with Node.js)
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas)
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AtlasPhysiotherapy
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your repository's Git URL.

### 2. Install backend dependencies

```bash
cd AtlasBackend
npm install
```

### 3. Configure backend environment variables

Create/configure the backend `.env` file using the variable names expected by the backend configuration. See [Environment Configuration](#environment-configuration).

### 4. Start the backend

```bash
npm run dev
```

If the backend `package.json` uses a different development script, run the script defined there.

### 5. Install frontend dependencies

Open a second terminal:

```bash
cd AtlasPhysiotherapy/AtlasFrontend
npm install
```

### 6. Configure frontend API settings

Set the frontend API base URL to the local backend address expected by the application's API configuration.

### 7. Start the frontend

```bash
npm run dev
```

Use the local URL printed by the frontend development server to open the application.

> **Important:** Run frontend and backend in separate terminals. The exact available npm scripts and required environment variable names are defined by the respective project configuration files.

## Environment Configuration

The backend includes an environment sample file (`envSmaple.env`) and an environment file in its project structure. Configure your local environment using the exact variable names referenced by the backend code.

Typical configuration categories for this application may include:

| Configuration | Purpose |
| :--- | :--- |
| Database connection | MongoDB connection string |
| Server configuration | Backend port and runtime settings |
| JWT configuration | Access/refresh token secrets and expiry settings |
| Frontend origin | Allowed client origin for cross-origin requests |

| Cloudinary configuration | Cloudinary credentials if image uploads are enabled |

**Security notes:**

- Never commit real `.env` values, credentials, private keys, or tokens.
- Keep local environment files out of version control.
- Use your hosting provider's environment-variable settings for deployment.
- Do not copy example placeholder values into production.

## Available Scripts

Run npm scripts from the relevant application directory.

```bash
# Install dependencies
npm install

# Start the development script (if defined in package.json)
npm run dev

# Run the production/start script (if defined in package.json)
npm start
```

The actual script names are determined by each application's `package.json`.

## Screenshots

Application screenshots and walkthrough images will be added here in a future update.

<!-- Add edited screenshots to a repository folder such as docs/screenshots/ and replace the placeholders below. -->

| Area | Preview |
| :--- | :--- |
| Public Home Page | *Screenshot coming soon* |
| Admin Dashboard | *Screenshot coming soon* |
| Doctor Dashboard | *Screenshot coming soon* |
| Receptionist Dashboard | *Screenshot coming soon* |
| Patient Dashboard | *Screenshot coming soon* |
| Appointment Management | *Screenshot coming soon* |
| Payment Management | *Screenshot coming soon* |

## Deployment

**Deployment is planned.** The application is not presented as live yet. Add the production URLs here after deploying the frontend and backend.

| Service | Deployment URL |
| :--- | :--- |
| Frontend | **[ADD FRONTEND DEPLOYMENT URL HERE]** |
| Backend API | **[ADD BACKEND DEPLOYMENT URL HERE]** |

### Deployment Checklist

- [ ] Deploy the backend API.
- [ ] Configure production environment variables.
- [ ] Configure the production database connection.
- [ ] Set the frontend origin/CORS configuration.
- [ ] Deploy the frontend.
- [ ] Update the frontend API base URL.
- [ ] Add the live frontend and backend URLs above.
- [ ] Verify authentication, appointments, and payment workflows in production.

## Future Improvements

The current application is complete. The following are possible future enhancements rather than unfinished core requirements:

- Add automated tests for critical workflows.
- Expand reporting and analytics.
- Improve operational monitoring and audit visibility.
- Add further documentation and visual walkthroughs.

## Author

**Hassan Ali**

Full-Stack Developer | MERN Stack

- GitHub: [Add your GitHub profile URL](https://github.com/)
- LinkedIn: [Add your LinkedIn profile URL](https://www.linkedin.com/)

---

<div align="center">

**Atlas Physiotherapy — Bringing clinic operations into one organized workspace.**

</div>
