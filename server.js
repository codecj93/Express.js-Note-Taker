const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// routes
// GET /notes should return the notes.html file.
app.get("/notes", (req, res) => {
    // res.send("hi!")
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


// GET * should return the index.html file.
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


// api routes
app.get("/api/notes", (req, res) => {
    // res.sendFile(path.join(__dirname, "./db/db.json"))
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            res.send("There is an error!")
        } else {
            const parsedData = JSON.parse(data)
            res.json(parsedData)
        }
    })

})


app.post("/api/notes", (req, res) => {
    console.log(req.body);

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            res.send("There is an error!")
        } else {
            const parsedData = JSON.parse(data)

            console.log(parsedData)

            parsedData.push(req.body)

            fs.writeFile("./db/db.json", JSON.stringify(parsedData), () => {
                res.json(parsedData)
            })

        }
    })
})


app.listen(3001, () => {
    console.log("Server is now running!")
});