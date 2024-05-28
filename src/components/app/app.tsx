import { Route, Routes, useLocation } from 'react-router-dom';
import appStyles from './app.module.css';
import Login from '../../pages/login/login';
import Header from '../header/header';
import { loginRoure } from '../../utils/constants';

function App() {
  const location = useLocation();

  return (
    <div className={appStyles.app}>
      {location.pathname !== loginRoure && <Header />}
      <main className={appStyles.main}>
        <Routes>
          <Route
            path={loginRoure}
            element={<Login />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
