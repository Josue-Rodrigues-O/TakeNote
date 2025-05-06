import React from "react";
import { useState } from "react";
import "./Auth.css";

const Auth = () => {
  const [user, setTexto] = useState("");

  const onClickLogin = function (event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const email = form.get("login-email");
    const password = form.get("login-password");
  };

  const onClickRegister = function (event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const email = form.get("register-email");
    const password = form.get("register-password");
    const confirmPassword = form.get("register-confirm-password");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <div className="container">
      <div className="master">
        <div className="container-form">
          <h1>Login</h1>
          <div className="sub-container-form">
            <form className="form" onSubmit={onClickLogin}>
              <input name="login-email" type="text" placeholder="E-mail" />
              <input
                name="login-password"
                type="password"
                placeholder="Password"
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
        <hr />
        <div className="container-form">
          <h1>Register</h1>
          <div className="sub-container-form">
            <form className="form" onSubmit={onClickRegister}>
              <input name="register-email" type="text" placeholder="E-mail" />
              <input
                name="register-password"
                type="password"
                placeholder="Password"
              />
              <input
                name="register-confirm-password"
                type="password"
                placeholder="Confirm Password"
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
