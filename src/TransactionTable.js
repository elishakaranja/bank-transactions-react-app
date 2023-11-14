import React, { useState, useEffect } from 'react';

const TransactionTable = ({ transactions }) => {
 // const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering the transactions by the search term
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.description.toLowerCase().includes(searchTerm);
  });

  // Fetching transactions from the server when the component mounts and when a new transaction is added
  useEffect(() => {
    fetch('https://my-json-server.typicode.com/elishakaranja/bank-transactions-react-app/transactions')
      .then((response) => response.json())
      .then((data) => {
        // Setting the fetched transactions to the state
        setTransactions(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [newTransaction]); // The dependency array now includes newTransaction

  // Handling the search bar input change event
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Deleting a transaction
  const deleteTransaction = (transactionId) => {
    // Making a DELETE request to the server to remove the transaction
    fetch(`https://my-json-server.typicode.com/elishakaranja/bank-transactions-react-app/transactions/${transactionId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Updating the state of the transactions array to remove the deleted transaction
        setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
      })
      .catch((error) => {
        console.error('Error deleting transaction:', error);
      });
  };

  // Rendering the table of transactions
  return (
    <div>
      <h2>Recent Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions by description"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through filtered transactions and rendering each row in the table */}
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
