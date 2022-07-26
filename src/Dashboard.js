import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "./config";

function Dashboard() {
  const [users, setUser] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editUser, setEditUser] = useState({});
  const navigate = useNavigate()
  let fetchData = async () => {
    try {
      let res = await axios.get(`${config.api}/students`, {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        if (!isEdit) {
          await axios.post(`${config.api}/student`, values, {
            headers: {
              Authorization: `${localStorage.getItem("react_app_token")}`,
            },
          });
          fetchData();
        } else {
          delete values._id;
          await axios.put(`${config.api}/student/${editUser._id}`, values, {
            headers: {
              Authorization: `${localStorage.getItem("react_app_token")}`,
            },
          });
          setIsEdit(false);
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  let handleEdit = async (id) => {
    try {
      let student = await axios.get(`${config.api}/student/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      });
      formik.setValues(student.data);
      setEditUser(student.data);
      setIsEdit(true);
    } catch (error) {}
  };

  let handleDelete = async (id) => {
    try {
      await axios.delete(`${config.api}/student/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      });
      fetchData();
    } catch (error) {}
  };

  let doLogout = () => {
    localStorage.removeItem("react_app_token");
    navigate("/")
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <button onClick={doLogout}>logout</button>
        </div>
        <div className="col-lg-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="col-lg-12">
              <label>Email</label>
              <input
                type="text"
                placeholder="Search"
                className="form-control"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label>Password</label>
              <input
                type="text"
                placeholder="Search"
                className="form-control"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-lg-12 mt-2">
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr>
                    <th scope="row">{user._id}</th>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
