
import express from "express";
import * as userController from '../controller/user-controller.js';


const app = express();

const router = express.Router();

router.route('/get')
  //.post(userController.createUser)
  .get(userController.bootstrapController);




/* // Route the parameterized methods with controller logic
router.route('/:userId')
  .get(userController.getUserById)
  //.delete(userController.deleteUser)
  .patch(userController.updateUser)
  .put(userController.updateUser); */

export default router;