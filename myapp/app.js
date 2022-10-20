const express = require('express')
const fs = require('fs')
const app = express()
const port = 8000

app.get('/', (req, res) => {
    let numbers= fs.readFileSync('number.txt', 'utf-8')
    fs.writeFileSync('number.txt', `${Number(numbers)+1}`)
    res.send(numbers)
})

app.listen(port)