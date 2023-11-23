// assignment-routes.js
import express from "express";
import * as assignController from '../controller/assign-controller.js';
import * as healthController from '../controller/health-controller.js';
import {tokenize} from '../service/auth.js';

const router = express.Router();

// POST /assignments route to create an assignment
router.route('/v1/assignments').post(tokenize, assignController.createAssignment);

// POST /assignments/:id/submit route to submit an assignment
router.post('/v1/assignments/:id/submission', tokenize, assignController.submitAssignment);

// GET /assignments route to retrieve assignments created by the authenticated user
router.get('/v1/assignments', tokenize, assignController.getAssignmentsByUser);

// GET /assignments route to retrieve assignments created by the authenticated user
router.get('/v1/assignments/:id', tokenize, assignController.getAssignmentsById);

//DELETE/ assignments route to delete assignment created by auth user
router.delete('/v1/assignments/:id',tokenize, assignController.deleteAssignment);

// PUT /assignments/:assignmentId route to update an assignment
router.put('/v1/assignments/:id', tokenize, assignController.updateAssignment);

router.patch('/v1/assignments',assignController.handlePatch);

router.patch('/v1/assignments/:id',assignController.handlePatch);

router.get('/healthz', );

export default router;
