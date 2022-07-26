import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { config } from "./config";

function Register() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const register = await axios.post(`${config.api}/register`, values);
        alert(register.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit} >
      <div className="row">
        <div className="col-lg-12">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </div>
        <div className="col-lg-12">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            className="form-control"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="col-lg-12">
          <label>Password</label>
          <input
            type="text"
            placeholder="Email"
            className="form-control"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className="col-lg-12 mt-2">
          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
      </form>
    </div>
  );
}

export default Register;
