import { useEffect, useState } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Menu, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatSidebar } from "@/components/customComponents/sidebarChat";
import useGetChats from "@/hooks/useGetChats";
import useGetMessages from "@/hooks/useGetMessages";
import MessagesContainer from "@/components/customComponents/messagesContainer";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function ChatLayout() {
  const [inputMessage, setInputMessage] = useState("");
  const [active, setActive] = useState(0);
  const [receiverName, setReceiverName] = useState<string>("");
  const { chats, loading, setChats } = useGetChats();
  const localstorage = localStorage.getItem("userData");
  const parsedLocalstorage = JSON.parse(localstorage as string);

  const {
    messages,
    loading: gettingMessages,
    setMessages,
  } = useGetMessages(active);

  console.log(chats);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log(message);

      // Update messages by prepending the new message
      setMessages((prevMessages) => [...prevMessages, message]);

      // Update chats by moving the associated chat to the top and updating its last message
      setChats((prevChats) => {
        const chatIndex = prevChats.findIndex(
          (chat) => chat.chat_id === message.chat_id
        );
        if (chatIndex > -1) {
          // Remove the chat and reinsert it at the top
          const updatedChat = {
            ...prevChats[chatIndex],
            content: message.content, // assuming you store something like this
            message_user_id: message.user_id, // update the message user id if needed
          };
          return [
            updatedChat,
            ...prevChats.filter((_, index) => index !== chatIndex),
          ];
        } else {
          // If for some reason the chat isn't found, return the previous list unchanged
          return prevChats;
        }
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() && active !== 0) {
      socket.emit("sendMessage", {
        content: inputMessage,
        chatId: active,
        timestamp: new Date(),
        senderId: parsedLocalstorage.id,
      });
      setInputMessage("");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <ChatSidebar
          loading={loading}
          chats={chats}
          setActive={setActive}
          setReceiverName={setReceiverName}
        />
        <SidebarInset className="flex flex-col flex-1 w-full ml-10">
          <header className="h-[60px] border-b flex items-center px-4">
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </SidebarTrigger>
            <h1 className="text-lg font-semibold ml-4">
              {receiverName && "Chatting with"} {receiverName && receiverName}
              {!receiverName && "Starting chatting"}
            </h1>
          </header>
          <main className="flex-1 overflow-auto p-4">
            {active !== 0 ? (
              <MessagesContainer
                messages={messages}
                loading={gettingMessages}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <h2 className="text-4xl font-medium">Select a chat first</h2>
              </div>
            )}
          </main>
          <footer className="h-[60px] border-t p-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
