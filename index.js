const express = require('express');
const app = express();
const port = 3001;

const QUESTIONS = [{
  title: "Two states",
  description: "Given an array, return the maximum of the array?",
  testCases: [{
      input: "[1,2,3,4,5]",
      output: "5"
  }]
}];

const SUBMISSION = [];
let USERS = [];

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    // Assuming you have some way to identify admins, such as a flag in the user object
    if (req.user && req.user.isAdmin) {
        // User is an admin, proceed to the next middleware
        next();
    } else {
        // User is not an admin, return 403 Forbidden
        res.status(403).send('Only admins are allowed to access this route');
    }
}

// Route for adding a new problem, accessible only to admins
app.post('/problems', isAdmin, function(req, res) {
    // Logic to add a new problem goes here
    res.send('Problem added successfully');
});

app.post('/signup',(req, res) => {
  // Decode the request body to retrieve email and password
  const { email, password } = req.body;

  // Check if the email is already registered
  const existingUser = USERS.find(user => user.email === email);

  if (existingUser) {
    // If user already exists, return a 409 Conflict status code
    return res.status(409).send('User already exists');
  } else {
    // If user doesn't exist, create a new user object
    const newUser = { email, password };
    // Store the new user in the USERS array
    USERS.push(newUser);
    // Return a 200 status code with a success message
    return res.status(200).send('User signed up successfully!');
  }
});

app.post('/login',(req, res) => {
  // Decode the request body to retrieve email and password
  const { email, password } = req.body;

  // Find user with the provided email
  const user = USERS.find(user => user.email === email);

  if (!user) {
    // If user with the provided email does not exist, return 401 Unauthorized
    return res.status(401).send('User not found');
  }

  // Check if the provided password matches the user's password
  if (user.password !== password) {
    // If password does not match, return 401 Unauthorized
    return res.status(401).send('Incorrect password');
  }

  // If email and password are correct, generate and send a token
  const token = generateToken(); // Function to generate a token
  return res.status(200).json({ token });
});

app.get('/questions', function(req, res) {
  // Assuming QUESTIONS is an array containing question objects
  res.json(QUESTIONS);
});

app.get("/submissions", function(req, res) {
  // Retrieve the user's submissions for this problem (assuming you have a function to do so)
  const userSubmissions = getUserSubmissions(req.user.id, req.query.problemId); // Assuming you have a function to retrieve user submissions
  
  // Return the user's submissions
  res.json(userSubmissions);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
