import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { defineConfig } from 'vite'

const shouldExtract = process.env.EXTRACT === '1'

const tamaguiConfig = {
  components: ['tamagui'],
  config: 'src/tamagui.config.ts',
}

export default defineConfig({
  clearScreen: true,
  plugins: [
    react(),
    crx({ manifest }),
    tamaguiPlugin(tamaguiConfig),
    shouldExtract ? tamaguiExtractPlugin(tamaguiConfig) : null,
  ].filter(Boolean),
})
