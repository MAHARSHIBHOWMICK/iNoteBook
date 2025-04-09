const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
connectToMongo();


const app = express()
const port = 5001

// app.get('/', (req, res) => {
    //     res.send('Hello maharshi')
    // })
    
app.use(cors())
app.use(express.json());
//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
    console.log(`iNoteBook Backend listening at http://localhost:${port}`)
})