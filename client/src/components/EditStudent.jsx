import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { toast } from 'react-toastify';

import { useHistory, useParams } from 'react-router-dom';

function EditStudent(props) {
	const { id } = useParams();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [roll, setRoll] = useState('');

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const history = useHistory();

	useEffect(() => {
		const fetchStudentData = async () => {
			try {
				const res = await axios.get(`/api/students/edit-student/` + id);
				setName(res.data.data.name);
				setEmail(res.data.data.email);
				setRoll(res.data.data.roll);

				setLoading(false);
				setError(false);
			} catch (err) {
				toast.error('Student data autofill failed!');
				setLoading(false);
				setError(true);
			}
		};
		fetchStudentData();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newStudentObject = {
			name,
			email,
			roll,
		};

		try {
			const res = await axios.put(
				`/api/students/update-student/` + id,
				newStudentObject
			);
			console.log(res.data?.msg);
			toast.success('Student data updated!');
		} catch (err) {
			console.log('Error: ' + err);
			toast.error('Something went wrong!');
		}

		history.push('/');
	};

	if (loading) return <h2>Loading...</h2>;
	else {
		if (error) return <h2>Something went wrong!</h2>;

		return (
			<div className='form-wrapper mt-5'>
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
						Update Student
					</Button>
				</Form>
			</div>
		);
	}
}

export default EditStudent;
