import { useState, useEffect } from "react";

function useGetMessages(chatId: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(messages);
  useEffect(() => {
    // Define the function to fetch data inside the effect
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/messages/${chatId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data, "data here");
        setMessages(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchMessages();

    // Cleanup function in case the component using the hook unmounts
    return () => {
      setMessages([]); // Optionally clear messages when the chatId changes or component unmounts
    };
  }, [chatId]); // Rerun the effect if chatId changes

  return { messages, loading, error, setMessages };
}

export default useGetMessages;
