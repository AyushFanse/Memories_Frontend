import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import jwt from 'jsonwebtoken';
import NavbarMD from "../../components/Navbar_for_MD";

const AddUser = ({ URL }) => {
  const history = useHistory();
  const localToken = localStorage.getItem('token');
  const decodedToken = jwt.decode(localToken);
  const [data, setData] = useState({
    name: "",
    image: "",
    description:"",
    useremail:decodedToken.user.email
  });

  useEffect(()=>{
    if(decodedToken==null){
      history.replace('/');
      alert("Session Timeout Please Login Again...");
  }else{
          if(decodedToken.exp*1000<=Date.now()){
            history.replace('/');
            alert("Session Timeout Please Login Again...");
          }}
  },[])
  
  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("user_email", data.useremail);
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("description", data.description);

      const res = await fetch(`${URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", image: "", description:"", useremail:"" });
        history.replace("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
        <div className="container">
          <div style={{ maxWidth: 500, margin: "auto", marginTop:"100px" }}>
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
                Submit
              </button>
            </div>
          </div>
        </div>
      <NavbarMD />
    </>
  );
};

export default AddUser;
