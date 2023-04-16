import { useState, useRef } from "react";
import styled from "styled-components";
import AccordionDetails from "@mui/material/AccordionDetails";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { EditDialog } from "./EditDialog";

const EditRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 3px;
  align-items: center;
  background-color: #f5f5f5;
`;

export const Editable = ({
  node,
  propertyName,
  setNode,
}: {
  node: string;
  propertyName: string;
  setNode: (n: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const editedValue = useRef(node);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    editedValue.current = node;
  };

  return (
    <div>
      <AccordionDetails>
        <EditRow>
          <div
            dangerouslySetInnerHTML={{
              __html: node,
            }}
          />
          <IconButton color="primary" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
        </EditRow>
      </AccordionDetails>
      <EditDialog
        open={open}
        handleClose={handleClose}
        node={node}
        propertyName={propertyName}
        save={(value) => {
          setNode(value);
        }}
      />
    </div>
  );
};
