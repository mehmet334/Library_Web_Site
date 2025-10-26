import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Categories from "./pages/Categories";
import Publishers from "./pages/Publishers";
import BookLoan from "./pages/BookLoan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },                 // Ana sayfa kitaplar
      { path: "/books", element: <Books /> },
      { path: "/authors", element: <Authors /> },
      { path: "/categories", element: <Categories /> },
      { path: "/publishers", element: <Publishers /> },
      { path: "/book-loans", element: <BookLoan /> },
    ],
  },
]);

export default router;
