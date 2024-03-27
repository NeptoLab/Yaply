import '@tamagui/core/reset.css'

import { Button, TamaguiProvider, YStack } from 'tamagui'

import ChatDialog from '@yaply/react/components/ChatDialog'

import config from './tamagui.config'

export const Root = () => {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <ChatDialog />
    </TamaguiProvider>
  )
}
