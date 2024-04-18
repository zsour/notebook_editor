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
      try {
        let result = await fetch("http://localhost:3001/category", {
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
              message = "Failed to parse error.";
            });

          reject(message);
        }

        resolve("Category created.");
      } catch (err) {
        reject("Failed to create category.");
      }
    });
  }

  function addPost(title, parent, codeblocks) {
    return new Promise(async (resolve, reject) => {
      try {
        codeblocks = JSON.stringify(codeblocks);
        let result = await fetch("http://localhost:3001/post", {
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

        if (result.status === 400) {
          let message = "";
          await result
            .json()
            .then((data) => {
              message = data.message;
            })
            .catch(() => {
              message = "Failed to parse error.";
            });

          reject(message);
        }

        resolve("Post created.");
      } catch (err) {
        reject("Failed to create post.");
      }
    });
  }

  function getCategories() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await fetch("http://localhost:3001/category", {
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
      } catch (err) {
        reject("Failed to fetch categories.");
      }
    });
  }

  function getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await fetch("http://localhost:3001/post", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (result.status === 400) {
          reject("Can't fetch posts.");
        }

        result
          .json()
          .then((data) => {
            resolve(data);
          })
          .catch((_) => {
            reject("Can't parse posts.");
          });
      } catch (err) {
        reject("Failed to fetch posts.");
      }
    });
  }

  return (
    <EditorMediatorContext.Provider
      value={{
        addCategory,
        addPost,
        getCategories,
        getPosts,
      }}
    >
      {children}
    </EditorMediatorContext.Provider>
  );
};
