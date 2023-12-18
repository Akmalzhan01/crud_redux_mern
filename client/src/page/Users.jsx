import { useEffect } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import { getUser, deleteUser } from '../redux/userSlice';
import { Link, useParams } from 'react-router-dom';

export default function Users() {
const dispatch = useDispatch()
const users = useSelector(state => state.users.users)
const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all")    
        dispatch(getUser(response.data))
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [users])

const handleDelete = async (id) => {
  try {
    const response = await axios.delete('http://localhost:5000/delete/' + id)
    dispatch(deleteUser({id}))
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

  return (
    <Container className='my-5' >
      <Button size='sm' className='m-2' variant='success' as={Link} to="/create">+ Add</Button>
      <Table hover bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Button as={Link} to={`edit/${user.id}`} size='sm' className='me-2' variant='primary'>Update</Button>
                  <Button size='sm' variant='danger' onClick={() => handleDelete(user.id)}>Delete</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}
