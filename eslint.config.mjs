import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off", // disables unescaped apostrophe rule
      "@typescript-eslint/prefer-as-const": "off", // disables prefer-as-const warning
      "@next/next/no-img-element": "warn", // makes this a warning, not error
      "jsx-a11y/alt-text": "warn", // makes missing alt a warning
    },
  },
];

export default eslintConfig;
