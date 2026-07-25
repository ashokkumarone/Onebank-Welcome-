# OneBank — Enterprise Banking Operations Portal

An internal operations dashboard concept for bank employees, designed to unify the day-to-day tools a branch team relies on — account onboarding, deposits, loans, customer service, and performance analytics — into a single, consistent workspace.

## Why I built this

During my time as a Personal Banker at DBS Bank, I regularly worked across account opening, KYC verification, deposit processing, and customer follow-ups — often across disconnected tools and screens. OneBank is a product concept for what that experience could look like if it were designed as one coherent internal platform, built around the actual workflows a branch employee handles every day.

## Modules

- **Accounts** — new account applications with e-KYC document tracking (Aadhaar, PAN, photo verification) across account types (Savings, Current, Salary, Senior Citizen, Student, NRI, Joint)
- **Deposits** — Fixed and Recurring Deposit creation, with interest rate, tenure, and maturity calculations
- **Loan Management** — loan applications, EMI schedules, and tracking through approval stages
- **Customer Service Hub** — service requests and follow-up tracking, so customer issues don't fall through the cracks
- **Operations Analytics** — visual reporting on day-to-day operational activity
- **Branch Performance** — performance insights and trends at the branch level
- **Employee Profile & Task Management** — a personal task queue that auto-updates as work is completed (e.g. opening an account logs a completed task automatically)

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS
- Recharts (analytics & performance charts)
- Vite

## Status

This is a front-end concept/prototype built to demonstrate product thinking and UX design for internal banking tools — it runs entirely on mock data with no backend or real customer data involved.

## Live Demo

[https://ashokkumarone.github.io/OneBank/](https://ashokkumarone.github.io/OneBank/)
