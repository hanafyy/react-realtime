import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader } from "lucide-react";

export default function MessagesContainer({
  messages,
  loading,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[];
  loading: boolean;
}) {
  const localstorage = localStorage.getItem("userData");
  const parsedLocalstorage = JSON.parse(localstorage as string);
  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="text-3xl animate-spin" />
      </div>
    );
  if (!loading)
    return (
      <ScrollArea>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.user_id === parsedLocalstorage.id
                ? "justify-end"
                : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.user_id === parsedLocalstorage.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
    );
}
