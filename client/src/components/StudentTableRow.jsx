import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import axios from 'axios';

function StudentTableRow(props) {
	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
	const { name, email, roll, _id } = props.obj;
	const { setReload } = props;

	const handleDelete = async () => {
		try {
			const res = await axios.delete(
				`${API_BASE_URL}/students/delete-student/` + _id
			);

			console.log(res.data?.msg);
			setReload((prevState) => !prevState);
			toast.success('Student deleted successfully!');
		} catch (err) {
			console.log('Deletion error:' + err);
			toast.error('Something went wrong!');
		}
	};

	return (
		<tr>
			<td>{name}</td>
			<td>{email}</td>
			<td>{roll}</td>
			<td>
				<Link className='edit-link' to={'/edit-student/' + _id}>
					Edit
				</Link>
			</td>
			<td style={{ textAlign: 'center' }}>
				<Button size='sm' variant='danger' onClick={handleDelete}>
					Delete
				</Button>
			</td>
		</tr>
	);
}

export default StudentTableRow;
