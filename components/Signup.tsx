import dynamic from "next/dynamic";
import { useState } from "react";
import { Input, Form, Submit } from "./form";
import * as yup from "yup";
import { useText, useAlert } from "@contexts";
import { Button, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { useMutation } from "react-query";
import { Role } from "@prisma/client";
import { AuthClient } from "@lib";

const OTPInput: any = dynamic(() => import("otp-input-react"), { ssr: false });

const defaultValues = {
  email: "",
  role: Role.Trader,
};

export type SignupFormValues = typeof defaultValues;

export const Signup = () => {
  const [step, setStep] = useState(0);
  const { tProps } = useText("Signup");
  return (
    <Grid container xs={12} gap={4}>
      <Grid xs={12}>
        <Typography variant="h4" {...tProps("title")} />
      </Grid>

      {step === 0 && <Email onSuccess={() => setStep(1)} />}
      {step === 1 && <OTP goBack={() => setStep(0)} />}
    </Grid>
  );
};

const OTP = ({ goBack }) => {
  const [otp, setOtp] = useState("");
  const { tProps } = useText("Signup");

  return (
    <Grid container xs={12} gap={4}>
      <Grid xs={12}>
        <OTPInput
          autoFocus
          value={otp}
          onChange={setOtp}
          OTPLength={6}
          otpType="number"
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={goBack} {...tProps("back")} />
      </Grid>
    </Grid>
  );
};

const Schema = yup.object().shape({
  email: yup.string().email().required(),
});

const Email = ({ onSuccess }) => {
  const { tProps } = useText("Signup");
  const { mutate, isLoading } = useMutation(AuthClient.signup);
  const setAlert = useAlert();

  return (
    <Form
      onSubmit={(val) => {
        mutate(val, {
          onSuccess,
          onError: (err: any) => {
            setAlert(err.response.data.error, "error");
          },
        });
      }}
      defaultValues={defaultValues}
      validationSchema={Schema}
    >
      <Grid container gap={4}>
        <Input name="email" tPath="Signup.inputs.email" />

        <Grid item xs={12}>
          <Submit {...tProps("submit")} submitting={isLoading} />
        </Grid>
      </Grid>
    </Form>
  );
};
