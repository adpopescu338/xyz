import * as yup from "yup";
import { Input, Form, Submit } from "./form";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { UpdatableText } from "easy-text-update";

const Schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const Signin = () => {
  return (
    <Grid container xs={12} gap={4}>
      <Grid xs={12}>
        <UpdatableText
          path="Signin.title"
          component={<Typography variant="h4" />}
        />
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
            {/* <UpdatableText path="Signin.submit">
              <Submit />
            </UpdatableText> */}
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};
