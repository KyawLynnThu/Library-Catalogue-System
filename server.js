require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 4000;

app.get('/', function (req, res) {
  res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
