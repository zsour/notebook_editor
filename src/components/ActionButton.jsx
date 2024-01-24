import React from "react";
import { useEditorMediator } from "./EditorMediator";

function ActionButton(props) {
  const em = useEditorMediator();

  return (
    <span
      className="button"
      onClick={() => {
        em.actionButtonActions[props.action]();
      }}
    >
      <span className="buttonTitleContainer">
        <p className="buttonTitle">{props.label}</p>
      </span>

      <span className="buttonIcon"></span>
    </span>
  );
}

export default ActionButton;
