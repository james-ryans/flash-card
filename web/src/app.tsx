import { Routes, Route, BrowserRouter } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import BaseLayout from './layouts/BaseLayout';
import { AuthProvider } from './providers/Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Translation from './pages/Translation';
import Recent from './pages/Recent';
import FlashCard from './pages/FlashCard';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
    </CookiesProvider>
  );
}

export default App;
