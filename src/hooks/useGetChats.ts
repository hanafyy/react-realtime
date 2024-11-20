import { useState, useEffect } from "react";
export default function useGetChats() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const localstorage = localStorage.getItem("userData");
  const parsedLocalstorage = JSON.parse(localstorage as string);
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate a fetch API call
        const response = await fetch(
          `http://localhost:3000/chats/detailed/${parsedLocalstorage.id}`
        ); // Adjust this URL to your actual endpoint
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setChats(data);
      } catch (err) {
        console.log(err);
        // setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [parsedLocalstorage.id]); // This empty array makes sure the effect runs only once after the component mounts

  return { chats, loading, error, setChats };
}
