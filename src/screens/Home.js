import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');


  const loadData = async () => {
    try {
      let res = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      res = await res.json();
      setFoodItem(res[0]);
      setFoodCat(res[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div > <Navbar />  </div>

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel' >

            <div className='carousel-caption' style={{ zIndex: '10' }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 bg-white text-dark" type="search" placeholder="Search for your favourite dishes here!" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                {/* <button className="btn btn-outline-danger bg-danger text-dark " type="submit" >Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/300×300?burger" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300?pizza" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300?steak" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {
          foodCat.length !== 0
            ? foodCat.map((data) => (

              <div key={data._id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length !== 0
                  ? foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">

                        <Card foodItem={filterItems}
                          options={filterItems.options[0]}
                          

                        />
                      </div>
                    ))
                  : <div>No Such Data Found! </div>}
              </div>

            ))
            : <div>No Data Found</div>
        }

      </div>
      <div> <Footer />  </div>
    </div>
  );
}
