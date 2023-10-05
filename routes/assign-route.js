// assignment-routes.js
import express from "express";
import * as assignController from '../controller/assign-controller.js';
import * as healthController from '../controller/health-controller.js';
import {tokenize} from '../service/auth.js';


const router = express.Router();

// POST /assignments route to create an assignment
router.route('/v1/assignments').post(tokenize, assignController.createAssignment);

// GET /assignments route to retrieve assignments created by the authenticated user
router.get('/v1/assignments', tokenize, assignController.getAssignmentsByUser);

// GET /assignments route to retrieve assignments created by the authenticated user
router.get('/v1/assignments/:id', tokenize, assignController.getAssignmentsById);

//DELETE/ assignments route to delete assignment created by auth user
router.delete('/v1/assignments/:id',tokenize, assignController.deleteAssignment);

// PUT /assignments/:assignmentId route to update an assignment
router.put('/v1/assignments/:id', tokenize, assignController.updateAssignment);

//healthRoute
// GET 
router.get('/healthz', );


/* const Assignment = require('../models/assign-model.js'); // Import your Assignment model

function authenticateBasicAuth(req, res, next) {
    const credentials = basicAuth(req);
  
    if (!credentials || !credentials.name || !credentials.pass) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Authentication required"');
      return res.sendStatus(401); // Unauthorized
    }
} */

// GET /assignments route
/* router.get('/assignments', authenticateBasicAuth, async (req, res) => {
  const createdBy = req.user.username;
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

export default router;
