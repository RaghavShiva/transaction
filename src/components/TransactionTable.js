import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Currency</th>
                    <th>Title</th>
                    <th>Note</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.currency}</td>
                        <td>{transaction.title}</td>
                        <td>{transaction.note}</td>
                        <td>
                            <Button variant="link" onClick={() => onEdit(transaction.id)}>
                                <FaRegEdit />
                            </Button>
                            <Button variant="link" onClick={() => onDelete(transaction.id)}>
                                <FaTrashAlt />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TransactionTable;
