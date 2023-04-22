import { welcome_otp } from "@emails";

const x = () => {
  console.log("hello");

  // @ts-expect-error
  return welcome_otp({});
};

export default x;
