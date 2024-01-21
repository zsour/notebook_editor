import React, { useState, useContext } from "react";

export const EditorMediatorContext = React.createContext(null);

export const useEditorMediator = () => useContext(EditorMediatorContext);

export const EditorMediatorProvider = ({ children }) => {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  function toggleCategoryModal() {
    setAddCategoryModalOpen((prev) => !prev);
  }

  let actionButtonActions = {
    "NEW_CATEGORY": toggleCategoryModal,
  }

  return (
    <EditorMediatorContext.Provider
      value={{
        addCategoryModalOpen,
        toggleCategoryModal,
        actionButtonActions
      }}
    >
      {children}
    </EditorMediatorContext.Provider>
  );
};
