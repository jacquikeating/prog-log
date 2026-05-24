import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import "./styles/index.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OverviewPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;