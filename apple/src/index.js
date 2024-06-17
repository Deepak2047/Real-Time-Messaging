import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChatC from "./Context/ChatC";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<BrowserRouter>
  // <Chat_C>
  //     <ChakraProvider>
  //       <App />
  //     </ChakraProvider>
  // </Chat_C>
  // </BrowserRouter>
  <ChakraProvider>
    <BrowserRouter>
      <ChatC>
        <App />
      </ChatC>
    </BrowserRouter>
  </ChakraProvider>
);
