import React, { useState } from 'react';
import { FaLock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Context/Firebase';
import SocialMediaIcons from '../../Components/SocialMediaIcons';
import Message from '../../Components/Message';
import { Link } from 'react-router-dom';
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phNumber, setPhNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[@#]/.test(password) || !/\d/.test(password)) {
      setError('Password must be at least 8 characters, contain uppercase, lowercase, a digit, and @ or #');
      setLoading(false);
      return;
    }
    if (phNumber.length !== 10 || isNaN(phNumber)) {
      setError('Phone Number should be exactly 10 digits');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username,
        phNumber,
        email,
      });

      setUsername('');
      setEmail('');
      setPhNumber('');
      setPassword('');
      setSuccess('Sign-up successful!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2 className="title" style={{color:"#fff"}}>Sign-Up</h2>
        <Message error={error} success={success} />
        
        <div className="input-field">
          <FaUser style={{ fontSize: '24px', margin: '10px', color: "royalblue" }} />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>

        <div className="input-field">
          <FaEnvelope style={{ color: "royalblue", fontSize: '24px', margin: '10px' }} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>

        <div className="input-field">
          <FaPhone style={{ color: "royalblue", fontSize: '24px', margin: '10px' }} />
          <input
            type="tel"
            value={phNumber}
            onChange={(e) => setPhNumber(e.target.value)}
            required
            placeholder="Phone Number"
            maxLength="10"
          />
        </div>

        <div className="input-field">
          <FaLock style={{ color: "royalblue", fontSize: '24px', margin: '10px' }} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn solid" disabled={loading}>
  {loading ? <div className="signup-spinner"></div> : 'Sign up'}
</button>
        <p style={{margin:"10px"}}>or</p>
       <div className="signin-link"> <Link to="/SignIn">Already have an account? Sign in here</Link></div>
        <p className="social-text">Or sign up with social platforms</p>
        <SocialMediaIcons />
      </form>
    </div>
  );
};

export default SignUp;
