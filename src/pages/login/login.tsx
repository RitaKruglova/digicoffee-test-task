import { FC } from 'react';
import loginStyles from './login.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchLogin, setValue } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { profileRoute } from '../../utils/constants';

const Login: FC = () => {
  const values = useAppSelector(store => store.user.values);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
  
    if (name === 'email' || name === 'password') {
      dispatch(setValue({ name, value }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      await dispatch(fetchLogin({
        emailValue: values.email,
        passwordValue: values.password
      }));
      navigate(profileRoute);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={loginStyles.container}>
      <form className={loginStyles.form} onSubmit={handleSubmit}>
        <label className={loginStyles.label} htmlFor="email">Email</label>
        <input
          className={loginStyles.input}
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <label className={loginStyles.label} htmlFor="password">Password</label>
        <input
          className={loginStyles.input}
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button
          className={loginStyles.button}
          type="submit"
          disabled={!values.email || !values.password}
        >
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;