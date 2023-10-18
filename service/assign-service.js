import Assignment from '../models/assign-model.js';
import assign from '../models/assign-model.js';

// Create a new assignment
export async function createAssignment(name, points, num_of_attempts, deadline, createdBy) {
    try {

        // Check if an assignment with the same name already exists
      const existingAssignment = await Assignment.findOne({ where: { name } });

      if (existingAssignment) {

        const error = new Error('Assignment with the same name already exists.');
            error.status = 400; // Set a custom status code for duplicate assignment
            throw error;
      }

      const assignment = await Assignment.create({
        name, points, num_of_attempts, deadline,createdBy
      });
  
      return assignment;
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  }
  // Get assignments created by a specific user
export async function getAssignmentsByUser() {
    try {
      const assignments = await Assignment.findAll();
  
      return assignments;
    } catch (error) {
      console.error('Error retrieving assignments:', error);
      throw error;
    }
  }

  export async function getAssignmentsById(assignmentId, userEmail){
    try { 

      const assignment = await Assignment.findOne({ where: { id : assignmentId } });
      const email = assignment.createdBy;
      console.log('EMAILLLLLLL - ', email, userEmail);

      if (!assignment) {
          throw new Error(`Assignment with ID '${assignmentId}' not found.`);
        }
        if (email === userEmail) {
          const assignment = await Assignment.findOne({ where: { id : assignmentId } });
          return assignment;

      }
  } catch (error) {
      throw new Error(error.message);
    }


  }

  export async function updateAssignmentById(assignmentId, updatedAssignmentData, userEmail){
    try { 

        const assignment = await Assignment.findOne({ where: { id : assignmentId } });
        const email = assignment.createdBy;

        console.log('EMAILLLLLLL - ', email, userEmail);

        if (!assignment) {
            throw new Error(`Assignment with ID '${assignmentId}' not found.`);
          }
          if (email === userEmail) {

          await Assignment.update(
            {
        name : updatedAssignmentData.name,
        points : updatedAssignmentData.points,
        num_of_attempts : updatedAssignmentData.num_of_attempts,
        deadline : updatedAssignmentData.deadline,
        assignment_updated : new Date().toISOString(),
            },
            { where: { id: assignmentId } }
    );
    return true;
        }
    } catch (error) {
        throw new Error(error.message);
      }

  }


  export async function deleteAssignmentById(assignmentId, userEmail) {
    
    try { 
        const assignment = await Assignment.findOne({ where: { id : assignmentId } });
        const email = assignment.createdBy;

        if (userEmail == assignment.createdBy) {

            await Assignment.destroy({ where: { id: assignmentId } });
            return true;
        }else {
            return false;
          }
        } catch (error) {
            throw new Error(error.message);
          }
        };   
        
        
        //for user
        

      /*   if (!assignment) {
            // If the assignment with the given name does not exist, you may handle this accordingly, e.g., return an error.
            throw new Error(`Assignment with name '${assignmentId}' not found.`);
        }
        
        // You can return a success message or other appropriate response
    return { message: `Assignment '${assignmentId}' deleted successfully.` };
  
      // Replace this with your actual implementation
    } catch (error) {
      console.error('Error deleting assignment by ID:', error);
      throw error;
    }
  } */



