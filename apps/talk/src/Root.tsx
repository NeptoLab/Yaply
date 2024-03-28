import '@tamagui/core/reset.css'

import { Button, TamaguiProvider, YStack } from 'tamagui'

import { OpenAI } from 'openai'

import ChatDialog from '@yaply/react/components/ChatDialog'

import config from './tamagui.config'
import { useState } from 'react'

export const Root = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const handleSendMessage = async ({ text }) => {
    setMessages((messages) => [...messages, {
      id: messages.length + 1,
      user_id: 'user',
      text: text
    }]);

    if (!text) return;

    const openai = new OpenAI({ apiKey: 'OPEN_API_KEY', dangerouslyAllowBrowser: true });

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', 
        messages: [{ role: 'system', content: 'You are a helpful assistant.' },
                   { role: 'user', content: text }],
        stream: false,
      });
      setMessages((messages) => [...messages, {
        id: messages.length + 1,
        user_id: 'assistant',
        text: response.choices[0].message.content
      }]);
    } catch (error) {
      console.error('Error in sending message:', error);
    }
  }

  console.log(messages);

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <ChatDialog userId="user" messages={messages} handleSendMessage={handleSendMessage} />
    </TamaguiProvider>
  )
}
