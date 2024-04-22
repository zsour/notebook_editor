import React, { useState, useContext, useEffect } from "react";
export const EditorMediatorContext = React.createContext(null);

export const useEditorMediator = () => useContext(EditorMediatorContext);

export const EditorMediatorProvider = ({ children }) => {
  function addCategory(name, parent) {
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

  function getCategoryById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await fetch(`http://localhost:3001/category?id=${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (result.status === 400) {
          reject("Can't fetch category.");
        }

        result
          .json()
          .then((data) => {
            resolve(data);
          })
          .catch((_) => {
            reject("Can't parse category.");
          });
      } catch (err) {
        reject("Failed to fetch category.");
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

  function getPostById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await fetch(`http://localhost:3001/post?id=${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (result.status === 400) {
          reject("Can't fetch post.");
        }

        result
          .json()
          .then((data) => {
            resolve(data);
          })
          .catch((_) => {
            reject("Can't parse post.");
          });
      } catch (err) {
        reject("Failed to fetch post.");
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

  function editCategory(id, name, parent) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await fetch("http://localhost:3001/category", {
          method: "PUT",
          body: JSON.stringify({
            id,
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
              console.log(data);
              message = data.message;
            })
            .catch(() => {
              message = "Failed to parse error.";
            });

          reject(message);
        }

        resolve("Category edited.");
      } catch (err) {
        reject("Failed to edit category.");
      }
    });
  }

  function editPost(id, title, parent, codeblocks) {
    return new Promise(async (resolve, reject) => {
      try {
        codeblocks = JSON.stringify(codeblocks);
        let result = await fetch("http://localhost:3001/post", {
          method: "PUT",
          body: JSON.stringify({
            id,
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

        resolve("Post edited.");
      } catch (err) {
        reject("Failed to edit post.");
      }
    });
  }

  function deleteCategory(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await fetch(`http://localhost:3001/category?id=${id}`, {
          method: "DELETE",
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

        resolve("Category deleted.");
      } catch (err) {
        reject("Failed to delete category.");
      }
    });
  }

  function deletePost(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await fetch(`http://localhost:3001/post?id=${id}`, {
          method: "DELETE",
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

        resolve("Post deleted.");
      } catch (err) {
        reject("Failed to delete post.");
      }
    });
  }

  function exportToFile() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await fetch(`http://localhost:3001/export`, {
          method: "GET",
        });

        if (result.status === 400) {
          let message = "";
          await result
            .json()
            .then((data) => {
              message = data.message;
            })
            .catch(() => {
              message = "Failed to export data.";
            });

          reject(message);
        } else {
          result
            .json()
            .then((data) => {
              const url = window.URL.createObjectURL(
                new Blob([JSON.stringify(data)]),
              );
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "data.json");
              document.body.appendChild(link);
              link.click();
              link.remove();
            })
            .catch(() => {
              throw "Could not parse data to JSON.";
            });
        }

        resolve("Data exported.");
      } catch (err) {
        reject("Failed to export data.");
      }
    });
  }

  return (
    <EditorMediatorContext.Provider
      value={{
        addCategory,
        addPost,
        getCategoryById,
        getCategories,
        getPostById,
        getPosts,
        editCategory,
        editPost,
        deleteCategory,
        deletePost,
        exportToFile,
      }}
    >
      {children}
    </EditorMediatorContext.Provider>
  );
};
