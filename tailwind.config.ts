/**
 * Tailwind CSS v4 Configuration
 *
 * In Tailwind v4, the primary configuration is done via @theme blocks
 * in globals.css. This JavaScript config exists as an escape hatch for
 * any programmatic customization that can't be expressed in CSS.
 *
 * All design token mappings (colors, fonts, spacing, etc.) are defined
 * in app/globals.css using @theme inline { ... } blocks.
 *
 * To use this config, add the following to globals.css:
 *   @config "../tailwind.config.ts";
 *
 * Currently this file is intentionally minimal — all tokens live in CSS.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
};

export default config;
