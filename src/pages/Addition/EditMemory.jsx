import { useHistory, useParams } from 'react-router-dom';
import NavbarMD from "../../components/Navbar_for_MD";
import React, { useEffect, useState, useRef } from "react";
import { CircularProgress } from '@mui/material';
import Navbar from "../../components/Navbar";
import Alert from "../../components/Alert/Alert";
import jwt from 'jsonwebtoken';
import axios from 'axios';

const EditUser = ({ URL }) => {

  const localToken = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [Worning, setWorning] = useState('');
  const decodedToken = jwt.decode(localToken);
  const history = useHistory();
  const { Id } = useParams();
  const FatchRef = useRef();
  const [data, setData] = useState({
    name: "",
    image: "",
    description: ""
  });


  useEffect(() => {

    if (decodedToken == null) {
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

  useEffect(() => {
    FatchRef.current();
  }, [])


  let Fatch = (async () => {
    let data = await axios.get(`${URL}/upload/get/${Id}`)
    setData(data.data)
  });

  FatchRef.current = Fatch;

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", data.image);
      formData.append("name", data.name);
      formData.append("description", data.description);

      const res = await axios.patch(`${URL}/upload/update/${Id}`, formData);

      if (res.status === 200) {
        setData({ name: "", image: "", description: "" });
        setLoading(false);
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
              Update
            </button>
            {loading && (<CircularProgress size={24} id='CircularProgress' />)}
          </div>
        </div>
      </div>
      <NavbarMD />
    </>
  );
};

export default EditUser;
