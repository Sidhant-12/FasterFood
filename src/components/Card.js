import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOptions = Object.keys(options)

  let foodItem = props.foodItem;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const priceRef = useRef();

  const handleAddToCart = async () => {
    let existingCartItem = null;

    for (const item of data) {
      if (item.id === foodItem._id && item.size === size) {
        existingCartItem = item;
        break;
      }
    }

    if (existingCartItem) {
      await dispatch({ type: "UPDATE", id: existingCartItem.id, price: finalPrice, qty: qty });
    } else {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
    }
  }



  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])


  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="Delicious Food" style={{ height: "200px", objectFit: "fill" }} />
        <div className="card-body" >
          <h5 className="card-title fs-4 d-flex flex-row justify-content-center">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 fs-6 bg-danger rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="m-2 h-100 fs-6 bg-danger rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline m-2 h-100 fs-6 ">₹{finalPrice}/-</div>
          </div>
          <hr />
          <div>
            <button className="btn btn-danger ms-5 h-100 fs-6 bg-danger rounded" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
