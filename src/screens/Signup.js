import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


export default function Signup() {

  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, password: credentials.password, email: credentials.email, location: credentials.geolocation })
    });

    const json = await response.json()

    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials!")
    }
    if (json.success) {
      navigate("/login")
    }

  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div style={{backgroundImage: `url(${require('../components/images/LoginBg.jpg')})`, height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <br/>
      <br/>
      <br/>
      <div className='container'>

        <form onSubmit={handleSubmit} >

          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white   fs-4">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-white fs-4">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-white fs-4">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleAddress" className="form-label text-white fs-4">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleAddress1" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a User!</Link>
        </form>
      </div>
    </div>
  )
}
