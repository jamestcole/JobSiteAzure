import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    qualifications: '',
    demographics: '',
    statement: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/signup', formData);
    alert('User registered successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <input name="qualifications" onChange={handleChange} placeholder="Qualifications" />
      <input name="demographics" onChange={handleChange} placeholder="Demographics" />
      <textarea name="statement" onChange={handleChange} placeholder="Statement" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
