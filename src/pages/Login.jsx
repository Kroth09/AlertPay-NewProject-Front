
import { FaLock, FaUser } from 'react-icons/fa'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreContext from '../Store/context';
import "./Login.css"

function initialState(){
    return { username: '', password: ''}
  }

function login({username, password}){
    if (username === "admin" && password === "admin"){
      return {token: "1234"}
    }
    return {error: "Usuário ou senha inválido"}
  }


const Login = () => {

    const [values, setValues] = useState(initialState)  
    const {setToken} = useContext(StoreContext)
    const navigate = useNavigate();

    function onChange(event) {
      const {value,name} = event.target
      setValues({
        ...values,
        [name]:value
      })
    }

    function onSubmit(event){
      event.preventDefault()
      console.log('%cLOGIN: Formulário enviado com valores:', 'color: blue;', values);
      const { token } = login(values)


      if(token) {
        console.log('%cLOGIN: Sucesso! Chamando setToken com:', 'color: blue; font-weight: bold;', token);
        setToken(token);
        console.log('%cLOGIN: Navegando para /dashboard...', 'color: blue;');
        return navigate('/dashboard')
      }else {
        console.log('%cLOGIN: Falha! Credenciais inválidas.', 'color: red;');
        setValues(initialState)
      }
    }



  return (
    <div className='container'>
          <form onSubmit={onSubmit}>
            <h1>Acesse o AlertPay</h1>

            {/* Campo de E-mail */}
            <div className='input-field'>
              <input 
              type="email" 
              placeholder='E-mail'
              name="username"
              onChange={onChange}
              value={values.username}
              />
              <FaUser className='icon'/>
            </div>

            {/* Campo de E-mail */}
            <div className='input-field'>
              <input 
              type="password" 
              placeholder='Senha' 
              name="password"
              onChange={onChange} 
              value={values.password}
              /> 
              <FaLock className='icon'/>
            </div>

             {/* Lembre de mim e Esqueci a senha */}
            <div className="recall-forget">
              <label>
                <input type="checkbox" />
                Lembre de mim
              </label>
              <a href="#">Esqueci a senha </a>
            </div>

            {/* Botão de Entrar */}
            <button type="button" onClick={onSubmit} >Entrar</button>
            <div className="signup-link">
              <p>Não tem uma conta? <a href="#">Registrar</a></p>
            </div>
          </form>
        </div>
  )
}

export default Login
