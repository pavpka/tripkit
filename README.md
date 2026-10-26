# TripKit

Планировщик путешествий: список поездок, маршрут по дням, бюджет и чек-лист вещей.

## Стек

- **Frontend** — React 19 + TypeScript, Vite, React Router, TanStack Query, SCSS-модули (архитектура FSD)
- **Backend** — Node.js + Express 5 на TypeScript, Drizzle ORM, Zod
- **БД** — PostgreSQL


| Сервис     | Адрес                                            |
| ---------- | ------------------------------------------------ |
| Frontend   | localhost:5173 (`/api` проксируется на бэк) |
| Backend    | localhost:3000                            |
| PostgreSQL | localhost:5432            |

---

> **Проект в разработке.** Часть данных (например, расходы) пока берётся из моков в `frontend/src/mocks/data.ts`, а не из API.
> 
> Скрипт создания таблиц в БД - create_tables.sql
