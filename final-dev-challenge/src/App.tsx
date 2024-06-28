import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Game from "./page/Game";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/game"} element={<Game />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
