# JobTrack

A focused, full-stack application for tracking job opportunities from the first save through a final outcome.

JobTrack keeps the core job-search workflow in one place: record an opportunity, update its status, search the pipeline, and review progress from a compact dashboard. The project is intentionally single-user and dependency-light so the codebase stays easy to understand, run, and extend.

## What it does

- Tracks saved, applied, interview, offer, and rejected opportunities
- Creates, reads, updates, and deletes job records through typed API routes
- Searches jobs by company or role and filters them by status
- Summarizes total jobs and key pipeline stages on the dashboard
- Stores optional location, salary, employment type, application date, and notes
- Validates required company and role fields in both the form and API
- Handles empty results, missing records, loading states, and request failures
- Adapts the dashboard, filters, cards, and forms for mobile screens

## Technical highlights

- Next.js App Router with server-rendered data views
- Client components limited to forms, filtering, and delete interactions
- Prisma schema with enums, timestamps, and indexes for common queries
- Reused Prisma Client instance during development hot reloads
- Shared TypeScript types and validation utilities across UI and API layers
- REST-style route handlers with consistent JSON errors and HTTP status codes
- Reusable UI primitives built with Tailwind CSS and no component library
- Strict ESLint configuration with warnings treated as failures

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| Language | TypeScript 5 |
| Interface | React 19, Tailwind CSS 4 |
| Database | SQLite |
| Data access | Prisma ORM 6 |
| Code quality | ESLint, Next.js Core Web Vitals rules |

## Screenshots

### Dashboard

![JobTrack dashboard](public/screenshots/dashboard.png)

### Jobs list

![JobTrack jobs list](public/screenshots/jobs-list.png)

### Add a job

![JobTrack add-job form](public/screenshots/add-job.png)

### Edit a job

![JobTrack edit-job form](public/screenshots/edit-job.png)

## Project structure

```text
job-tracker-app/
|-- prisma/
|   |-- migrations/              # Versioned database changes
|   `-- schema.prisma            # Job model and enums
|-- src/
|   |-- app/
|   |   |-- api/jobs/
|   |   |   |-- [id]/route.ts    # Read, update, and delete one job
|   |   |   `-- route.ts         # List and create jobs
|   |   |-- jobs/
|   |   |   |-- [id]/edit/       # Edit page
|   |   |   |-- new/             # Create page
|   |   |   `-- page.tsx         # Searchable job pipeline
|   |   `-- page.tsx             # Dashboard
|   |-- components/
|   |   |-- jobs/                # Job-specific interface components
|   |   |-- layout/              # Navigation and page container
|   |   `-- ui/                  # Button, input, select, and badge
|   |-- lib/                     # Prisma client and job utilities
|   `-- types/                   # Shared application types
|-- .env.example
`-- package.json
```

## Run locally

### Prerequisites

- Node.js 20.9 or newer
- npm 10 or newer

### Setup

```bash
git clone <your-repository-url>
cd job-tracker-app
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

On Windows PowerShell, replace the copy command with:

```powershell
Copy-Item .env.example .env
```

Open [http://localhost:3000](http://localhost:3000).

## Windows setup note

Node.js is required before any project command will work. Install the current Node.js LTS release, restart PowerShell, and confirm both commands are available:

```powershell
node -v
npm -v
```

Then install dependencies and start the application:

```powershell
npm install
Copy-Item .env.example .env
npm run db:migrate
npm run dev
```

If PowerShell reports that `node` or `npm` is not recognized, install Node.js LTS and restart PowerShell so the updated system `PATH` is loaded.

## Environment variables

| Variable | Required | Local value | Purpose |
| --- | --- | --- | --- |
| `DATABASE_URL` | Yes | `file:./dev.db` | SQLite connection used by Prisma |

The relative database path resolves from `prisma/schema.prisma`. The local database file is ignored by Git; migrations are committed.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint with zero warnings allowed |
| `npm run db:migrate` | Create or apply a development migration |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:studio` | Inspect local records in Prisma Studio |

## API routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/jobs` | List jobs; supports optional `query` and `status` parameters |
| `POST` | `/api/jobs` | Create a job |
| `GET` | `/api/jobs/:id` | Get one job |
| `PATCH` / `PUT` | `/api/jobs/:id` | Update one job |
| `DELETE` | `/api/jobs/:id` | Delete one job |

## Deployment notes

The included SQLite configuration is intended for local development. Many serverless hosts use ephemeral filesystems, so `prisma/dev.db` should not be used as a production database.

For deployment, configure Prisma with a persistent relational database supported by the chosen host, set `DATABASE_URL` in the hosting environment, apply migrations during the release process, and run `npm run build`. Authentication is deliberately outside the scope of this version.

## Scope and limitations

- Version 1 is intentionally single-user and does not include authentication.
- SQLite is configured for local development rather than multi-user deployment.
- Search and status filtering run against the records already loaded by the jobs page.
- Automated tests are not included yet; linting, TypeScript checks, and the production build are the current verification steps.

## Future improvements

- Add automated tests for validation and route handlers
- Add pagination for larger job lists
- Add CSV import and export
- Add a PostgreSQL configuration for hosted environments
