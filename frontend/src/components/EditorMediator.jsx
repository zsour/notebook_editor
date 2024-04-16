import React, { useState, useContext, useEffect } from "react";
export const EditorMediatorContext = React.createContext(null);

export const useEditorMediator = () => useContext(EditorMediatorContext);

export const EditorMediatorProvider = ({ children }) => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    // read data

    setPosts({});
  }, []);

  async function addCategory(name, parent) {
    return new Promise(async (resolve, reject) => {
      let result = await fetch("http://localhost:3001/addCategory", {
        method: "POST",
        body: JSON.stringify({
          name,
          parent,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (result.status === 400) {
        let message = "";
        await result
          .json()
          .then((data) => {
            message = data.message;
          })
          .catch(() => {
            message = "Something went wrong.";
          });

        reject(message);
      }

      resolve("Category created.");
    });
  }

  function addPost(title, parent, codeblocks) {
    return new Promise(async (resolve, reject) => {
      codeblocks = JSON.stringify(codeblocks);
      let result = await fetch("http://localhost:3001/post/add", {
        method: "POST",
        body: JSON.stringify({
          title,
          parent,
          codeblocks,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (result.status == 400) {
        let message = "";
        await result
          .json()
          .then((data) => {
            message = data.message;
          })
          .catch(() => {
            message = "Something went wrong.";
          });

        reject(message);
      }

      resolve("Post created.");
    });
  }

  function getCategories() {
    return new Promise(async (resolve, reject) => {
      let result = await fetch("http://localhost:3001/category/fetch", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (result.status === 400) {
        reject("Can't fetch categories.");
      }

      result
        .json()
        .then((data) => {
          resolve(data);
        })
        .catch((_) => {
          reject("Can't parse categories.");
        });
    });
  }

  return (
    <EditorMediatorContext.Provider
      value={{
        addCategory,
        addPost,
        getCategories,
      }}
    >
      {children}
    </EditorMediatorContext.Provider>
  );
};
