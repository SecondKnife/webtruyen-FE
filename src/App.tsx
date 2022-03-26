import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChapterPage } from './Components/ChapterPage';
import Dashboard from './Components/Dashboard';
import MainPage from './Components/MainPage';
import TruyenDetail from './Components/TruyenDetail';
import { TruyenPage } from './Components/TruyenPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<MainPage />} />
          <Route path="/truyen-tranh">
            <Route index element={<Navigate to="/" />} />
            <Route path=":slug" element={<TruyenPage />}>
              <Route index element={<TruyenDetail />} />
              <Route path=":chapNumber" element={<ChapterPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
