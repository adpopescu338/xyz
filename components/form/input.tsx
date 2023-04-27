import { TextField, TextFieldProps } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";
import { useUpdatableTextContainer } from "easy-text-update";

type Props = Partial<TextFieldProps> & {
  tPath: string;
  xs?: number;
};

export const Input = ({ name, tPath, xs = 6, ...rest }: Props) => {
  const { register, formState } = useFormContext();

  const { getText, getProps } = useUpdatableTextContainer(tPath);

  const error = formState.errors[name];

  return (
    <Grid item xs={xs}>
      <TextField
        {...register(name)}
        error={!!error}
        label={<span {...getProps("label")} />}
        placeholder={getText("placeholder")}
        helperText={
          error ? <span {...getProps(`validation.${error.type}`)} /> : undefined
        }
        variant={rest.variant || "outlined"}
        {...rest}
        inputProps={{
          ...rest?.inputProps, // copy over any inputProps
          ...getProps("placeholder", {
            // this enables editing the placeholder
            returnChildren: false,
          }),
        }}
      />
    </Grid>
  );
};
