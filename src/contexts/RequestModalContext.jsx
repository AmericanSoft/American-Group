import React, { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import RequestServiceModal from "./RequestServiceModal";
// في التطوير استخدم بروكسي Vite على /gas
// في الإنتاج استخدم متغير البيئة VITE_GAS_ENDPOINT
const endpoint = import.meta.env.DEV ? '/gas' : import.meta.env.VITE_GAS_ENDPOINT;

const Ctx = createContext();
export const useRequestModal = () => useContext(Ctx);

export default function RequestModalProvider({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prefill, setPrefill] = useState({});

  const open = (data = {}) => { setPrefill(data); onOpen(); };

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <RequestServiceModal isOpen={isOpen} onClose={onClose} prefill={prefill} />
    </Ctx.Provider>
  );
}
