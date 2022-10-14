const express = require("express")
const app = express()
const port = 8000
app.get('./', (req, res) => {
    res.send("This Is msg")
})
app.get('./contact', (req, res) => {
    res.send("This Is msg")
})
app.listen(8000, () => {
    console.log(`Server Own Port ${port}`);
})
