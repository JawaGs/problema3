import React, { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap'
import Datagrid from './Datagrid';



function Login() {
  const [user, setUser] = useState('')
  const [clave, setClave] = useState('')
  const [token, setToken] = useState('')
  let toke = ''

  async function fetchData() {
    const datos = await fetch('https://cors-anywhere.herokuapp.com/https://dev.tuten.cl:443/TutenREST/rest/user/testapis%40tuten.cl', {
      method: 'PUT',
      headers: {
        'password': '1234',
        'app': 'APP_BCK',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }
    });
    const info = await datos.json()
    toke = await info.sessionTokenBck
    
setToken(toke)
  }
   
  function handleUser(e) {
    const usuario = e.target.value
    setUser(usuario)
  }
  function handleClave(e) {
    const Clave = e.target.value
    setClave(Clave)
  }
  function handleClick(){
    ((user==='testapis@tuten.cl')&&(clave==='1234'))?fetchData():alert('Usuario o Clave Invalida')
  }


  if (token === ''){
    return (
      <div className='container'>
        <Card className="w-50 m-5 p-2 col-md-6">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label >Email</Form.Label>
              <Form.Control name='user' onChange={handleUser} type="email" placeholder="Ingrese su email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name='clave' onChange={handleClave} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant='primary' block onClick={handleClick}>
              Ingresar
          </Button>
          </Form>
        </Card>
      </div>  
    )
  }else 
    return(
      <div>
        <Datagrid token={token} />
      </div>
    )
  
}

export default Login;
