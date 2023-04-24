const text = {
  Home: {
    title: "Login",
  },
  Signin: {
    title: "Sign in",
    inputs: {
      email: {
        label: "Email label",
        placeholder: "johndoe@mail.com placeholder",
        validation: {
          email: "Email is invalid",
          required: "Email is required",
        },
      },
      password: {
        label: "Password label",
        placeholder: "******** placeholder",
        validation: {
          required: "Password is required",
          length: "Password must be at least 6 characters long",
        },
      },
    },
    submit: "Submit",
  },
  Signup: {
    title: "Sign up",
    back: "Back",
    inputs: {
      email: {
        label: "Email label",
        placeholder: "johndoe@mail.com placeholder",
        validation: {
          email: "Email is invalid",
          required: "Email is required",
        },
      },
    },
    submit: "Submit",
  },
  Errors: {
    signup_missing_email: "Email is required",
    signup_missing_role: "Role is required",
    signup_invalid_role: "Role is invalid",
  },
};

export default text;
