import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ChevronLeft, Loader } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const SidebarChats = ({
  chats,
  setActive,
  setReceiverName,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chats: any[];
  setActive: (value: number) => void;
  setReceiverName: (value: string) => void;
}) => {
  const localstorage = localStorage.getItem("userData");
  const parsedLocalstorage = JSON.parse(localstorage as string);
  return (
    <div>
      {chats.map((chat) => (
        <div
          onClick={() => {
            setActive(chat.chat_id);
            setReceiverName(
              chat.user1_username === parsedLocalstorage.username
                ? chat.user2_username
                : chat.user1_username
            );
          }}
          key={chat.chat_id}
          className="flex items-center gap-3 p-4 hover:bg-accent cursor-pointer border-b"
        >
          <Avatar>
            {/* Assuming you want to show the first letter of the other user's name */}
            <AvatarFallback>
              {
                (chat.user1_username === parsedLocalstorage.username
                  ? chat.user2_username
                  : chat.user1_username)[0]
              }
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <h3 className="font-medium">
              {chat.user1_username === parsedLocalstorage.username
                ? chat.user2_username
                : chat.user1_username}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {/* Display the content of the last message if available */}
              {chat.content || "No messages yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export function ChatSidebar({
  loading,
  chats,
  setActive,
  setReceiverName,
}: {
  loading: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chats: any[];
  setActive: (value: number) => void;
  setReceiverName: (value: string) => void;
}) {
  const { setOpen, open } = useSidebar();

  return (
    <Sidebar className="w-[300px] border-r ">
      <SidebarHeader className="h-fit flex items-center justify-center px-4 border-b min-h-[60px]">
        <h2 className="text-lg font-semibold">Your Friends</h2>
        <Button
          className="absolute right-0 z-10 top-0 bottom-0 my-auto -mr-5 rounded-full"
          variant="default"
          size="icon"
          onClick={() => setOpen(!open)}
        >
          <ChevronLeft className={`${open ? "" : "rotate-180"} h-5 w-5`} />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {loading ? (
          <Loader className="text-3xl animate-spin" />
        ) : (
          <SidebarChats
            setReceiverName={setReceiverName}
            chats={chats}
            setActive={setActive}
          />
        )}
      </SidebarContent>
    </Sidebar>
  );
}
