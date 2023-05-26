import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

import StudentTableRow from './StudentTableRow';

function StudentList() {
	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/students`);
				setStudents(res.data.data);
				setLoading(false);
				setError(false);
				toast.success('Student details fetched successfully!');
			} catch (err) {
				toast.error('Could not fetch student details!');
				setLoading(false);
				setError(true);
			}
		};

		fetchStudents();
	}, [reload]);

	if (loading) return <h2>Loading...</h2>;
	else {
		if (error) return <h2>Something went wrong!</h2>;

		return (
			<div className='table-wrapper mt-5'>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Roll No</th>
						</tr>
					</thead>
					<tbody>
						{students.map((res, i) => {
							return (
								<StudentTableRow obj={res} key={i} setReload={setReload} />
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default StudentList;
