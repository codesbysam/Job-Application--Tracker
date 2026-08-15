# Job Application Tracker — MERN Edition

This is your original React job tracker, now turned into a **full MERN app**:

- **M**ongoDB — stores users and job applications
- **E**xpress — the backend web server (in `/server`)
- **R**eact — your existing frontend (in `/client`)
- **N**ode — runs the Express server

## How it's different from before

The original app used `localStorage` to fake "saving" data — it only lived in
your browser and wasn't shared across devices or really "real". Now:

- Signup/Login actually create a user in a database and check a real password
- Job applications are saved to MongoDB per logged-in user
- The frontend talks to the backend over an API (`http://localhost:5000/api/...`)
- A login token (JWT) is used to prove who you are on each request

## Folder structure

```
mern-tracker/
├── client/     <- your React app (unchanged UI, just calls the API now)
└── server/     <- new Express + MongoDB backend
```

## Step 1 — Get a free MongoDB database

You don't need to install MongoDB yourself. Use MongoDB Atlas (free tier):

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account
2. Create a free "M0" cluster (any region is fine)
3. Under **Database Access**, create a database user with a username/password
4. Under **Network Access**, click "Add IP Address" → "Allow access from anywhere" (fine for learning)
5. Click **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
6. Add a database name to the end, e.g. `.../jobtracker?retryWrites=true...`

## Step 2 — Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and paste in your MongoDB connection string as `MONGO_URI`,
and set `JWT_SECRET` to any random long string (mash your keyboard).

Run the server:

```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

Leave this terminal running.

## Step 3 — Set up the frontend

Open a **second terminal**:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173 in your browser. Sign up for an account, log in,
and add some job applications — they're now saved in your real database!

## How the pieces talk to each other

```
React (client, port 5173)
   |
   |  fetch("http://localhost:5000/api/...")
   v
Express (server, port 5000)
   |
   |  Mongoose
   v
MongoDB Atlas (in the cloud)
```

- `client/src/api.js` — every API call the frontend makes goes through this one file
- `server/routes/authRoutes.js` — handles signup & login, returns a JWT token
- `server/routes/jobRoutes.js` — handles create/read/update/delete for jobs
- `server/middleware/auth.js` — checks the JWT token on protected routes
- `server/models/` — describes what a "User" and a "Job" look like in MongoDB

## What to learn over your next 2 days (in order)

1. **What Express is** — a Node.js library for building APIs. Look at `server.js`
   and `routes/authRoutes.js` — see how `router.post("/signup", ...)` maps a URL
   + HTTP method to a function.
2. **What MongoDB/Mongoose is** — MongoDB stores JSON-like documents.
   Mongoose (`models/User.js`, `models/Job.js`) is a library that lets you define
   the shape of those documents and query them with normal JS functions.
3. **JWT auth** — `authRoutes.js` creates a token on login; `middleware/auth.js`
   checks it on every protected request. This is the standard way apps "remember"
   who's logged in without storing sessions on the server.
4. **Connecting frontend to backend** — read `client/src/api.js` top to bottom.
   It's just `fetch()` calls with a token attached. Every page (`Login.jsx`,
   `Applications.jsx`, etc.) imports functions from this file instead of touching
   `localStorage` directly.

A good order to actually watch/read tutorials in: freeCodeCamp's "MERN Stack
Course" or "Node.js and Express.js Course" on YouTube gives you Express +
MongoDB basics in a few hours, then come back and re-read this codebase — it
will click much faster once you've seen the concepts once.

## Notes / things kept intentionally simple

- No password reset, email verification, or refresh tokens — just enough auth to work
- No input sanitization/validation library — just basic required-field checks
- CORS is wide open (`app.use(cors())`) — fine for local dev, you'd lock this down for production
- Profile/Settings/Jobsearch pages are still mostly frontend-only/cosmetic, same as the original repo

Once you're comfortable, good next steps: add "edit profile" saving to the
backend, add pagination to the jobs list, or deploy the backend on Render and
the frontend on Vercel/Netlify.
