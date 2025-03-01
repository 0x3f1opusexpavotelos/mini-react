

import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'

export default tslint.config(
    {
        ignores: [
            '**/dist/**',
            '**/temp/**',
            '**/*.snap'
        ]
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
)


{
    "arrowParens": "always",
    "bracketSameLine": false,
    "objectWrap": "preserve",
    "bracketSpacing": true,
    "semi": true,
    "experimentalOperatorPosition": "end",
    "experimentalTernaries": false,
    "singleQuote": false,
    "jsxSingleQuote": false,
    "quoteProps": "as-needed",
    "trailingComma": "all",
    "singleAttributePerLine": false,
    "htmlWhitespaceSensitivity": "css",
    "vueIndentScriptAndStyle": false,
    "proseWrap": "preserve",
    "insertPragma": false,
    "printWidth": 80,
    "requirePragma": false,
    "tabWidth": 2,
    "useTabs": false,
    "embeddedLanguageFormatting": "auto"
  }


  {
    "arrowParens": "always",
    "bracketSameLine": false,
    "objectWrap": "preserve",
    "bracketSpacing": true,
    "semi": true,
    "experimentalOperatorPosition": "end",
    "experimentalTernaries": false,
    "singleQuote": false,
    "jsxSingleQuote": false,
    "quoteProps": "as-needed",
    "trailingComma": "all",
    "singleAttributePerLine": false,
    "htmlWhitespaceSensitivity": "css",
    "vueIndentScriptAndStyle": false,
    "proseWrap": "preserve",
    "insertPragma": false,
    "printWidth": 80,
    "requirePragma": false,
    "tabWidth": 2,
    "useTabs": false,
    "embeddedLanguageFormatting": "auto"
  }



  {
    "arrowParens": "always",
    "bracketSameLine": false,
    "objectWrap": "preserve",
    "bracketSpacing": true,
    "semi": true,
    "experimentalOperatorPosition": "end",
    "experimentalTernaries": false,
    "singleQuote": false,
    "jsxSingleQuote": false,
    "quoteProps": "as-needed",
    "trailingComma": "all",
    "singleAttributePerLine": false,
    "htmlWhitespaceSensitivity": "css",
    "vueIndentScriptAndStyle": false,
    "proseWrap": "preserve",
    "insertPragma": false,
    "printWidth": 80,
    "requirePragma": false,
    "tabWidth": 2,
    "useTabs": false,
    "embeddedLanguageFormatting": "auto"
  }