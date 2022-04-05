import Footer from "../Components/Footer/footer";
import Layout from "../Components/Layout/Layout";
import { useEffect } from "react";

const Request = () => {
  const name = localStorage.getItem("name");

  useEffect(() => {
    fetch("http://localhost:5000/User/GetMovieRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: name,
      }),
    })
      .then((res) => res.json())
      .then((requests) => {
        console.log("requests====", requests);
      });
  },[]);

  return (
    <div>
      <Layout></Layout>
      <Footer />
    </div>
  );
};

export default Request;
