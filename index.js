const express = require('express')
const dtb = require('./src/dtb/inmem-db')
const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.all('*', (req, res, next) => {
    console.log('Request:', req.method, req.url)
    next()
})

app.get('/', function (req, res) {
    res.json({ message: 'Hello World' })
})

app.get('/api/info', (req, res) => {
    const info = {
        name: 'My Nodejs Express server',
        version: '0.0.1',
        description: 'This is a simple Nodejs Express server'
    }
    res.json(info)
})

app.get('/api/users', (req, res) => {
    dtb.getAll((err, data) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(data)
        }
    })
})