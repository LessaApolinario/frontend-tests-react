const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "src/tests/e2e/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: false,
  },
  
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // or a function - the result is merged with
      // any `vite.config` file that is detected
      viteConfig: async () => {
        // ... do things ...
        const modifiedConfig = await injectCustomConfig(baseConfig)
        return modifiedConfig
      },
    },
  },
})