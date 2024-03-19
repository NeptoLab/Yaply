import BaseChatView from '@yaply/react/components/ChatView';
import useChats from '@yaply/hooks/useChats';

const ChatView = (props) => {
  const { chats } = useChats();

  return <BaseChatView chats={chats} {...props} />
};

export default ChatView;
