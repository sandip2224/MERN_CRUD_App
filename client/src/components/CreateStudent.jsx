import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateStudent() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [roll, setRoll] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newStudentObject = {
			name,
			email,
			roll,
		};

		try {
			const res = await axios.post(
				'/api/students/create-student',
				newStudentObject
			);
			console.log('New student created: ' + res.data);
			toast.success('New student created!');
		} catch (err) {
			console.log('Error: ' + err);
			toast.error('Something went wrong!');
		}

		setName('');
		setEmail('');
		setRoll('');
	};

	return (
		<div class='form-wrapper mt-4'>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='Name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='Email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='Name'>
					<Form.Label>Roll No</Form.Label>
					<Form.Control
						type='text'
						value={roll}
						onChange={(e) => setRoll(e.target.value)}
					/>
				</Form.Group>
				<Button
					variant='danger'
					size='lg'
					block='block'
					type='submit'
					className='mt-4'
				>
					Create Student
				</Button>
			</Form>
		</div>
	);
}

export default CreateStudent;
