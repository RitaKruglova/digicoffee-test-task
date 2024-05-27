import { Route, Routes } from 'react-router-dom';
import appStyles from './app.module.css';
import Login from '../../pages/login/login';

function App() {
  return (
    <div className={appStyles.app}>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
