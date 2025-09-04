import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EditorMediatorProvider } from "./components/EditorMediator";
import "./style.css";

import AddCategory from "./components/AddCategory";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import EditCategory from "./components/EditCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/addCategory",
    element: <AddCategory />,
  },

  {
    path: "/addPost",
    element: <AddPost />,
  },

  {
    path: "/editPost/:id",
    element: <EditPost />,
  },

  {
    path: "/editCategory/:id",
    element: <EditCategory />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <EditorMediatorProvider>
    <div className="content">
      <div className="mainContainer">
        <div className="buttonContainer">
          <a className="navButton" href="/">
            <p>Home</p>
          </a>

          <a className="navButton" href="/addCategory">
            <p>Add Category</p>
          </a>

          <a className="navButton" href="/addPost">
            <p>Add Post</p>
          </a>
        </div>
        <RouterProvider router={router} />
      </div>
    </div>
  </EditorMediatorProvider>,
);
