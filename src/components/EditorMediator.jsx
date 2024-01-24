import React, { useState, useContext } from "react";

export const EditorMediatorContext = React.createContext(null);

export const useEditorMediator = () => useContext(EditorMediatorContext);

export const EditorMediatorProvider = ({ children }) => {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);

  function toggleCategoryModal() {
    setAddCategoryModalOpen((prev) => !prev);
  }

  function togglePostModal() {
    setAddPostModalOpen((prev) => !prev);
  }

  let actionButtonActions = {
    NEW_CATEGORY: toggleCategoryModal,
    NEW_POST: togglePostModal,
  };

  return (
    <EditorMediatorContext.Provider
      value={{
        addCategoryModalOpen,
        toggleCategoryModal,
        actionButtonActions,
        addPostModalOpen,
        togglePostModal,
      }}
    >
      {children}
    </EditorMediatorContext.Provider>
  );
};
