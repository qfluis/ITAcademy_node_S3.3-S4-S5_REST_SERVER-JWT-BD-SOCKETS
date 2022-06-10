import React, { useEffect, useReducer } from 'react';
import { AppRouter } from './components/AppRouter';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false};
    // TODO: comprobar que el JWT es válido¿?

        /* { logged: true,
        email: 'qfluis@gmail.com',
        nickName: 'qfluis'}  */
}

export const SmapChatApp = () => {
    
    const [ user, dispatch ] = useReducer( authReducer, {}, init );
    useEffect(()=>{
        if (!user) return;
        localStorage.setItem('user', JSON.stringify(user));
    },[user])

    /*
    useEffect(()=>{
    try {
      const response = await fetch('http://localhost:3333/auth/renew', {
      method: 'POST',
      body: JSON.stringify({email: email.current.value, pass: pass.current.value}),
      headers:{
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if(!response.ok) {
          feedback.current.innerHTML = "<p>Error en el login:</p> <ul>";
          for (let error of data.errors) {
              feedback.current.innerHTML += '<li>'+error.msg+'</li>';
          }
          feedback.current.innerHTML += '</ul>';  
          return;              
      }

      dispatch({
          type: types.login,
          payload: {
              token: data.token,
              email: data.email,
              nickName: data.nickName
          }
      });

      navigate("/");
      
      //console.log('token', data.token);
    } catch (err) {
      feedback.current.innerHTML = "Email y/o contraseña incorrectos";
    }

  },[])
    */


    
    return (  
        <>  
            <AuthContext.Provider value={{
                    user,
                    dispatch
            }}>
                <div className="app-container">
                <NavBar />
                <AppRouter />
                <Footer />
                </div>
            </AuthContext.Provider>  
        </>
    );
}