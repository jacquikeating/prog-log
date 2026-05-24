import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import "./styles/index.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<OverviewPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;