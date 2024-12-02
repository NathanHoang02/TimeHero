const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Import the cors package

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const screenTimeRoutes = require('./routes/screenTime');
const taskRoutes = require('./routes/tasks');
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:8081', // Allow frontend to access this API
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // Change 'jade' to 'pug' if you’re using the latest version

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route definitions
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/screen-time', screenTimeRoutes);
app.use('/tasks', taskRoutes);
app.use('/leaderboard', leaderboardRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page (if using a view engine)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


