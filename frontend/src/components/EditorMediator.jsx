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
    return new Promise((resolve, reject) => {
      if (name in posts) {
        reject("Category already exists.");
      } else {
        setPosts((prev) => {
          let tmp = parent;
          if (tmp === "-1") {
            tmp = undefined;
          }
          prev[name] = { parent: tmp, posts: [] };
          return { ...prev };
        });

        // TODO: save file

        resolve();
      }
    });
  }

  return (
    <EditorMediatorContext.Provider
      value={{
        addCategory,
      }}
    >
      {children}
    </EditorMediatorContext.Provider>
  );
};
