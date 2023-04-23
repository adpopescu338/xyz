import { TextField, TextFieldProps } from "@mui/material";
import { useText } from "@contexts";
import { FieldErrors } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";

type Props = Partial<TextFieldProps> & {
  tPath: string;
  xs?: number;
};

export const Input = ({ name, tPath, xs = 6, ...rest }: Props) => {
  const { register, formState } = useFormContext();

  const { tProps, t } = useText(tPath);

  return (
    <Grid item xs={xs}>
      <TextField
        {...register(name)}
        error={!!formState.errors[name]}
        label={<span {...tProps(`label`)} />}
        placeholder={t("placeholder")}
        helperText={
          <HelperText errors={formState.errors} name={name} tProps={tProps} />
        }
        variant={rest.variant || "outlined"}
        {...rest}
        inputProps={{ ...tProps("placeholder"), children: undefined }} // this enabled editing the placeholder
      />
    </Grid>
  );
};

type HelperTextProps = { errors: FieldErrors; name: string; tProps: any };

const HelperText = ({ errors, name, tProps }: HelperTextProps) => {
  if (!errors[name]) return null;

  return <span {...tProps(`validation.${errors[name]?.type}`)} />;
};
