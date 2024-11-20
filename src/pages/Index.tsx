// import React, { useEffect, useState } from "react";
// import Pusher from "pusher-js";

// export default function Index() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Initialize Pusher
//     const pusher = new Pusher("0d190974810973c0fea4", {
//       cluster: "eu",
//     });

//     // Subscribe to the notifications channel
//     const channel = pusher.subscribe("notifications");

//     // Listen for the data-received event
//     channel.bind("data-received", (data: any) => {
//       console.log("Notification received:", data);
//       setNotifications((prev) => [...prev, data]);
//     });

//     // Cleanup on component unmount
//     return () => {
//       pusher.unsubscribe("notifications");
//     };
//   }, []);

//   // Function to send data to the server
//   const sendData = async () => {
//     const response = await fetch("http://localhost:3000/send-data", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: "Hello from the frontend!" }),
//     });
//     const result = await response.json();
//     console.log(result.message);
//   };

//   return (
//     <div>
//       <h1>Notifications</h1>
//       <button onClick={sendData}>Send Data</button>
//       <ul>
//         {notifications.map((notif, index) => (
//           <li key={index}>{notif.data}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
