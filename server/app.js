const express = require('express');
const cors = require('cors');
const path = require('path')

require('dotenv').config({ path: './.env' })

const connectDB = require('./helpers/db')

// MongoDB Connection Init
connectDB(process.env.MONGO_URI)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/students', require('./routes/student.route'))

// Production setup
const _dirname = path.dirname('')
const buildPath = path.join(_dirname, '../client/build');

app.use(express.static(buildPath))

app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/build/index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
})

// PORT
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log('🚀 Server up and running on port ' + PORT))

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({
    msg: err?.message || 'Something went wrong!'
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Server Error: ${err.message}`)

  server.close(() => process.exit(1))
})