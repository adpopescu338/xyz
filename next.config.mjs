/** @type {import('next').NextConfig} */
import { getEmailTemplatesIds } from "./scripts/getEmailTemplatesIds.mjs";

console.log("ENV", process.env.NODE_ENV);

await getEmailTemplatesIds();

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
