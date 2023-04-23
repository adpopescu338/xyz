import { useText } from "@contexts";
import * as yup from "yup";
import { Input, Form } from "./form";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";

const Schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().length(6).required(),
});

export const Signin = () => {
  const { tProps, t } = useText("Signin");

  return (
    <Grid container xs={12} gap={4}>
      <Grid xs={12}>
        <Typography variant="h4" {...tProps("title")} />
      </Grid>
      <Form
        defaultValues={{ email: "", password: "" }}
        validationSchema={Schema}
        onSubmit={console.log}
      >
        <Grid container gap={4}>
          <Input name="email" tPath="Signin.inputs.email" />

          <Input
            type="password"
            name="password"
            tPath="Signin.inputs.password"
          />

          <Grid item xs={12}>
            <Button variant="contained" type="submit" {...tProps("submit")} />
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};
