# ✨ Final Project: Client Development

## 🎯 Objective

Develop a client application using React (Vite) that interacts with a RESTful API (json-server). The project tests the knowledge and skills acquired throughout the course: React, Git, testing, environment variables, deployment with Netlify, and CI/CD.

## 🔧 Technical Requirements

### 🔁 Version Control

- Create a GitHub repository with the exact name: `11_client-side_final-project_frontend`
- Use branches correctly to develop features
- Make frequent commits with clear and meaningful messages

### ⚙️ Project Setup

- Use **Vite + React** to create the project
- Properly configure the `scripts` in `package.json` (`dev`, `build`, `preview`, `test`, etc.)
- Separate **production dependencies** from **development dependencies**
- Apply consistent code formatting (prettier, eslint)

### 📦 Dependencies

- **Adding external dependencies is prohibited** except those already available (React, Vitest, Testing Library)
- The use of Tailwind, Bootstrap, axios, react-hook-form, zustand, etc., is not allowed

## 🧩 The Application

### Theme: **“Book Management”**

The application should allow managing a collection of read books. For each book, the following should be recorded:

- Title
- Author
- Year of publication
- Reading status (read / in progress / pending)

### Minimum Features

- Display the list of books in **card format**
- Each card must include:

  - Book information
  - Buttons to **edit** and **delete**

- Form to add a new book
- Edit form that loads the selected book's data
- Communication with the API via fetch:

  - `GET` to retrieve the list of books
  - `POST` to add a book
  - `PUT` to edit a book
  - `DELETE` to delete a book

### Backend

- Use the provided json-server
- The backend URL must be managed via `.env` to distinguish between local and production (`VITE_API_URL`)

## ✅ Code Quality

- Use clear and reusable components
- Avoid duplicate code
- Only use local state (`useState`, `useEffect`)
- Write readable, well-structured code with comments where necessary

## 🧪 Testing

- At least **2 tests** for essential components (form, card, list, etc.)
- Must cover **minimum interactions**: add, edit, delete
- Proper use of `@testing-library/react` and `vitest` will be evaluated

## 🔐 Environment Variables

- Create a `.env` file with the variable `VITE_API_URL`
- Properly manage the environment depending on whether it’s local or production

## 🚀 CI/CD

- Use the **Husky hooks** (already provided):

  - `pre-commit`: format check
  - `pre-push`: test execution

- Activate two **GitHub Actions** (already provided):

  - Lint and format
  - Test execution

- Deploy the app to **Netlify**, and include the URL in the `README.md`

## 📝 Submission

- Publish the repository on GitHub (`public`)
- On the `main` branch, include a `README.md` with:

  - Full name
  - Production URL (Netlify)
  - Instructions to run it locally
