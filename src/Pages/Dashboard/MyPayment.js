
import { signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {  useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const MyPayment = () => {
    const [payments, setPayments] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    const invoiceRef = useRef();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/payment?patientEmail=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    console.log('res', res);
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }
                    return res.json()
                })
                .then(data => {

                    setPayments(data);
                });
        }
    }, [user])
    return (
        <div>
            <h2>My Payment: {payments.length}</h2>
            
            {/* <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            payments.map((a, index) => <tr key={a._id}>
                                <th>{index + 1}</th>
                                <td>{a.name}</td>
                                <td>{a.price}</td>
                                <td>{a.treatment}</td>
                                <td><div>
                                        <p><span className='text-success'>Paid</span></p>
                                        <p>Transaction id: <span className='text-success'>{a.transactionId}</span></p>
                                    </div></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div> */}
            <Row>
            <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Transaction Id
</th>
                <th>Name</th>
                <th>Treatment</th>
                <th>appointmentDate</th>
                            <th>Price</th>
                            
                            <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.transactionId}</td>
                  <td>{payment.patientName}</td>
                  <td>{payment.patientTreatment}</td>
                  <td>{payment.appointmentDate}</td>

                                <td>{payment.patientPay}</td>
                  <td>
                    {payment?.appointment?(
                      <ReactToPrint
                        trigger={() => (
                          <button className="btn btn-success mb-1">
                            {" "}
                            <i className="fas fa-print"></i>
                            <small className="invoice">Invoice</small>
                          </button>
                        )}
                        content={() => invoiceRef.current}
                      />
                    ) : (
                      // <i className="fas fa-times" style={{ color: "red" }}></i>
                      <span className="text-danger">Not paid</span>
                    )}
                    {/* the invisible table  */}
                    <div style={{ display: "none" }}>
                      <Table ref={invoiceRef} responsive>
                        <thead className="bg-light">
                          <tr>
                            <th colSpan={4} className="text-center fw-bold">
                              <h2 className="text-info">
                                {" "}
                                Doctor Portal{" "}
                              </h2>{" "}
                              <br />
                              <h5 className="text-dark">
                                Invoice Date: {new Date().toDateString()}
                              </h5>
                            </th>
                          </tr>
                          {/* <tr>
                            <th
                              colSpan={4}
                              className="d-flex justify-content-center"
                            >
                              <h4 className="text-dark fw-bold">
                                Delivery For :{" "}
                                <span className="text-warning">
                                  {order.user && order.user.name}
                                  {order.name}
                                </span>
                              </h4>
                            </th>
                          </tr> */}
                        </thead>
                        <tbody>
                          
                          <tr>
                            <td
                              colSpan={4}
                              className="d-flex justify-content-end me-2"
                            >
                              <h4 className="fw-bold">Payment Id: {payment._id}</h4>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={4}
                              className="d-flex justify-content-end me-2"
                            >
                              <h4 className="fw-bold">
                                Name: {payment.name}
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={4}
                              className="d-flex justify-content-end me-2"
                            >
                              <h4 className="fw-bold">
                                Email: {payment.email}
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={4}
                              className="d-flex justify-content-end me-2"
                            >
                              <h4 className="fw-bold">
                                Phone: {payment.phone}
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={4}
                              className="d-flex justify-content-end me-2"
                            >
                              <h4 className="fw-bold">
                              Treatment: {payment.treatment} 
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={4}
                              className="d-flex justify-content-end me-2"
                            >
                              <h4 className="fw-bold">
                                Price: {payment.price} Taka
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={4}
                              className="d-flex justify-content-end me-2"
                            >
                              <h4 className="fw-bold">
                              Transaction Id: {payment.transactionId} 
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={4}
                              className="d-flex justify-content-end me-2"
                            >
                              <h3 className="fw-bold text-info">
                                Payment Method: Stripe
                                {/* #demo card Number
                                4242424242424242 
                                4000056655665556
                                5555555555554444 */}
                              </h3>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
            </Row>
        </div>
    );
};

export default MyPayment;