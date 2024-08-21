const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const Users = require("./models/user")

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/crud").then(() => {
    console.log("connexcted to mdb")
    app.listen(3000, () => {
        console.log("The server is running on http://127.0.0.1:3000")
    })
}).catch((err) => console.log(err) )



app.get("/", (req, res) => {
    Users.find({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "Error fetching data", error: err });
        });
});
app.get("/user:id", (req, res) => {
    const {id} = req.params
    Users.findById(id).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({message: "Error id not found", error: err})
    })
})


app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const result = await Users.create({ name, email, password });
        res.status(201).json(result); // Use 201 for resource creation
    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate email error
            res.status(400).json({ message: "Email already exists" });
        } else {
            // Handle other errors
            res.status(500).json({ message: "Server error", error: err });
        }
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find a single user by email
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Here, we're comparing passwords directly; in a real app, you'd hash passwords
        if (user.password === password) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});


app.put("/users/:id", async (req, res) => {
    const { id } = req.params; // Get user ID from URL parameters
    const { name, email, password } = req.body; // Get updated data from the request body

    try {
        // Find user by ID and update with new data
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { name, email, password }, // Fields to update
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});


app.delete("/users/:id", async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedUser = await Users.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});

