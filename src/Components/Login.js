import React, { useState, useContext } from 'react'; 
import { UserContext } from './UserContext'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginSlideUp, setLoginSlideUp] = useState(true);
  
  const navigate = useNavigate(); 
  const { login } = useContext(UserContext); 

  const handleToggle = () => {
    setLoginSlideUp(prevState => !prevState);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Signup successful! Please log in.');
        setUsername('');
        setSignupEmail('');
        setSignupPassword('');
      } else {
        toast.error(data.message || 'Signup failed.');
      }
    } catch (error) {
      toast.error('Error occurred during signup: ' + error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
        });
        
        const data = await response.json();
        console.log('Login Response:', data); 

        if (response.ok) {
            toast.success('Login successful!');
            login({
                name: data.user1.username,
                email: data.user1.email,
            });

            localStorage.setItem('isLoggedIn', 'true');
            setTimeout(() => {
                navigate('/upload');
            }, 2000);
        } else {
            toast.error(data.message || 'Login failed.');
        }
    } catch (error) {
        toast.error('Error occurred during login: ' + error.message);
    }
};


  
  return (
    <div>
      <ToastContainer />
      <div className="form-structor">
        <div className={`signup ${!isLoginSlideUp ? 'slide-up' : ''}`}>
          <h2 className="form-title" id="signup" onClick={handleToggle}>
            <span>or</span> Sign up
          </h2>
          <form className="form-holder" onSubmit={handleSignupSubmit}>
            <div className='input_container'>
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
                required
              />
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={signupEmail}
                onChange={ev => setSignupEmail(ev.target.value)}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={signupPassword}
                onChange={ev => setSignupPassword(ev.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Sign up</button>
          </form>
        </div>
        <div className={`login ${isLoginSlideUp ? 'slide-up' : ''}`}>
          <div className="center">
            <h2 className="form-title" id="login" onClick={handleToggle}>
              <span>or</span> Log in
            </h2>
            <form className="form-holder" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={loginEmail}
                onChange={ev => setLoginEmail(ev.target.value)}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={loginPassword}
                onChange={ev => setLoginPassword(ev.target.value)}
                required
              />
              <button type="submit" className="submit-btn">Log in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
