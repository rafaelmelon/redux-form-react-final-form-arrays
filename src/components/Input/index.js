import React from 'react';

const Input = ({ input, placeholder, type, meta: { touched, error } }) => (
  <div className="input-group">
    <input className={`form-control ${touched && error ? "is-invalid" : ""}`} {...input}  min="0" type={type || "text"} placeholder={placeholder} />
    {touched && error && <span className="invalid-feedback">{error}</span>}
  </div>
);

export default Input;
