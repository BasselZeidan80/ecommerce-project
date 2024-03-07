// import React, { useContext, useEffect } from "react";
// import "./Favorites.css";
// import { CartContext } from "../../Context/CartContext";
// import { Circles } from "react-loader-spinner";
// import toast from "react-hot-toast";
// import EmptyFavPage from "../EmptyFavPage/EmptyFavPage";

// export default function Favorites() {
//   const { allFavItems, numOfFav, DeleteFavItem } = useContext(CartContext);

//   if (!allFavItems) {
//     return (
//       <div className="d-flex vh-100 bg-opacity-50 justify-content-center align-items-center">
//         <Circles
//           height="80"
//           width="80"
//           color="#4fa94d"
//           ariaLabel="circles-loading"
//           wrapperStyle={{}}
//           wrapperClass=""
//           visible={true}
//         />
//       </div>
//     );
//   }

//   async function deleteMyFavItem(id) {
//     const res = await DeleteFavItem(id);
//     if (res) {
//       console.log("deleted fav..");
//       toast.success("removed successfully", { position: "top-center" });
//     } else {
//       toast.error("error try again later", { position: "top-center" });
//     }
//   }

//   return (
//     <>
//       {allFavItems.length ? (
//         <div className="w-75 mx-auto">
//           <h2 className="pt-5  fw-bold">
//             FAVORITES: <span className="text-success">{numOfFav} </span>{" "}
//           </h2>
//           <hr className="line " />

//           <div className="row pt-5">
//             {allFavItems?.map((favItem, idx) => (
//               <div key={idx} className="col-lg-4 mb-2 ">
//                 <div className="cardFav">
//                   <figure className="cardImg ">
//                     <img src={favItem.imageCover} className="w-100" alt="" />
//                   </figure>
//                   <div className="ariaBody">
//                     <h4>{favItem.title}</h4>
//                     <i class=" px-1 text-danger fs-3  fa-solid fa-heart"></i>
//                   </div>
//                   <div className="ariaBody">
//                     <h5 className="text-muted">{favItem.brand.name} </h5>
//                     <p className="text-success fw-bold">{favItem.price}$</p>
//                   </div>
//                   {console.log(" favId", favItem.id)}
//                   <button
//                     onClick={() => deleteMyFavItem(favItem.id)}
//                     className="btn btn-outline-danger w-100 mt-2"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <EmptyFavPage />
//       )}
//     </>
//   );
// }
// ========================================

import React, { useContext, useEffect } from "react";
import "./Favorites.css";
import { CartContext } from "../../Context/CartContext";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import EmptyFavPage from "../EmptyFavPage/EmptyFavPage";
import { motion } from "framer-motion";

export default function Favorites() {
  const { allFavItems, numOfFav, DeleteFavItem } = useContext(CartContext);

  if (!allFavItems) {
    return (
      <div className="loader-container">
        <Circles
          height={80}
          width={80}
          color="#4fa94d"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  async function deleteMyFavItem(id) {
    const res = await DeleteFavItem(id);
    if (res) {
      console.log("deleted fav..");
      toast.success("Removed successfully", { position: "top-center" });
    } else {
      toast.error("Error. Try again later", { position: "top-center" });
    }
  }

  return (
    <>
      {allFavItems.length ? (
        <motion.div
          className="w-75 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="pt-5 fw-bold">
            FAVORITES: <span className="text-success">{numOfFav} </span>{" "}
          </h2>
          <hr className="line" />

          <div className="row pt-5">
            {allFavItems?.map((favItem, idx) => (
              <motion.div
                key={idx}
                className="col-lg-4 mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="cardFav">
                  <figure className="cardImg">
                    <img src={favItem.imageCover} className="w-100" alt="" />
                  </figure>
                  <div className="ariaBody">
                    <h4>{favItem.title}</h4>
                    <i className="px-1 text-danger fs-3 fa-solid fa-heart"></i>
                  </div>
                  <div className="ariaBody">
                    <h5 className="text-muted">{favItem.brand.name} </h5>
                    <p className="text-success fw-bold">{favItem.price}$</p>
                  </div>
                  {console.log("favId", favItem.id)}
                  <button
                    onClick={() => deleteMyFavItem(favItem.id)}
                    className="btn btn-outline-danger w-100 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <EmptyFavPage />
      )}
    </>
  );
}
