import React ,{useState} from "react";
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  let navigate = useNavigate();
    const [credentials , setCredentials] = useState({ name : "" ,email : "" , password : "" , cpassword:""});
    const host = "http://localhost:5001";
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/CreateUser` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name:credentials.name , email:credentials.email , password : credentials.password}),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // save the auth token and redirect
        localStorage.setItem("token" , json.authToken);
        navigate('/Login');
        props.showAlert("Account Created Successfully" , "success");
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
      <h2>Create an Account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            className="form-control"
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
