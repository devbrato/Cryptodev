import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Context/Firebase';
import "./PasswordRecovery.css";
import { FaEnvelope } from 'react-icons/fa';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when the form is submitted

    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Password recovery link sent to ${email}`);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false); // Stop loading after the process is complete
    }
  };

  return (
    <div className="container password-recovery-container" style={{background:" linear-gradient(#0b004e, #1d152f, #002834)", textAlign:"center", justifyContent:"center"}}>
      <form className="password-recovery-form" onSubmit={handleSubmit}>
        <h2 className="title" style={{color:"#ffff"}}>Password Recovery</h2>
        <div className="input-field">
          <FaEnvelope style={{ fontSize: '24px', margin: '10px',color:"royalblue" }} />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn solid" disabled={loading}>
          {loading ? <div className="password-spinner"></div> : 'Send Recovery Link'}
        </button>
        <p className='back-signin'><Link to="/SignIn">Back to Sign In</Link></p>
      </form>
    </div>
  );
};

export default PasswordRecovery;
