import Snackbar from "@mui/material/Snackbar";
import { createContext, useContext, useState } from "react";
import { useText } from "./TextContext";

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
  const { tProps } = useText("Errors");

  const handleClose = () => {
    setState(initialState);
  };

  const setAlert = (message: string, severity: "success" | "error") => {
    setState({ open: true, message, severity });
  };

  const editTextProps: any =
    state.severity === "error" ? { ...tProps(state.message) } : undefined;

  const message =
    state.severity === "error" ? editTextProps.children : state.message;

  return (
    <Context.Provider value={setAlert}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        {...{ ...editTextProps, children: undefined }}
      />
    </Context.Provider>
  );
};

export const useAlert = () => useContext(Context);
