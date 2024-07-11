import { React, createContext, useState, useContext } from "react";
import axios from "axios";

const MessageContext = createContext();
export default MessageContext;

export const MessageProvider = ({ children }) => {
    const [navigationMessages, setnavigationMessages] = useState('');

    let contextData ={
        navigationMessages: navigationMessages,
        setnavigationMessages: setnavigationMessages
    }
    return (
        <MessageContext.Provider value={contextData}>
          {children}
        </MessageContext.Provider>
      );

}
