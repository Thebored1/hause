import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
};

// withPayload externalises Payload's database tooling (drizzle-kit and
// friends) from the server bundle. Without it Turbopack tries to parse
// non-JS files inside those packages and the admin fails to compile.
export default withPayload(nextConfig);
