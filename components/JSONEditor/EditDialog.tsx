import { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { Button } from "@mui/material";
import { Editor } from "./Editor";
import { sanitizeHtml } from "@lib/utils";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type EditDialogProps = {
  open: boolean;
  handleClose: () => void;
  node: string;
  propertyName: string;
  save: (value: string) => void;
  id?: string;
};

export const EditDialog = ({
  open,
  handleClose,
  node,
  propertyName,
  save,
  id,
}: EditDialogProps) => {
  const editedValue = useRef(node);

  return (
    <Dialog
      id={id}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>
        Edit <q>{propertyName}</q>
      </DialogTitle>
      <DialogContent>
        <Editor
          node={node}
          handleChange={(value) => {
            editedValue.current = value;
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            save(sanitizeHtml(editedValue.current));
            handleClose();
          }}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
