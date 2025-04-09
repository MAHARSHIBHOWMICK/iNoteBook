import React ,{useState} from "react";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate();
    const [credentials , setCredentials] = useState({email : "" , password : ""});
    const host = "http://localhost:5001";
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:credentials.email , password : credentials.password}),
      });
      const json = await response.json();
      console.log(json);

      if (json.success) {
        // save the auth token and redirect
        localStorage.setItem("token" , json.authToken);
        navigate('/');
        props.showAlert("Logged in Successfully", "success");
      }
      else{
        props.showAlert("Invalid Credentials ", "danger");
      }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3">
      <h2>Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-3 mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
}
