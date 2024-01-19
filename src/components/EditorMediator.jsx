import React, { useState, useContext } from "react";

export const EditorMediatorContext = React.createContext(null);

export const useEditorMediator = () => useContext(EditorMediatorContext);

export const EditorMediatorProvider = ({ children }) => {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  function toggleCategoryModal() {
    setAddCategoryModalOpen((prev) => !prev);
  }

  return (
    <EditorMediatorContext.Provider
      value={{
        addCategoryModalOpen,
        toggleCategoryModal,
      }}
    >
      {children}
    </EditorMediatorContext.Provider>
  );
};
