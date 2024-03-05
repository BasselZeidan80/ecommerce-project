import React, { useState } from 'react';
import axios from 'axios';

export default function ResetPage ()  {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('initial'); // 'initial', 'verification', 'success', 'error'

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      // Make an API call to request password reset
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        email: email,
      });

      // Handle the response, e.g., show a success message or redirect the user
      console.log('Password reset request successful:', response.data);
      setResetStatus('verification');

    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error requesting password reset:', error.message);
      setResetStatus('error');
    }
  };

  const handleVerifyCode = async () => {
    try {
      // Make an API call to verify the reset code
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        verificationCode: verificationCode,
      });

      // Handle the response, e.g., show a success message or redirect the user
      console.log('Verification successful:', response.data);
      setResetStatus('success');

    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error verifying code:', error.message);
      setResetStatus('error');
    }
  };

  const handleResetPasswordFinal = async () => {
    try {
      // Make an API call to reset the password using the verification code
      const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email: email,
        // verificationCode: verificationCode,
        newPassword: newPassword,
      });

      // Handle the response, e.g., show a success message or redirect the user
      console.log('Password reset successful:', response.data);
      setResetStatus('success');

    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error resetting password:', error.message);
      setResetStatus('error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Password Reset</h2>

          {resetStatus === 'verification' && (
            <>
              <p className="alert alert-success">Verification code sent successfully. Check your email.</p>

              <div className="form-group">
                <label htmlFor="verificationCode">Verification Code:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                  placeholder="Enter your Verification Code"
                />
              </div>

              <button className="btn btn-primary mb-5" onClick={handleVerifyCode}>
                Verify Code
              </button>
            </>
          )}

          {resetStatus === 'success' && (
            <div>
              <p className="alert alert-success">Password reset successful. You can now log in with your new password.</p>
            </div>
          )}

          {resetStatus === 'error' && (
            <p className="alert alert-danger">An error occurred. Please try again.</p>
          )}

          {resetStatus === 'initial' && (
            <>
              <p className="card-text">Enter your email to reset your password.</p>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control mb-2"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                />
              </div>

              <button className="btn btn-primary mb-5" onClick={handleResetPassword}>
                Request Reset Code
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

