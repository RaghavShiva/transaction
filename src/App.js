import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus, FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import IncomeChart from './components/IncomeChart';
import ExpenseChart from './components/ExpenseChart';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ date: '', amount: '', category: 'Income', currency: 'USD', title: '', note: '' });
  const [filter, setFilter] = useState({ type: 'All', currency: 'All', category: 'All', search: '' });
  const [theme, setTheme] = useState('light');
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const addTransaction = (e) => {
    e.preventDefault();
    setTransactions([...transactions, { ...form, id: Date.now() }]);
    setForm({ date: '', amount: '', category: 'Income', currency: 'USD', title: '', note: '' });
    setShowModal(false);
  };

  const editTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setForm(transaction);
    setTransactions(transactions.filter((t) => t.id !== id));
    setShowModal(true);
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    const isCurrentMonth = transactionDate.getMonth() === currentMonth;

    return (
      isCurrentMonth &&
      (filter.type === 'All' || t.category === filter.type) &&
      (filter.currency === 'All' || t.currency === filter.currency) &&
      (filter.category === 'All' || t.category === filter.category) &&
      (filter.search === '' || t.title.toLowerCase().includes(filter.search.toLowerCase()))
    );
  });

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  return (
    <Container>
      <div className="header">
        <h1>Transaction Manager</h1>
        <Button variant="primary" className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </Button>
      </div>

      <div className="month-nav">
        <Button variant="secondary" onClick={handlePrevMonth}>
          Previous Month
        </Button>
        <span className="current-month">{new Date(2023, currentMonth).toLocaleString('default', { month: 'long' })}</span>
        <Button variant="secondary" onClick={handleNextMonth}>
          Next Month
        </Button>
      </div>

      <Button className="add-button" onClick={() => setShowModal(true)}>
        <FaPlus className="plus-symbol" />
      </Button>

      <Row>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" name="type" value={filter.type} onChange={handleFilterChange}>
              <option>All</option>
              <option>Income</option>
              <option>Expense</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Currency</Form.Label>
            <Form.Control as="select" name="currency" value={filter.currency} onChange={handleFilterChange}>
              <option>All</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="category" value={filter.category} onChange={handleFilterChange}>
              <option>All</option>
              <option>Income</option>
              <option>Expense</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control type="text" name="search" value={filter.search} onChange={handleFilterChange} />
          </Form.Group>
        </Col>
      </Row>

      <TransactionTable transactions={filteredTransactions} editTransaction={editTransaction} removeTransaction={removeTransaction} />

      <div className="chart-container">
        <Row>
          <Col md={6}>
            <IncomeChart transactions={filteredTransactions.filter(t => t.category === 'Income')} />
            <div className="sum-display">Total Income: ${filteredTransactions.filter(t => t.category === 'Income').reduce((sum, t) => sum + parseFloat(t.amount), 0)}</div>
          </Col>
          <Col md={6}>
            <ExpenseChart transactions={filteredTransactions.filter(t => t.category === 'Expense')} />
            <div className="sum-display">Total Expense: ${filteredTransactions.filter(t => t.category === 'Expense').reduce((sum, t) => sum + parseFloat(t.amount), 0)}</div>
          </Col>
        </Row>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="income"
            id="transaction-tabs"
            className="mb-3"
            onSelect={(k) => setForm({ ...form, category: k.charAt(0).toUpperCase() + k.slice(1) })}
          >
            <Tab eventKey="income" title="Income">
              <TransactionForm form={form} handleChange={handleChange} handleSubmit={addTransaction} />
            </Tab>
            <Tab eventKey="expense" title="Expense">
              <TransactionForm form={form} handleChange={handleChange} handleSubmit={addTransaction} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default App;
