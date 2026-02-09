const express = require('express')
const app = express()
const fs = require('fs/promises')   // ✅ FIXED
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

app.use((req, res, next) => {
    console.log("I am middleware")
    next()
})

const readStudentsFromFile = async () => {
    const data = await fs.readFile('./students.json', 'utf-8')
    return JSON.parse(data || '[]')
}

app.get('/students', async (req, res) => {
    const students = await readStudentsFromFile()
    res.status(200).json(students)
})