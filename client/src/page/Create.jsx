import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";


export default function Create() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (name && email && age !== "") {
      axios.post("http://localhost:5000/create", { name, email, age })
        .then((response) => {
          dispatch(addUser(response.data))
          navigate("/")
          console.log(response)
        })
        .catch((error) => console.log(error))
    }
  }
  return (
    <Container className="mt-5">
      <Card className="d-flex align-items-center p-5">
        <h3>Create user</h3>
        <Form style={{ width: "20rem" }} className="pb-5">
          <FormControl size="sm" placeholder="Name..." type="text" className="mb-2" onChange={e => setName(e.target.value)} />
          <FormControl size="sm" placeholder="Email..." type="text" className="mb-2" onChange={e => setEmail(e.target.value)} />
          <FormControl size="sm" placeholder="Age..." type="text" className="mb-2" onChange={e => setAge(e.target.value)} />
          <Button size="sm" onClick={handleSubmit} >Add</Button>
        </Form>
      </Card>
    </Container>
  )
}
