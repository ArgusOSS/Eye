import { useState, useEffect } from "react";
import Router from "next/router";
import { loginUser } from "../../../../lib/auth";
import { removeToken } from "../../../../lib/token";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Remove the User's token which saved before.
    removeToken();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      // API call:
      const data = await loginUser(email, password);
      console.log(data);
      var to_forward;
      if (data.shirt_size === null) {
        to_forward = "/dashboard/shirt";
      } else {
        to_forward = "/dashboard/greetings";
      }
      
      console.log(to_forward);

      if (data && data.tokens) {
        if (rememberMe) {
          window.localStorage.setItem("access_token", data.tokens.access);
          window.localStorage.setItem("refresh_token", data.tokens.refresh);
        } else {
          window.sessionStorage.setItem("access_token", data.tokens.access);
          window.sessionStorage.setItem("refresh_token", data.tokens.refresh);
        }
        
        window.sessionStorage.setItem("name", data.username);
        window.sessionStorage.setItem("size", data.shirt_size);
        setTimeout(() => {
          Router.push(to_forward);
        }, 1000);
      } else {
        setErrorMessage("Invalid Credentials!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="text-light">
        <legend className="h1">Login</legend>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="emailInput"
            className="form-control"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="passwordInput"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="RememberMeInput"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="RememberMeInput">
              Remember Me
            </label>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      
      <div className="row">
        <div className="col d-flex justify-content-center">
          <button type="submit" className="btn btn-dark" disabled={isLoading}>
            Login
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <hr />
        </div>
      </div>

      <div className="row">
          <div className="col d-flex justify-content-center">
            <a className="btn btn-outline-light" href="/api/authentication/google" role="button">
              <img width="20px" style={{marginBottom: "3px", marginRight: "5px"}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              Login with Google
            </a>
          </div>
      </div>
      </fieldset>
    </form>
  );
}
