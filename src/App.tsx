import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import TransactionsListScreen from './screens/TransactionsListScreen';
import TransactionDetailScreen from './screens/TransactionDetailScreen';
import './App.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<TransactionsListScreen />} />
            <Route path="/detail" element={<TransactionDetailScreen />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
