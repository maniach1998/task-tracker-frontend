# Nooro Task Tracker (Frontend)

A modern task tracking application built with Next.js, TypeScript, and a Node.js backend.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Project Structure

The project consists of two main parts:

- `task-tracker-frontend`: Next.js frontend application
- `task-tracker-backend`: Node.js backend server

## Getting Started

### 1. Clone the Repository (frontend)

```bash
git clone https://github.com/maniach1998/task-tracker-frontend
cd task-tracker-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Start production server

```bash
npm start
```

The frontend application will be available at http://localhost:3000

## Development

- Frontend: Built with Next.js 14, React Query, and Tailwind CSS
- Backend: Express.js with TypeScript
- Both projects use TypeScript for type safety

## Available Scripts

Frontend:

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Features

- Create, edit, and delete tasks
- Color-code your tasks
- Mark tasks as complete/incomplete
- Real-time updates using React Query
- Responsive design
- Form validation using Zod
- Toast notifications for user feedback

## Tech Stack

- **Frontend**:

  - Next.js 14
  - TypeScript
  - React Query
  - Tailwind CSS
  - Shadcn UI
  - React Hook Form
  - Zod

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - MySQL (Community Server)
