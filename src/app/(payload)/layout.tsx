import type { ServerFunctionClient } from "payload";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import config from "@payload-config";
import { importMap } from "./admin/importMap";
// Prebuilt stylesheet: Payload's SCSS source does not compile under
// Turbopack, which leaves the admin unstyled.
import "@payloadcms/next/css";

export { metadata } from "@payloadcms/next/layouts";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
