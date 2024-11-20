import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Socket from "@/pages/Socket";
import { useRoutes } from "react-router-dom";

export default function Routes() {
  const element = useRoutes([
    {
      path: "/chat",
      element: <Socket />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return element;
}
