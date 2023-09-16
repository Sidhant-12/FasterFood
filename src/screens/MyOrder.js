import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function MyOrder() {

    const [orderData, setOrderData] = useState("")

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setOrderData(response)
        })

    }

    useEffect(() => {
        fetchMyOrder();
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData.length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3'>
                                                            <div className="card mt-3" style={{ width: "23rem", maxHeight: "400px" }}>
                                                                <div className="card-body text-center"> {/* Added text-center class */}
                                                                    <h5 className="card-title text-center">{arrayData.name}</h5> {/* Added text-center class */}
                                                                    <div className='container w-100 p-0' style={{ height: "50px" }}>
                                                                        <span className='m-1 text-center'>Qty: {arrayData.qty}</span> {/* Added text-center class */}
                                                                        <span className='m-1 text-center'>Size: {arrayData.size}</span> {/* Added text-center class */}
                                                                        <span className='m-1 text-center'>Date: {data}</span> {/* Added text-center class */}
                                                                        <div className='d-inline ms-2 h-100 w-20 fs-5 text-center'> {/* Added text-center class */}
                                                                            <br />
                                                                            Price: ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}
