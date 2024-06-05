import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import EventPage from "./EventPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/e"} element={<EventPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
