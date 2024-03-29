module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard'
  ],
  overrides: [
    {
      files: ['*.html'],
      processor: 'vue/.vue'
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    // 'no-console': process.env.VUE_APP_MODE === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.VUE_APP_MODE === 'production' ? 'error' : 'off',
    // camelcase: 0
  }
}
