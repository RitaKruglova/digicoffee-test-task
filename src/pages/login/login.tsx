import { FC } from 'react';
import loginStyles from './login.module.css';

const Login: FC = () => {
  return (
    <div className={loginStyles.container}>
      <form className={loginStyles.form}>
        <label className={loginStyles.label} htmlFor="email">Email</label>
        <input
          className={loginStyles.input}
          id="email"
        />
        <label className={loginStyles.label} htmlFor="password">Password</label>
        <input
          className={loginStyles.input}
          id="password"
        />
        <button
          className={loginStyles.button}
          type="submit"
        />
      </form>
    </div>
  )
}

export default Login;