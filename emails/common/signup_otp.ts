import { SharedEmailArgs, sendDynamicTemplateData } from "../shared";
import { TemplateNames } from "../template-names";

type TemplateArgs = SharedEmailArgs & {
  firstName?: string;
  otp: string;
};

const mandatoryFields: Array<keyof TemplateArgs> = ["otp"];

/**
 * @description Send email when a user signs up with OTP
 */
export const welcome_otp = async (args: TemplateArgs) => {
  const { otp, firstName } = args;

  const dynamicTemplateData = {
    otp,
    firstName,
  };

  return sendDynamicTemplateData({
    dynamicTemplateData,
    templateName: TemplateNames.SignupOtp,
    mandatoryFields,
    to: args.to,
  });
};
