import React, { useState, useContext } from "react";

export const EditorMediatorContext = React.createContext(null);

export const useEditorMediator = () => useContext(EditorMediatorContext);

export const EditorMediatorProvider = ({ children }) => {
  return (
    <EditorMediatorContext.Provider value={{}}>
      {children}
    </EditorMediatorContext.Provider>
  );
};
