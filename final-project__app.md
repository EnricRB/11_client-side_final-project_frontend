# 📚 BookTracker – Book Management App

Web application to manage a personal book collection, tracking their reading status and allowing editing or deletion.

## 🚀 Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [json-server](https://github.com/typicode/json-server)
- [Netlify](https://www.netlify.com/)
- GitHub Actions & Husky

## 🧩 App Features

### `Book` Entity

```ts
type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  status: "pending" | "in progress" | "read";
};
```

### Functionalities

- ✅ List books in cards
- ➕ Add new books
- ✏️ Edit existing books
- ❌ Delete books
- 🌐 API communication (`GET`, `POST`, `PUT`, `DELETE`)

## 🎨 Styles

- Styles are implemented using **CSS Modules** for scoped and maintainable styling.
- The layout follows a **mobile-first** design approach to ensure responsiveness across devices.

## 🌍 Environment Variables

The app should work with different environments (`.env`):

```
VITE_API_URL=http://localhost:3000 // local
// or
VITE_API_URL=https://your-production-api.netlify.app // production
```

## 📦 Available Scripts

| Script  | Command           | Description                   |
| ------- | ----------------- | ----------------------------- |
| Start   | `npm run dev`     | Starts the development server |
| Format  | `npm run format`  | Runs Prettier                 |
| Tests   | `npm run test`    | Runs tests with Vitest        |
| Build   | `npm run build`   | Generates production build    |
| Preview | `npm run preview` | Previews the local build      |

## 🧪 Testing

- Basic interaction and rendering tests
- At least **2 tests** for essential components (form, card, list, etc.)
- Proper use of `@testing-library/react` and `vitest` will be evaluated

## 🔄 CI/CD

- ✅ Husky configured with:
  - `pre-commit`: format
  - `pre-push`: tests
- ✅ GitHub Actions:
  - Workflow for format and tests
- ✅ Deployment to Netlify
