import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Only production sets NEXT_PUBLIC_ALLOW_INDEXING=true. Every other environment
 * (local, preview, staging) blocks all crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
