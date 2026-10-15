import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt — επιτρέπουμε ρητά σε όλα τα bots αναζήτησης ΚΑΙ
 * στους AI crawlers (Google-Extended/Gemini, GPTBot/ChatGPT, Claude,
 * Perplexity) να διαβάζουν το περιεχόμενο, ώστε η επιχείρηση να
 * προτείνεται και από τα AI assistants.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "DuckDuckBot",
          "Applebot",
          "Google-Extended",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Amazonbot",
          "Meta-ExternalAgent",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/*", "/kalathi", "/oloklirosi-paraggelias"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
