const express = require('express');
const app = express();
const projects = require('./data.json').projects;

// Allows the use of PUG to render HTML templates
app.set('view engine', 'pug');
app.use('/images', express.static('images'));
app.use('/static', express.static('public'));

//Renders the index.html page
app.get('/', (req, res) => {
  res.render('index', {projects});
});

//Renders the about.html page
app.get('/about', (req, res) => {
  res.render('about');
});

//Captures the ":id" from the url specific for each project in the data.json file
// and uses this data to dynamically build a project page using the project
// specific data
//An error handler is used to address any non-existent web page entries
app.get('/project/:id', (req, res, next) => {
  const { id } = req.params;
  const project = projects[id];
  if (project !== undefined) {
      res.render('project', {project});
    } else {
    const err = new Error();
    err.message = 'Sorry';
    err.status = '404';
    err.stack = 'The page you are looking for cannot be found';
    res.status(404);
    next(err);
  }
});

//Renders the error page
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {err});
});

//Crates a local server for the site to be viewed
// app.listen(process.env.PORT || 3000, () => {
// });

let port = process.env.PORT;
if (port == null || port === "5000") {
  port = 5000;
  console.log('The app is listening on port 5000')

}
app.listen(port);