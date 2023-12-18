import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Form, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Update() {
  const { id } = useParams()
  const users = useSelector(state => state.users.users)
  const user = users.find(u => u.id === id)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [age, setAge] = useState(user.age)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(user);

  const handleUpdate = () => {
    if (name && email && age !== "") {
      const fetchData = async () => {
        try {
          const response = await axios.put("http://localhost:5000/edit/" + id, { name, email, age })
          dispatch(updateUser({ id: id, name, email, age }))
          navigate("/")
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }
  }
  return (
    <Container className="mt-5">
      <Card className="d-flex align-items-center p-5">
        <h3>Edit user</h3>
        <Form style={{ width: "20rem" }} className="pb-5">
          <FormControl size="sm" placeholder="Name..." type="text" className="mb-2" onChange={e => setName(e.target.value)} value={name} />
          <FormControl size="sm" placeholder="Email..." type="text" className="mb-2" onChange={e => setEmail(e.target.value)} value={email} />
          <FormControl size="sm" placeholder="Age..." type="text" className="mb-2" onChange={e => setAge(e.target.value)} value={age} />
          <Button size="sm" onClick={handleUpdate} >Edit</Button>
        </Form>
      </Card>
    </Container>
  )
}
