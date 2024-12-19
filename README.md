# Installation Steps

This guide explains how to set up the project locally, including the backend using **Laravel 11** and the frontend using **Next.js**.

---

## **Prerequisites**
Ensure the following are installed on your machine:

- **PHP 8.2** or higher
- **Composer**
- **Node.js 18** or higher
- **NPM** or **Yarn**
- **MySQL** (or another supported database)
- **Git**

---

## **1. Clone the Repository**
Clone the repository and navigate into the project folder:

```bash
git clone https://github.com/virgiawanly/digyta-test.git
cd digyta-test
```

---

## **2. Backend Setup (Laravel)**

Navigate to the backend folder and follow these steps:

1. **Go to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Copy the `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure the database in `.env`:**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=<DATABASE_NAME>
   DB_USERNAME=<USERNAME>
   DB_PASSWORD=<PASSWORD>
   ```

5. **Generate the application key:**
   ```bash
   php artisan key:generate
   ```

6. **Run database migrations:**
   ```bash
   php artisan migrate
   ```

7. **Start the Laravel development server:**
   ```bash
   php artisan serve
   ```
   The backend will be available at `http://127.0.0.1:8000`.

---

## **3. Frontend Setup (Next.js)**

Navigate to the frontend folder and follow these steps:

1. **Go to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(or use `yarn install` if using Yarn)*

3. **Copy the `.env.local` file:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure the backend URL in `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   ```

5. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```
   *(or use `yarn dev` if using Yarn)*

   The frontend will be available at `http://localhost:3000`.

---

## **4. Testing the Application**

- **Backend**: Test the Laravel backend at `http://127.0.0.1:8000`.
- **Frontend**: Access the Next.js frontend at `http://localhost:3000`.

---

## **5. Troubleshooting**

### Laravel:
If you encounter issues, try the following commands:
```bash
php artisan config:cache
php artisan route:cache
php artisan optimize
```

### Next.js:
If you encounter errors, clear the cache and reinstall dependencies:
```bash
npm cache clean --force
npm install
```

---

This guide ensures that both the backend and frontend are set up and running locally for development.
