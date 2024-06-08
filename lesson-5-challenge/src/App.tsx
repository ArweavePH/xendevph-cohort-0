import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./page/Login";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/home"} element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
