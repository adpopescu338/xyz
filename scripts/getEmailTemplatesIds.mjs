import client from "@sendgrid/client";
import { writeFileSync, existsSync } from "fs";
import { templateNames } from "../emails/template-names/template-names.mjs";
import { toCamel } from "snake-camel";

const queryParams = {
  generations: "dynamic",
  page_size: 200,
};

const request = {
  method: "GET",
  url: "/v3/templates",
  qs: queryParams,
};

export const getEmailTemplatesIds = async () => {
  const path = "./emails/templateIds.json";

  if (existsSync(path)) {
    console.log(
      `File ${path} already exists. Skipping email templates ids retrieval.`
    );
    return;
  }

  client.setApiKey(process.env.SENDGRID_API_KEY);
  let body;

  console.log("Getting email templates ids...");
  try {
    const [_, b] = await client.request(request);
    body = b;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get email templates ids");
  }

  console.log(`Email templates ids retrieved successfully. Saving to ${path}`);

  const templatesMap = body.result.reduce((acc, template) => {
    acc[template.name] = template.id;
    return acc;
  }, {});

  validatetemplateNames(templatesMap);

  // write to file
  writeFileSync(path, JSON.stringify(templatesMap, null, 2));

  writeTemplateNamesTs();
};

const validatetemplateNames = (templatesMap) => {
  const missingTemplates = Object.values(templateNames).filter(
    (templateName) => {
      return !templatesMap[templateName];
    }
  );

  if (missingTemplates.length) {
    console.error("Missing templates:", missingTemplates);
    throw new Error("Missing templates");
  }
  console.log("Templates validated successfully");
};

const writeTemplateNamesTs = () => {
  const path = "./emails/template-names/index.ts";

  console.log(`Generating "template-names.ts" file in ${path}`);

  const templateNamesTs = Object.entries(templateNames).reduce(
    (acc, [key, value]) => {
      acc += `${toCamel(key)} = "${value}",`;
      return acc;
    },
    ""
  );

  const wrapper = `export enum TemplateNames {
      ${templateNamesTs}
}`;

  writeFileSync(path, wrapper);

  console.log(`"template-names.ts" file generated successfully`);
};
