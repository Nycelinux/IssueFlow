import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from "eslint-plugin-prettier";

{
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    "prettier/prettier": "error",
  },
}