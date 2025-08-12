import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import RequestModalProvider from "./contexts/RequestModalContext";
import App from "./App/App.jsx";
import "./index.css";
import "./i18n.js";
// اختياري: عرّف ثيم بسيط أو احذف prop لو مش محتاجه
const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: `'Cairo', sans-serif`,
    body: `'Cairo', sans-serif`,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <RequestModalProvider>
          <App />
        </RequestModalProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
