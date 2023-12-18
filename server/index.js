const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const UserModel = require("./model/UserModel")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: "*"
}));

mongoose.connect("mongodb+srv://akmalzhantokhtasinov:9QX1vDxSpfHUojeu@cluster0.klohzlg.mongodb.net/?retryWrites=true&w=majority")

// get all users
app.get('/all', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
// get by id
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id: id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
// post 
app.post('/create', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
// update
app.put('/edit/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
// delete
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})




const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);