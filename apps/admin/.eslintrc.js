module.exports = {
  root: true,
  extends: ['custom'],
  overrides: [
    {
      files: ['src/iconify-bundle/*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}
