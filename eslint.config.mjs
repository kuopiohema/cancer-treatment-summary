import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import tanstackQuery from '@tanstack/eslint-plugin-query'

export default defineConfig([
    {
        ignores: ['dist'],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname
            }
        },
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommendedTypeChecked,
            tseslint.configs.stylisticTypeChecked,
            reactX.configs['recommended-typescript'],
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            reactDom.configs.recommended,
            tanstackQuery.configs['flat/recommended']
        ],
    }
])
