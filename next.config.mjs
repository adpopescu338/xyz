/** @type {import('next').NextConfig} */
import { getEmailTemplatesIds } from "./scripts/getEmailTemplatesIds.mjs";

console.log("ENV", process.env.NODE_ENV);
console.log('NEXTAUTH_URL', process.env.NEXTAUTH_URL)

await getEmailTemplatesIds();

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
