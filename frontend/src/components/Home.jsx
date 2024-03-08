// import { React, useEffect } from "react";
// import{useNavigate} from "react-router-dom";
// import { useState } from 'react';
// const Home = () => {
//   const[roomCode,setroomCode]=useState("");
//   const navigate=useNavigate();
//   const callHomepage = async () => {
//     try {
//       const res = await fetch("http://localhost:8001/home",{
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       const data = await res.json();
//       console.log(data);
//       // setUserData(data);

//       // console.log("Response status:", res.status);
//       // console.log("Response headers:", res.headers);

//       if (res.status !== 200) {
//         throw new Error(res.statusText);
//       }
//     } catch (err) {
//       // console.error("Error:", err.message);
//       navigate("/login");
//       // return res;
//     }
    
//   };

//   const handleFormSubmit=(event)=>{
//     event.preventDefault();
//     navigate(`/room/${roomCode}`);
//   }
//   useEffect(() => {
//     callHomepage();
//   }, [])
  
//   return (
//     <div className="home-page">
//       <form className="form" onSubmit={handleFormSubmit} method="GET">
//         <div>
//           <label>
//             <h2>Enter the room number</h2>
//           </label>
//           <input
//             type="text"
//             value={roomCode}
//             onChange={(e) => setroomCode(e.target.value)}
//           ></input>
//         </div>
//         <button type="submit">Enter</button>
//       </form>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const callHomepage = async () => {
    try {
      const res = await fetch("http://localhost:8001/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
      navigate("/login");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate(`/room/${roomCode}`);
  };

  useEffect(() => {
    callHomepage();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Enter the room number</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Room Code"
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;

