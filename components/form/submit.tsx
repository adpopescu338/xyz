import { Button, CircularProgress } from "@mui/material";
import { useFormContext } from "react-hook-form";

type Props = {
  children: string;
};

export const Submit = ({ children, ...rest }) => {
  const { formState } = useFormContext();

  return (
    <Button type="submit" disabled={formState.isSubmitting} {...rest}>
      {formState.isSubmitting ? <CircularProgress size={24} /> : children}
    </Button>
  );
};
