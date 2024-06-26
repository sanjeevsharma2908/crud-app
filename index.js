const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const noteRouter = require("./routes/note.route");
const cors = require("cors")
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())
app.use("/user", userRouter);
app.use("/notes",noteRouter)

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`connection to Mongodb is stablished and Server is listening @ http://localhost:${PORT}`)
    }
    catch (err) {
        console.log(err);
    }
})