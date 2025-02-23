import { Routes, Route, BrowserRouter } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import BaseLayout from './layouts/BaseLayout';
import Login from './pages/Login';
import Translation from './pages/Translation';
import { AuthProvider } from './providers/Auth';
import Recent from './pages/Recent';
import FlashCard from './pages/FlashCard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<BaseLayout />}>
              <Route index element={<Translation />} />
              <Route path="/recent" element={<Recent />} />
              <Route path="/flash" element={<FlashCard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
