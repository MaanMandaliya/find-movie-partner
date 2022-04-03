
import Footer from "../Components/Footer/footer";
import Layout from "../Components/Layout/Layout";
import { useEffect } from "react";

const FindMovie = (props) => {
  console.log("for movies===", props.forMovies);
  const { initialDate, endDate, genre } = props.forMovies;
  console.log(initialDate.getFullYear());
  console.log(endDate.getFullYear());
  console.log(genre);
  let years = [];
  years.push(initialDate.getFullYear());
  years.push(endDate.getFullYear());

  useEffect(() => {
    fetch("http://localhost:3000/User/UnknownMovie", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        yearrange: years,
        genres: genre,
      }),
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
      });
  }, []);
  return (
    <div>
      <Layout></Layout>
      <Footer />
    </div>
  );
};

export default FindMovie;
