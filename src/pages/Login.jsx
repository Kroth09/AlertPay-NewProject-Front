// Arquivo: pages/Login.jsx

import { FaLock, FaUser } from 'react-icons/fa';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StoreContext from '../Store/context';
import './Login.css'; // Importa o CSS específico para esta página

function initialState() {
  return { username: '', password: '' };
}

function login({ username, password }) {
  if (username === "admin" && password === "admin") {
    return { token: "1234" };
  }
  return { error: "Usuário ou senha inválido" };
}

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  function onChange(event) {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(event) {
    event.preventDefault();
    const { token } = login(values);
    if (token) {
      setToken(token);
      return navigate('/dashboard');
    } else {
      setValues(initialState);
    }
  }

  return (
    // Este 'div' cria o fundo escuro e centraliza o card de login
    <div className="login-page-wrapper"> 
      <div className='login-container'>
        <form onSubmit={onSubmit}>
          <h1>Acesse o AlertPay</h1>
          <div className='input-field'>
            <input type="email" placeholder='E-mail' name="username" onChange={onChange} value={values.username} />
            <FaUser className='icon' />
          </div>
          <div className='input-field'>
            <input type="password" placeholder='Senha' name="password" onChange={onChange} value={values.password} />
            <FaLock className='icon' />
          </div>
          <div className="recall-forget">
            <label><input type="checkbox" />Lembre de mim</label>
            <a href="#">Esqueci a senha</a>
          </div>
          <button type="button" onClick={onSubmit}>Entrar</button>
          <div className="signup-link">
            <p>Não tem uma conta? <Link to="/register">Registrar</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
