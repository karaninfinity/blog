import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@/layouts";
import Categories from "@/pages/categories/Categories";
import CategoryForm from "@/pages/categories/CategoryForm";
import Subcategories from "@/pages/subcategories/Subcategories";
import SubcategoryForm from "@/pages/subcategories/SubcategoryForm";
import Blogs from "@/pages/blogs/Blogs";
import BlogForm from "@/pages/blogs/BlogForm";
import Frontend from "@/layouts/Frontend";
import BlogList from "@/pages/blogs/BlogList";
import Blog from "@/pages/blogs/Blog";

const routes = createBrowserRouter([
  {
    path : "/",
    element : <SignIn />
  },
  {
    path : "/auth/sign-in",
    element : <SignIn />
  },
  {
    path : "/auth/sign-up",
    element : <SignUp />,
  },
  {
    path : "/dashboard",
    element : <Dashboard/>, 
    children : [
      {
        path : "",
        element : <Navigate to="/dashboard/home" replace/>
      },
      {
        path : "home",
        element : <Home/>
      },
      {
        path : "profile",
        element : <Profile/>,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/add",
        element: <CategoryForm />
      },
      {
        path: "categories/:id",
        element: <CategoryForm />
      },
      {
        path: "blogs",
        element: <Blogs/>
      },
      {
        path: "blogs/add",
        element: <BlogForm/>
      },
      {
        path: "blogs/:id",
        element: <BlogForm/>
      },
      {
        path: "subcategories",
        element: <Subcategories/>
      },
      {
        path: "subcategories/add",
        element: <SubcategoryForm />
      },
      {
        path: "subcategories/:id",
        element: <SubcategoryForm />
      },
    ]
  },
  {
    path:"/home/",
    element:<Frontend/>,
    children: [
      {
        path: "",
        element: <BlogList/>
      },
      {
        path: "blogs/:id",
        element: <Blog/>
      }
    ]
  }
])

export default routes;
