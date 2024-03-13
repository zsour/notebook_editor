import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EditorMediatorProvider } from "./components/EditorMediator";
import "./style.css";

import AddCategory from "./components/AddCategory";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/addCategory",
    element: <AddCategory />,
  },

  {
    path: "/addPost",
    element: <div>add post</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
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
    </EditorMediatorProvider>
  </React.StrictMode>,
);
