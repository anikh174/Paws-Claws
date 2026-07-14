# 🏥 DocAppoint — Doctor Appointment Booking System

**Live Site:** [https://docappoint.vercel.app](https://doc-appoint-vert.vercel.app/)

> Bangladesh's trusted platform for finding and booking doctor appointments online. Connect with 500+ verified specialists, manage bookings, and take control of your healthcare journey — all in one place.

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Email/password login & Google OAuth via Better Auth (JWT-based sessions). Private routes are fully protected and persist on page reload.
- 📅 **Smart Appointment Booking** — Browse verified doctors by specialty, view full profiles, and book appointments instantly with a clean modal form.
- 👤 **Personal Dashboard** — Logged-in users can view, update, and delete their own appointments in real time — no page reload required.
- 🔍 **Search & Filter** — Instantly search doctors by name and filter by medical specialty on the All Appointments page.
- ⭐ **Doctor Reviews** — Patients can leave star ratings and reviews for doctors after completing an appointment.

---

## 🛠️ Tech Stack

### Client
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| React Hot Toast | Notifications |
| Swiper.js | Hero banner slider |
| React Helmet | SEO metadata per page |

### Server
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | ODM |
| Better Auth | Authentication (JWT/session) |
| CORS | Cross-origin configuration |
| dotenv | Environment variables |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (for social login)

### 1. Clone the Repository

```bash
git clone https://github.com/anikh174/doc-appoint.git
cd docappoint
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=secret
JWT_SECRET=secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
```

Seed the database:

```bash
node seed.js
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the client:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

| Variable | Location | Description |
|---|---|---|
| `MONGODB_URI` | server | MongoDB connection string |
| `JWT_SECRET` | server | Secret key for signing JWTs |
| `GOOGLE_CLIENT_ID` | server + client | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | server | Google OAuth client secret |
| `CLIENT_URL` | server | Frontend URL for CORS |
| `VITE_API_URL` | client | Backend API base URL |

---

## 📡 API Endpoints

### Doctors
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/doctors` | Get all doctors | Public |
| GET | `/api/doctors/:id` | Get doctor by ID | Public |
| GET | `/api/doctors/top-rated` | Get top 3 rated doctors | Public |

### Appointments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/appointments` | Get all appointments | Public |
| GET | `/api/appointments/my` | Get logged-in user's bookings | 🔒 Private |
| POST | `/api/appointments` | Book a new appointment | 🔒 Private |
| PUT | `/api/appointments/:id` | Update an appointment | 🔒 Private |
| DELETE | `/api/appointments/:id` | Delete an appointment | 🔒 Private |

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google` | Google OAuth login |
| GET | `/api/auth/me` | Get current user |

### Reviews
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/reviews/:doctorId` | Get reviews for a doctor | Public |
| POST | `/api/reviews` | Post a review | 🔒 Private |

---

## 🔒 Authentication Flow

```
User submits login form
        ↓
Server validates credentials
        ↓
JWT token issued & stored in localStorage
        ↓
Token sent in Authorization header on every request
        ↓
Server middleware verifies token on protected routes
        ↓
Logged-in user persists on page reload via token check
```

Password validation rules enforced on registration:
- Minimum **6 characters**
- At least **1 uppercase** letter
- At least **1 lowercase** letter

---

## 🌐 Deployment

### Client → Vercel

1. Push `client/` to GitHub
2. Import project in [vercel.com](https://doc-appoint-vert.vercel.app/)
3. Set environment variables in Vercel dashboard
4. Deploy — Vercel handles SPA routing automatically

### Server → Render

1. Push `server/` to GitHub
2. Create a new **Web Service** on [render.com](https://doc-appoint-server-self.vercel.app/)
3. Set environment variables in Render dashboard
4. Build command: `npm install`
5. Start command: `node index.js`

> **Note:** Add all routes to the Vercel `vercel.json` to prevent 404 on reload:
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
> ```

---

## 🧩 Pages Overview

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| All Appointments | `/appointments` | Public |
| Doctor Details | `/appointments/:id` | 🔒 Login required |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Dashboard | `/dashboard` | 🔒 Private |
| My Bookings | `/dashboard/bookings` | 🔒 Private |
| My Profile | `/dashboard/profile` | 🔒 Private |
| 404 Not Found | `*` | Public |

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/anikh174)
- Email: hossainanik174@.com

---

<p align="center">Made with ❤️ for better healthcare access in Bangladesh</p>