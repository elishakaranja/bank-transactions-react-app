import React, { useState } from 'react';

const TransactionForm = ({ onTransactionAdded }) => {
  // State to manage form data
  const [formData, setFormData] = useState({ date: '', description: '', category: '', amount: '' });

  // Function to update form data as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission(prevent  default)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending a request to add a new transaction
    fetch('https://my-json-server.typicode.com/elishakaranja/bank-transactions-react-app/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Notifying the parent component (App) about the new transaction
        onTransactionAdded(data);

        // Resetting the form data
        setFormData({ date: '', description: '', category: '', amount: '' });
      });
  };

  // Rendering the form
  return (
    <form onSubmit={handleSubmit}>   {/*preventing the default*}}
      {/* Input fields */}
      <label>Date: <input type="text" name="date" value={formData.date} onChange={handleChange} /></label>
      <label>Description: <input type="text" name="description" value={formData.description} onChange={handleChange} /></label>
      <label>Category: <input type="text" name="category" value={formData.category} onChange={handleChange} /></label>
      <label>Amount: <input type="text" name="amount" value={formData.amount} onChange={handleChange} /></label>
      {/* Submit button */}
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
