import React from 'react';
import { Form, Button } from 'react-bootstrap';

const TransactionForm = ({ form, handleChange, handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" name="amount" value={form.amount} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Currency</Form.Label>
                <Form.Control as="select" name="currency" value={form.currency} onChange={handleChange}>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" rows={3} name="note" value={form.note} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
    );
};

export default TransactionForm;
