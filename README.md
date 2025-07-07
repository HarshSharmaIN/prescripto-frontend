# Prescripto Healthcare Management System (Frontend)

A modern, responsive web application for managing healthcare appointments, prescriptions, and doctor-patient interactions. Built with **React**, **Vite**, and **Tailwind CSS** for a seamless user experience.

## Features

- User authentication and secure access
- Book, view, and manage appointments
- Upload and manage prescription files (JPG, PNG, PDF)
- Real-time notifications and feedback
- Doctor and patient dashboards
- Integrated payment via Razorpay
- Responsive UI with Tailwind CSS
- File upload with validation and progress feedback

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [Razorpay](https://razorpay.com/)
- [Lucide React Icons](https://lucide.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/HarshSharmaIN/prescripto-frontend.git
   cd prescripto-frontend
   ```
2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory with the following content:

   ```
   VITE_BACKEND_URL=https://your-backend-api-url.com
   VITE_RAZORPAY_KEY=your_razorpay_key
   ```

   - `VITE_BACKEND_URL`: The base URL of your backend API.
   - `VITE_RAZORPAY_KEY`: Your Razorpay public key for payment integration.

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to see the app in action.

### Building for Production

To build the app for production, run:

```sh
npm run build
# or
yarn build
```

This will create an optimized build of your app in the `dist` directory.

## Project Structure

```
prescripto-frontend-main/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and SVGs
│   ├── components/        # Reusable React components
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables (not committed)
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Environment Variables Reference

| Variable          | Description          | Example                   |
| ----------------- | -------------------- | ------------------------- |
| VITE_BACKEND_URL  | Backend API base URL | https://api.example.com   |
| VITE_RAZORPAY_KEY | Razorpay public key  | rzp_test_1234567890abcdef |

