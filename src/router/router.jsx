import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "../pages/layouts/Layout.jsx";
import Create from "../pages/Create.jsx";
import Search from "../pages/Search.jsx";
import BookDetail from "../pages/BookDetail.jsx";
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "",
            element: <Home />
        },
        {
            path: "/books/:id",
            element: <BookDetail />
        },
        {
            path: "/create",
            element: <Create />
        },
        {
            path: "/edit/:id",
            element: <Create />
        },
        {
            path: "/search",
            element: <Search />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        }
    ]
  },
]);

export default router;
