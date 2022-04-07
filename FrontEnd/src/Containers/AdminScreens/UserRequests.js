import Footer from "../../Components/Footer/footer";
import Layout from "../../Components/AdminLayout/Layout";
import { Table } from "react-bootstrap";
import { ButtonGroup, Button, Typography } from "@mui/material";
import { Toast, ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";

const UserRequests = () => {
  const [requ, setReq] = useState([]);
  const [code, setCode] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const mrequest=()=>{

    fetch("http://localhost:5000/Admin/GetMovieRequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((requestData) => {
          setReq(requestData.Items);
        });

  }
  useEffect(() => {
      mrequest();
  
  });
  const deleteReq = (id) => {
    fetch("http://localhost:5000/Admin/DeleteMovieRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RequestID: Number(id),
     
      }),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        if (updatedData.status_code === 200) {
          console.log("Successfulll=====");
          mrequest();
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

export default UserRequests;
