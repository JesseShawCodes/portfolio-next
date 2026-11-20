import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      "coverage/**",
      "public/mockServiceWorker.js",
    ],
  },
];

export default eslintConfig;
