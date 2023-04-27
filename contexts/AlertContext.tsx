import Snackbar from "@mui/material/Snackbar";
import { createContext, useContext, useState } from "react";
import { UpdatableText } from "easy-text-update";

const initialState = {
  open: false,
  message: "",
  severity: "success",
};

const Context = createContext(
  (message: string, severity: "success" | "error") => {}
);

export const AlertContext = ({ children }) => {
  const [state, setState] = useState(initialState);

  const handleClose = () => {
    setState(initialState);
  };

  const setAlert = (message: string, severity: "success" | "error") => {
    setState({ open: true, message, severity });
  };

  return (
    <Context.Provider value={setAlert}>
      {children}
      {state.open && (
        <UpdatableText path={`Errors.${state.message}`}>
          {(message) => (
            <Snackbar
              open
              autoHideDuration={6000}
              onClose={handleClose}
              message={message}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
          )}
        </UpdatableText>
      )}
    </Context.Provider>
  );
};

export const useAlert = () => useContext(Context);
