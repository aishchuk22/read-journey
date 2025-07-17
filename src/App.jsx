import { BrowserRouter } from "react-router-dom";
import AppContent from "./components/AppContent/AppContent";

function App() {
  return (
    <BrowserRouter basename="/read-journey">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
