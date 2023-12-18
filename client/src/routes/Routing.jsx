import {Routes, Route} from "react-router-dom"
import Users from "../page/Users"
import Create from "../page/Create"
import Update from "../page/Update"

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Update />} />
    </Routes>
  )
}
