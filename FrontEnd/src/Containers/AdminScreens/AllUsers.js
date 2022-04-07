import Footer from "../../Components/Footer/footer";
import Layout from "../../Components/AdminLayout/Layout";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const AllUsers = () => {
  const [requ, setReq] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/Admin/GetUserProfiles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log("UserData====", userData);
        setReq(userData.Items);
      });
  });

  return (
    <div>
      <Layout>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          {requ.length > 0 &&
            requ.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item.Username}</td>
                    <td>{item.Email}</td>
                    <td>{item.Age}</td>
                    <td>{item.Phone}</td>
                    
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
export default AllUsers;
