import React, { useEffect, useState } from "react";
import "./PaymentsList.css";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/get/all/payment");
      if (!response.ok) throw new Error("Failed to fetch payments");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePayment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/admin/delete/payment/${id}`, { method: "DELETE" });
      if (response.ok) {
        setPayments((prevPayments) =>
          prevPayments.filter((payment) => payment.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="payments-container">
      <div className="payments-card">
        <h2>Payments List</h2>
        {payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <React.Fragment key={payment.id}>
                  <tr
                    onClick={() =>
                      setExpandedRow(expandedRow === payment.id ? null : payment.id)
                    }
                    className="main-row"
                  >
                    <td>{payment.id}</td>
                    <td>{payment.fullName}</td>
                    <td>{payment.email}</td>
                    <td>{payment.amount} {payment.currency}</td>
                    <td>{payment.status}</td>
                    <td>{payment.createdAt}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePayment(payment.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {expandedRow === payment.id && (
                    <tr className="details-row">
                      <td colSpan="7">
                        <div className="details-grid">
                          <p><strong>Gender:</strong> {payment.gender}</p>
                          <p><strong>Age Group:</strong> {payment.ageGroup}</p>
                          <p><strong>Nationality:</strong> {payment.nationality}</p>
                          <p><strong>Occupation:</strong> {payment.occupation}</p>
                          <p><strong>Organization:</strong> {payment.organization}</p>
                          <p><strong>Qualification:</strong> {payment.qualification}</p>
                          <p><strong>Specialization:</strong> {payment.specialization}</p>
                          <p><strong>Experience:</strong> {payment.experience}</p>
                          <p><strong>Previous Training:</strong> {payment.previousTraining}</p>
                          <p><strong>Training Goals:</strong> {payment.trainingGoals}</p>
                          <p><strong>Outcomes:</strong> {payment.outcomes}</p>
                          <p><strong>Training Mode:</strong> {payment.trainingMode}</p>
                          <p><strong>Remarks:</strong> {payment.remarks}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentsList;
