const express = require('express');
const isValidCredentials = require('./controller/auth-controller.js'); // Import the isValidCredentials function
const Assignment = require('./models/assign-model');
const mysql = require('mysql2')
const app = express();
const port = 8080;

//const secretKey = 'abc'; 
const bcrypt = require('bcrypt');
const basicAuth = require('basic-auth');

app.use(express.json());

//HTTP error except GET method
app.use((req, res, next) => {
  if (req.method !== 'GET') {

    //Set the Cache header
    res.setHeader('Cache-Control', 'no-cache','no-store','must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    //Set 405 Method Not Allowed
    return res.status(405).json();
  }
  next();
});

// Define a middleware for Basic Authentication
function authenticateBasicAuth(req, res, next) {
  const credentials = basicAuth(req);

  if (!credentials || !credentials.name || !credentials.pass) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Authentication required"');
    return res.sendStatus(401); // Unauthorized
  }

  const username = credentials.name;
  const password = credentials.pass;

  // Verify the credentials against your User database or another source of truth
  // Replace this logic with actual user authentication logic
  if (isValidCredentials(username, password)) {
    req.user = { username }; // Store the authenticated user for later use
    return next();
  } else {
    return res.sendStatus(401); // Unauthorized
  }

}

app.get('/health', authenticateBasicAuth , async (req,res) => {
  res.json({message:'Route Protected!'})
  let isHealthy =false
  var connection = mysql.createConnection({
  host:"localhost",
  port: '3306',
  user:"root",
  password:"Rutuja6367$",
  database: "sys"
  
});  

if (Object.keys(req.body).length !== 0) {
  // If the payload is not empty, respond with a 400 Bad Request status and an error message.
  res.status(400).json();
  return;
}

if (Object.keys(req.query).length !== 0) {
  // If the payload is not empty, respond with a 400 Bad Request status and an error message.
  res.status(400).json();
  return;
}

    await connection.connect(function(err) {
        if (err) {
            isHealthy = false
        }else{
            isHealthy = true
        }
       console.log("Connected!");
      
        if(isHealthy){  
          
          //add no cache header
          res.setHeader('Cache-Control', 'no-cache','no-store','must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('X-Content-Type-Options', 'nosniff');

          //success message
          res.status(200).json();
          
        }
        else{  
          console.log("Connection Interrupted!")  
          //Add Cache Header
          res.setHeader('Cache-Control', 'no-cache', 'no-store', 'must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('X-Content-Type-Options', 'nosniff');   
          res.status(503).json();
          
        }
      });
});

app.listen(port,() =>{
    console.log(`health check app listening on port ${port}`);

});

//Bootstrap DataBase

const fs = require('fs');
const csv = require('csv-parser');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sys', 'root', 'Rutuja6367$', {
  host: 'localhost', // Replace with your MySQL host
  dialect: 'mysql',
});
/* const User = sequelize.define('User', {
  first_name: {
    type: DataTypes.STRING,
    unique: true,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(72), // Adjust the length based on your hashing algorithm
  },
  account_created: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  account_updated: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Configure it to update on each update
  },
}); */

// Sync the database to create tables
sequelize.sync().then(() => {
  console.log('Database tables created.');

   // Read CSV file and create or update users
   fs.createReadStream('C:/Users/rutuj/Downloads/users.csv')
   .pipe(csv())
   .on('data', async (row) => {
    const hashedPassword = await bcrypt.hash(row.password, 10);

     User.findOrCreate({
       where: { first_name : row.first_name },
       defaults: {
         email: row.email,
         last_name: row.last_name, // Add the last_name field if needed
         password: hashedPassword,   // Add the password field if needed
       },
     }).then(([user, created]) => {
       if (!created) {
         console.log(`User ${user.first_name} already exists. Skipping.`);
       }
     });
   })
   .on('end', () => {
     console.log('CSV file processing completed.');
   });
});






// Define an Assignment model
/* const Assignment = sequelize.define('Assignment', {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  points: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 10,
    },
  },
  createdBy: {
    type: DataTypes.STRING, // Store the username of the creator
  },
}); */

/* app.get('/assignments', authenticateBasicAuth, async (req, res) => {
  const createdBy = req.user.username;
  res.json({message:"Authorized! USER - ", createdBy});
  try {
    // Find all assignments created by the authenticated user
    const assignments = await Assignment.findAll({
      where: {
        createdBy,
      },
    });

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized!' });
  }
}); */

/* app.post('/assignments', authenticateBasicAuth, async (req, res) => {

  const { title, description, points } = req.body;
  const createdBy = req.user.username;

  try {
    const assignment = await Assignment.create({
      title,
      description,
      points,
      createdBy,
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Update an Assignment
app.put('/assignments/:id', authenticateBasicAuth, async (req, res) => {
  const { title, description, points } = req.body;
  const assignmentId = req.params.id;
  const createdBy = req.user.username;

  try {
    const assignment = await Assignment.findOne({
      where: {
        id: assignmentId,
        createdBy,
      },
    });
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    assignment.title = title;
    assignment.description = description;
    assignment.points = points;

    await assignment.save();

    res.json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/assignments/:id', authenticateBasicAuth, async (req, res) => {
  const assignmentId = req.params.id;
  const createdBy = req.user.username;

  try {
    const assignment = await Assignment.findOne({
      where: {
        id: assignmentId,
        createdBy,
      },
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    await assignment.destroy();
    
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); */

