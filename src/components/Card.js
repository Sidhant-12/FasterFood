import React from "react";

export default function Card() {
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem" }}>
  <img
    src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80"  // Replace with your image URL
    className="card-img-top"
    alt="Delicious Food"
  />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text.</p>
    <div className="container w-100">
      <select className="m-2 h-100 bg-danger rounded">
        {Array.from(Array(6), (e, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select className="m-2 h-100 bg-danger rounded">
        <option value="half">Half</option>
        <option value="full">Full</option>
      </select>
      <div className="d-inline h-100 fs-5">Total Price</div>
    </div>
  </div>
</div>  
    </div>
  );
}
