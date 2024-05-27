import { FC } from 'react';
import loginStyles from './login.module.css';

const Login: FC = () => {
  return (
    <div className={loginStyles.container}>
      <form className={loginStyles.form}>
        <label className={loginStyles.label} htmlFor="email">Email</label>
        <input
          className={loginStyles.input}
          type="email"
          id="email"
        />
        <label className={loginStyles.label} htmlFor="password">Password</label>
        <input
          className={loginStyles.input}
          type="password"
          id="password"
        />
        <button
          className={loginStyles.button}
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;