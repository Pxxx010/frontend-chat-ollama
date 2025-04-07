import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const Login = ({ onLogin }) => {
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    try {
      // Credenciais de teste
      const testCredentials = {
        email: 'teste@teste.com',
        password: '1'
      };

      if (credentials.email === testCredentials.email && 
          credentials.password === testCredentials.password) {
        onLogin(credentials);
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Ocorreu um erro ao tentar fazer login');
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} error={error} />
    </div>
  );
};

export default Login; 