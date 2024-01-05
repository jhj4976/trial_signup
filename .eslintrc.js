module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin'react'recommended",
    ["airbnb-base", "prettier"], //eslint-config-prettier 가 앞선 설정들을 덮어쓸 수 있도록 prettier를 마지막에 작성
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["react"],
  rules: {
    // 들여쓰기 깊이 제한
    "max-depth": ["error", 2],
    // 함수의 매개변수 개수 제한
    "max-params": ["error", 3],
    // 함수의 길이 제한
    "max-lines-per-function": ["error", { max: 10 }],
    quotes: [2, "double", { avoidEscape: false }],
  },
}
