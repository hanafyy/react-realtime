import { Toaster } from "./components/ui/toaster";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

export default App;
