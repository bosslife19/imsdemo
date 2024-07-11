import React from "react";
import "./Comfirmation.css";


function ComfirmationPop({icon, message, ComfirmationContainerStyle}) {
  return (
    <div className={`ComfirmationContainer ${ComfirmationContainerStyle}`}>
      <div className="ComfirmationContentWrapper">
        <p className="ComfirmationMessage">{message}</p>
      </div>
    </div>
  );
}

export default ComfirmationPop;
