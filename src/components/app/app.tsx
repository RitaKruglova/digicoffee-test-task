import { Route, Routes, useLocation } from 'react-router-dom';
import appStyles from './app.module.css';
import Login from '../../pages/login/login';
import Header from '../header/header';
import { loginRoure, profileRoute } from '../../utils/constants';
import Menu from '../menu/menu';
import Profile from '../../pages/profile/profile';

function App() {
  const location = useLocation();

  return (
    <div className={appStyles.app}>
      {location.pathname !== loginRoure && <Header />}
      <main className={appStyles.main}>
        {location.pathname !== loginRoure && <Menu />}
        <Routes>
          <Route
            path={loginRoure}
            element={<Login />}
          />
          <Route
            path={profileRoute}
            element={<Profile />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
