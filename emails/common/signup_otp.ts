import { SharedEmailArgs, sendDynamicTemplate } from "../shared";
import { TemplateNames } from "../template-names";

type TemplateArgs = SharedEmailArgs & {
  firstName?: string;
  otp: number;
};

const mandatoryFields: Array<keyof TemplateArgs> = ["otp"];

/**
 * @description Send email when a user signs up with OTP
 */
export const signup_otp = async (args: TemplateArgs) => {
  const { otp, firstName } = args;

  const dynamicTemplateData = {
    otp,
    firstName,
  };

  await sendDynamicTemplate({
    dynamicTemplateData,
    templateName: TemplateNames.SignupOtp,
    mandatoryFields,
    to: args.to,
  });
};
