import { useState } from "react";
import { registerUser } from "../../../../lib/auth";
import Router from "next/router";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await registerUser({
        username,
        password,
        email,
      });

      if (data.email || data.password || data.username) {
        setErrorMessage(data);
      }

      else {
        Router.push("/auth/login");
      }
    }
    catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="text-light">
        <legend className="h1">Register</legend>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="emailInput"
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="usernameInput"
            className="form-control"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
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

        <div className="row">
          <div className="col d-flex justify-content-center">
            {errorMessage && (
              <div className="alert alert-danger justify-content-center" role="alert">
                {
                  Object.keys(errorMessage).map((key, index) =>
                    <li key={key}>{key} - {errorMessage[key]}</li> 
                  )
                }
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-center">
            <button type="submit" className="btn btn-dark">
              Register
            </button>
          </div>
        </div>

        <hr />

      </fieldset>
    </form>
  );
}
