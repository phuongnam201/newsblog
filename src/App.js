import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";

function App() {
  return (
    <div className="App font-opensans mt-3">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/blog/:id" element={<ArticleDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
