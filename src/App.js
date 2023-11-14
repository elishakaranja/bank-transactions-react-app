import React, { useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionTable from './TransactionTable';

function App() {
  // State to store transactions
  const [transactions, setTransactions] = useState([]);


  // Function to add a new transaction
  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // Rendering 
  return (
    <div>
      <h1>Bank Transactions</h1>
      {/* TransactionForm component for adding new transactions */}
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      {/* TransactionTable component to display transactions */}
      <TransactionTable  newTransaction={transactions} />
    </div>
  );
}

export default App;
