import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
// import res1 from "./assets/Restaurant1.jpg";
// import res2 from "./assets/Restaurant2.jpg";
// import res3 from "./assets/Restaurant3.jpg";
// import res4 from "./assets/Restaurant4.jpg";
// import res5 from "./assets/Restaurant5.jpg";
// import res6 from "./assets/Restaurant6.jpg";
import image from "./assets/image 3.png";
import SearchBar from "./components/SearchBar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"
import "./FavRestaurant.css";

// const restaurants = [
//   {
//     id: 1,
//     name: "Miyabi - Sheraton Petaling Jaya",
//     image: res1,
//     description:
//       "A dining venue where an a la carte selection of customary Japanese specialties takes center stage.",
//     location: "Petaling Jaya",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     openinghours: "Mon-Sat 12–2:30 pm, 6:30–10:30 pm",
//     cuisine: "steakhouse",
//     review: "3.5",
//   },
//   {
//     id: 2,
//     name: "Sala Bar - Sheraton Petaling Jaya",
//     image: res2,
//     description:
//       "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
//     location: "Puchong",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     openinghours: "Mon-Sat 12–2:30 pm, 6:30–10:30 pm",
//     cuisine: "wine",
//     review: "4.5",
//   },
//   {
//     id: 3,
//     name: "Colonial Cafe",
//     image: res3,
//     description:
//       "The Colonial Cafe recreates the atmosphere of the halcyon days of the planters of Malaya.",
//     location: "Kajang",
//     address: "Colonial Cafe, The Majestic Hotel, 5, Jalan Sultan Hishamuddin",
//     phone: "03-22637434",
//     openinghours: "Mon-Sat 12–2:30 pm, 6:30–10:30 pm",
//     cuisine: "local Malaysia",
//     review: "3.8",
//   },
//   {
//     id: 4,
//     name: "PRIME - Le Méridien Kuala Lumpur",
//     image: res4,
//     description:
//       "Delight your palate with Australian cuts of beef, including tenderloin, sirloin, rib-eye and prime rib.",
//     location: "Kuala Lumpur",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     openinghours: "Mon-Sat 12–3 pm, 6–10 pm",
//     cuisine: "steakhouse",
//     review: "4.8",
//   },
//   {
//     id: 5,
//     name: "Yun House at Four Seasons Hotel",
//     image: res5,
//     description:
//       "A Cantonese with an edge, Yun House stretches the boundaries with elevated Chinese favourites.",
//     location: "Petaling Jaya",
//     address: "Yue, Lorong Utara C, Pjs 52, 46200 Petaling Jaya, Selangor",
//     phone: "03-22637434",
//     openinghours: "Mon-Sat 12–3 pm, 6–10 pm",
//     cuisine: "chinese",
//     review: "3.5",
//   },
//   {
//     id: 6,
//     name: "Cinnamon Coffee House",
//     image: res6,
//     description:
//       "Start your day with a perfect morning pick-me-up at our award-winning Cinnamon Coffee House!",
//     location: "Petaling Jaya",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     openinghours: "Mon-Sat 12–2:30 pm, 6:30–10:30 pm",
//     cuisine: "dessert",
//     review: "3.5",
//   },
// ];

const FavRestaurant = () => {
  const navigate = useNavigate();

  const [favRestaurants, setUserFavRestaurants] = useState([]);

  useEffect(() => {
    //get username from local storage
    const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    axios
      .get("http://localhost:3001/api/restaurant/favRestaurants", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setUserFavRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching favRestaurants:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: "100%" }} />
      <div className="container">
        <br />
        <div
          className="back-btn"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left-circle"></i> Back
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="custom-h1">Favourite Restaurants</h1>
          <div className="ml-auto">
            <SearchBar place="Locations, Restaurant, or Cuisines..." />
          </div>
        </div>
        <br />
        <div className="card mb-3">
          {favRestaurants.map((restaurant) => (
            <div className="row g-0 custom-row">
              <div className="col-md-4">
                <img
                  src={restaurant.image}
                  className="img-fluid rounded-start card-img-top"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <Link to={`/restaurant/${restaurant.id}`}> 
                    <h5 className="card-title">{restaurant.name}</h5>
                  </Link>
                  <p className="card-text">{restaurant.description}</p>
                  <p className="card-text">
                    <i className="bi-geo-alt-fill custom-icon"></i>
                    {restaurant.phone}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-telephone-fill custom-icon"></i>
                    {restaurant.address}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-clock-fill custom-icon"></i>
                    {restaurant.openinghours}
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-dark custom-button"
                  >
                    Unsaved
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavRestaurant;
