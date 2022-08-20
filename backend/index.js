const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
connectToMongo();
const app = express()
const port = 5000
//use middleware
app.use(cors())
app.use(express.json())
//routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNoteBook Backend app listening on port ${port}`)
})