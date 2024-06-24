module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true, // Mis à jour pour utiliser es2021
    node: true // Ajouté node comme environnement
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
    // Pas besoin de répéter les extensions si elles sont déjà incluses
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaFeatures: { jsx: true }, // Ajouté pour prendre en charge JSX
    ecmaVersion: 12, // Mis à jour à 12 (équivalent à 2021)
    sourceType: 'module'
  },
  settings: { react: { version: 'detect' } }, // Utilisez 'detect' pour la version de React
  plugins: [
    'react',
    'react-refresh' // Assurez-vous que tous les plugins nécessaires sont inclus
  ],
  rules: {
    "react/jsx-uses-react": "error",   
    "react/jsx-uses-vars": "error",
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    // Ajoutez ici vos règles personnalisées
  }
};
