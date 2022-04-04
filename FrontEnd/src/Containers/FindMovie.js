
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
  console.log("yearrange===", years);

  useEffect(() => {
    fetch("http://localhost:5000/User/UnknownMovie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year_duration: years,
        genres: genre,
      }),
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("movies===", movies['1']['title']);

        var length = Object.keys(movies).length;
        console.log("length==", length);
        for (var i = 1; i < length; i++) {

          var s = String(i);





          console.log(movies[s]['title']);
        }
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
