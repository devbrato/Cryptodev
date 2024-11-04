import React, { useRef, useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Context/Firebase';
import SocialMediaIcons from '../../Components/SocialMediaIcons';
import Message from '../../Components/Message';
import { Link } from 'react-router-dom';
import './SignIn.css'; // Ensure the CSS file is imported

const SignIn = () => {
  const UsernameRef = useRef('');
  const PasswordRef = useRef('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const username = UsernameRef.current.value;
    const password = PasswordRef.current.value;

    if (!username || !password) {
      setError('Username and password are required');
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Failed to sign in. Please check your username and password and try again.');
        setLoading(false);
        return;
      }

      let email = '';
      querySnapshot.forEach((doc) => {
        email = doc.data().email;
      });

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Signed in:', user);
      setSuccess("Sign-in Successful!");

      UsernameRef.current.value = '';
      PasswordRef.current.value = '';
    } catch (err) {
      setError('Failed to sign in. Please check your username and password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2 className="title" style={{color:"#ffff"}}>Sign-In</h2>
        <Message error={error} success={success} />

        <div className="input-field">
          <FaUser style={{ fontSize: '24px', margin: '10px', color: "royalblue" }} />
          <input
            type="text"
            placeholder="Username"
            ref={UsernameRef}
            autoComplete="off"
          />
        </div>

        <div className="input-field">
          <FaLock style={{ fontSize: '24px', margin: '10px', color: "royalblue" }} />
          <input
            type="password"
            placeholder="Password"
            ref={PasswordRef}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn solid" disabled={loading}>
          {loading ? <div className="signin-spinner"></div> : 'Login'}
        </button>

        <p className='forget-password' style={{marginTop:"15px"}}>
          <Link to="/PasswordRecovery">Forgot password?</Link>
        </p>
        <p className="social-text" style={{margin:"20px"}}>Or sign in with social platforms</p>
        <SocialMediaIcons />
      </form>
    </div>
  );
}

export default SignIn;
