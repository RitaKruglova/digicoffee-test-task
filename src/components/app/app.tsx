import { Route, Routes, useLocation } from 'react-router-dom';
import appStyles from './app.module.css';
import Login from '../../pages/login/login';
import Header from '../header/header';
import { loginRoure } from '../../utils/constants';
import Menu from '../menu/menu';

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
        </Routes>
      </main>
    </div>
  );
}

export default App;
