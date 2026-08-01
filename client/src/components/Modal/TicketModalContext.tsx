import { createContext, useContext, useState } from 'react';

interface TicketModalContext {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const TicketModalContext = createContext<TicketModalContext | undefined>(undefined);

export function TicketModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  const contextValue: TicketModalContext = {
    open,
    openModal,
    closeModal,
  };

  return <TicketModalContext.Provider value={contextValue}>{children}</TicketModalContext.Provider>;
}

export function useTicketModal() {
  const context = useContext(TicketModalContext);
  if (!context) {
    throw new Error('useTicketModal must be used within a TicketModalProvider');
  }
  return context;
}
