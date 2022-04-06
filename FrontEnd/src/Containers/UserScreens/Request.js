import Footer from "../../Components/Footer/footer";
import Layout from "../../Components/Layout/Layout";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { ButtonGroup, Button, Typography } from "@mui/material";
import { Toast, ToastContainer } from "react-bootstrap";

const Request = () => {
  const name = localStorage.getItem("name");
  const [requ, setReq] = useState([]);
  const [code, setCode] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const movieRequest = () => {
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
        console.log(requests.Items);
        console.log(
          "requests====",
          requests.Items[0].RequestID,
          requests.Items[0].MovieRequest.imdb_id,
          requests.Items[0].MovieRequest.title
        );
        setReq(requests.Items);
      });
  };

  useEffect(() => {
    movieRequest();
  }, []);

  const deleteReq = (id) => {
    fetch("http://localhost:5000/User/DeleteMovieRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RequestID: Number(id),
        Username: name,
      }),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        if (updatedData.status_code === 200) {
          console.log("Successfulll=====");
          movieRequest();
          setCode(true);
          setMessage(updatedData.message);
        }
      });
  };

  return (
    <div>
      <Layout>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Movie Title</th>
              <th>imdb_id</th>
              <th>Actions</th>
            </tr>
          </thead>
          {requ.length > 0 &&
            requ.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>#{item.RequestID}</td>
                    <td>{item.MovieRequest.imdb_id}</td>
                    <td>{item.MovieRequest.title}</td>
                    <td>
                      {" "}
                      <ButtonGroup>
                        <Button
                          style={{
                            backgroundColor: "green",
                            borderColor: "white",
                            color: "white",
                            marginLeft: "",
                          }}
                          type="submit"
                          onClick={() => {}}
                        >
                          Edit
                        </Button>

                        <Button
                          style={{
                            backgroundColor: "red",
                            borderColor: "white",
                            color: "white",
                            marginLeft: "70px",
                          }}
                          type="submit"
                          onClick={() => {
                            deleteReq(item.RequestID);
                            setShow(true);
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      {" "}
                      {code && (
                        <ToastContainer position="center-end">
                          <Toast
                            onClose={() => {
                              setShow(false);
                            }}
                            show={show}
                            delay={10000}
                            animation
                            style={{
                              color: "white",
                              backgroundColor: "darkblue",
                            }}
                            autohide
                          >
                            <Toast.Body>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {message}
                              </Typography>
                            </Toast.Body>
                          </Toast>
                        </ToastContainer>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </Layout>
      <Footer />
    </div>
  );
};

export default Request;
