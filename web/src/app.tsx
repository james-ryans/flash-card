import { Routes, Route } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import BaseLayout from './layouts/BaseLayout';
import Login from './pages/Login';
import Translation from './pages/Translation';
import { AuthProvider } from './providers/Auth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route index element={<Translation />} /> */}
        <Route element={<PrivateRoute />}>
          <Route element={<BaseLayout />}>
            <Route index element={<Translation />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
