# TanStack React Query Tutorial

A learning project for **TanStack Query (React Query)** with a React frontend and a mock API powered by **json-server**.

---

## Tech Stack

### Frontend (`app/`)
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Build tool and dev server |
| **TanStack React Query** | Data fetching, caching, and server-state management |
| **TanStack React Query Devtools** | Inspect queries during development |
| **Axios** | HTTP requests |
| **React Router DOM** | Client-side routing |
| **Bootstrap / React Bootstrap** | UI styling |

### Backend (`api/`)
| Technology | Purpose |
|------------|---------|
| **json-server** | Mock REST API from a JSON file — no real server code required |

> **Note:** The backend is **not** Express or Nest. It uses **json-server** only. It reads `db.json` and exposes endpoints such as `/posts` on port `3009`.

---

## Project Structure

```
TanStack/
├── api/                 # Backend (json-server)
│   ├── db.json          # Mock database
│   └── package.json
├── app/                 # React frontend
│   ├── src/
│   └── package.json
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm (comes with Node.js)

---

## How to Run

Run the **backend** and **frontend** in two separate terminals.

### 1) Start the Backend (json-server)

```bash
cd api
npm install
npm start
```

What this does:

- Runs: `npx json-server -p 3009 --watch db.json`
- Starts **json-server** on port **3009**
- Watches `db.json` and reloads data on file changes (`--watch`)

Once running, the API is available at:

```
http://localhost:3009
```

Example endpoints:

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `http://localhost:3009/posts` | Get all posts |
| `GET` | `http://localhost:3009/posts?status=publish` | Filter by status |
| `GET` | `http://localhost:3009/posts/1` | Get a single post |
| `POST` | `http://localhost:3009/posts` | Create a post |
| `PUT` / `PATCH` | `http://localhost:3009/posts/:id` | Update a post |
| `DELETE` | `http://localhost:3009/posts/:id` | Delete a post |

### 2) Start the Frontend

In a new terminal:

```bash
cd app
npm install
npm start
```

Vite usually serves the app at:

```
http://localhost:5173
```

---

## Recommended Startup Order

1. Start the backend first (`api` → `npm start`) and confirm port `3009` is running.
2. Then start the frontend (`app` → `npm start`).
3. Open the Vite URL in your browser.

If you start the frontend without the backend, React Query requests will fail because the app calls:

```
http://localhost:3009/posts
```

---

## Quick Commands

| Folder | Command | Description |
|--------|---------|-------------|
| `api` | `npm install` | Install json-server |
| `api` | `npm start` | Run json-server on port 3009 |
| `app` | `npm install` | Install frontend dependencies |
| `app` | `npm start` | Start Vite dev server |
| `app` | `npm run build` | Build for production |
| `app` | `npm run preview` | Preview the production build |

---

## What This Project Does

- Lists posts from the API
- Filters posts by status (`publish` / `draft` / ...)
- Searches posts
- Uses React Query for fetching, `staleTime`, and caching
- Includes React Query Devtools to inspect query state
