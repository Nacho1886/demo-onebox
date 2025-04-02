# Event Seat Reservation System

## Overview

A web application for managing event seat reservations. Users can browse events, select seats for different sessions, and manage their selections in a shopping cart.

## Technologies Used

- **Angular 19**: Utilizes signals for reactivity and avoids Zone.js, enhancing performance.
- **RxJS**: Used for handling asynchronous operations and reactive programming.
- **Tailwind CSS**: For efficient, utility-first styling.
- **HttpClient**: Fake HTTP requests are handled through an **interceptor** to simulate API calls and manage event data dynamically.

## Design Patterns & Architecture

- **Repository Pattern**: Ensures data management is abstracted and isolated from the rest of the application, making it easier to swap out data sources or integrate with real backend systems.
- **Hexagonal Architecture**: Modular and scalable design that separates concerns between core application logic, user interfaces, and external services, ensuring flexibility and maintainability.

## Data Persistence

The application uses a **local state management strategy** to persist session data within the app, leveraging Angular **signals** and the **repository pattern** for maintaining a consistent and scalable state.

## How to Run

### Optional: Using NVM

To ensure the correct Node.js version, an `.nvmrc` file is included. If you have `nvm` installed, you can automatically switch to the required version.
If nvm is not installed, you can install it with:

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

After installation, restart your terminal and run:

```bash
nvm install
```

and

```bash
nvm use
```

### Steps

1. Install dependencies:

```bash
npm install
```

2. Serve the application:

```bash
npm run start
```

3. Open your browser and go to:
   http://localhost:4200
