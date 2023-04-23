import { ErrorResponse } from "../lib";
import sgMail from "@sendgrid/mail";
// this is generated at build time
import templatesIds from "./templateIds.json";

export const getTemplateId = (templateName: string) => {
  return templatesIds[templateName];
};

export type SharedEmailArgs = {
  to: string;
  subject?: string;
};

type SendDynamicTemplateArgs = {
  mandatoryFields?: string[];
  dynamicTemplateData: Record<string, any>;
  to: string;
  subject?: string;
  templateName: string;
};

export const sendDynamicTemplate = async ({
  mandatoryFields,
  dynamicTemplateData,
  to,
  subject,
  templateName,
}: SendDynamicTemplateArgs) => {
  validate(mandatoryFields, dynamicTemplateData, to);

  const templateId = getTemplateId(templateName);

  if (!templateId) {
    console.error(
      `Unable to send email: Missing template id for template ${templateName}`
    );
    throw new ErrorResponse("Unable to send email", 500);
  }

  const data = {
    to,
    from: "info@weddster.co.uk",
    dynamicTemplateData: dynamicTemplateData,
    templateId: templateId,
    ...(subject && { subject }),
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.send(data);
  } catch (e) {
    console.error( e.response?.body);
    throw new ErrorResponse("Unable to send email", 500);
  }
};

const validate = (
  mandatoryFields: string[] = [],
  dynamicTemplateData = {},
  to: string
) => {
  if (!to) {
    console.error(`Unable to validate email template data: Missing field "to"`);
    throw new ErrorResponse("Unable to send email", 500);
  }
  mandatoryFields = [...mandatoryFields];

  const missingFields = mandatoryFields.filter(
    (field) => !dynamicTemplateData[field]
  );

  if (missingFields.length) {
    console.error(
      `Unable to validate email template data: Missing fields ${missingFields.join(
        ", "
      )}`
    );
    throw new ErrorResponse("Unable to send email", 500);
  }
};
