import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { Editable } from "./Editable";

export const JSONEditor = ({ node, propertyName, setNode }: any): any => {
  if (typeof node === "string") {
    return (
      <Editable node={node} propertyName={propertyName} setNode={setNode} />
    );
  }

  if (!Array.isArray(node) && typeof node === "object") {
    return Object.entries(node).map(([key, value]) => {
      return (
        <Accordion
          key={key}
          style={{
            marginLeft: 5,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{key}</Typography>
          </AccordionSummary>
          <JSONEditor
            node={value}
            propertyName={key}
            setNode={(n: any) => setNode({ ...node, [key]: n })}
          />
        </Accordion>
      );
    });
  }

  return null;
};

export { EditDialog } from "./EditDialog";
