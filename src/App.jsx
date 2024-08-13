import { useState } from 'react';
import { UserProvider } from './UserContext';
import axios from 'axios';
import Navbar from './Navbar';
import AllRoutes from './AllRoutes';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState('');

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      setToken(response.data.token);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post('/api/signup', { email, password });
      setToken(response.data.token);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const logout = () => {
    setToken('');
    setCurrentUser(null);
  };

  return (
    <>
      <UserProvider>
        <div>
          <Navbar setToken={setToken} />
          <AllRoutes />
        </div>
      </UserProvider>
    </>

  )
}

export default App;