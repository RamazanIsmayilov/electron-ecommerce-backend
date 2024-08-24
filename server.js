const express = require('express')
const app = express()
require('dotenv').config()

app.use('/', (req, res) => {
    res.send('Start App')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});