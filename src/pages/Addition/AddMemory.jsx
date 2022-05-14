import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { CircularProgress } from '@mui/material';
import jwt from 'jsonwebtoken';
import Alert from "../../components/Alert/Alert";
import NavbarMD from "../../components/Navbar_for_MD";
import axios from 'axios';

const AddUser = ({ URL }) => {

  const history = useHistory();
  const localToken = localStorage.getItem('token');
  const [Worning, setWorning] = useState('');
  const [loading, setLoading] = useState(false);
  const decodedToken = jwt.decode(localToken);
  const [data, setData] = useState({
    name: "",
    image: "",
    description: "",
    useremail: decodedToken.user.email
  });

  useEffect(() => {

    if (decodedToken === null) {
      history.push('/');
      return;
    }

    if (decodedToken.exp * 1000 <= Date.now()) {
      localStorage.removeItem('token');
      history.push('/');
      alert("Session Timeout Please Login Again...");
      return;
    }

  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let formData = new FormData();
      formData.append("user_email", data.useremail);
      formData.append("file", data.image);
      formData.append("name", data.name);
      formData.append("description", data.description);

      const res = await axios.post(`${URL}/upload/post`, formData );

      if (res.status === 201) {
        setData({ name: "", image: "", description: "" });
        setLoading(false)
        history.push("/home");
      }
    } catch (err) {

      if (!err.response) {
          setWorning({ status: 'error', msg: "Your Are offline" })
          setLoading(false)
          return;
      }

      setWorning({ status: 'error', msg: err.response.data.msg });
      setLoading(false)
    }
  };

  return (
    <>
      <Navbar />
      {Worning ? <Alert msg={Worning.msg} mode={Worning.status} /> : null}
      <div className="container">
        <div style={{ maxWidth: 500, margin: "auto", marginTop: "100px" }}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Enter name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange("name")}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange("description")}
            >
            </textarea>
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange("image")}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Upload
            </button>
            {loading && (<CircularProgress size={24} id='CircularProgress' />)}
          </div>
        </div>
      </div>
      <NavbarMD />
    </>
  );
};

export default AddUser;
