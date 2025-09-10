# getVolunteers Frontend

A Next.js frontend application for connecting volunteers with meaningful opportunities.

## Features

- Browse volunteer opportunities
- View volunteer profiles
- User authentication (login/register)
- Responsive design with Tailwind CSS

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Update the API URL in `.env` to point to your backend:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Integration

This frontend is designed to work with the getVolunteers backend API.

### Backend Setup

1. Clone the backend repository:

```bash
git clone https://github.com/FGuerriero/get-volunteers-backend.git
```

2. Follow the setup instructions in the backend repository to get the API running locally.

3. Make sure your backend is running on the configured URL (default: http://localhost:8000).

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/src/lib` - API client and utilities
- `/src/types` - TypeScript type definitions

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Axios for API calls
