import { Button, CircularProgress, ButtonProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

type Props = Partial<ButtonProps> & {
  submitting?: boolean;
  children: string;
};

export const Submit = ({ children, submitting, ...rest }: Props) => {
  const { formState } = useFormContext();

  return (
    <Button
      variant={rest.variant || "contained"}
      type="submit"
      disabled={submitting || !formState.isValid}
      {...rest}
    >
      {submitting ? <CircularProgress size={24} /> : children}
    </Button>
  );
};
