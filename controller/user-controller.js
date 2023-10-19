//import { saveUser, getUser, updateDetails } from '../service/service.js';

export const bootstrapController = async (req, res) => {
    try {
  
      const users = await userService.bootstrap();
      res.status(200).json({"message":"Successful"});
    } catch (err) {
      res.status(500).json({ error: err.message});}
};





/* export const createUser = async (request, response) => {
  try {
    const newUser = request.body;
    const savedUser = await saveUser(newUser);
    setSuccessfulResponse(savedUser, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
}; */

// export const getUserById = async (request, response) => {
/*   try {
    const id = request.params.userId;
    const user = await getUser(id);

    if (user) {
      setSuccessfulResponse(user, response);
    } else {
      setErrorResponse({ message: 'User not found' }, response, 404);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

export const updateUser = async (request, response) => {
  try {
    const id = request.params.userId;
    const updatedUser = request.body;
    const user = await updateDetails(id, updatedUser);

    if (user) {
      setSuccessfulResponse(user, response);
    } else {
      setErrorResponse({ message: 'User not found' }, response, 404);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

const setSuccessfulResponse = (data, response) => {
  response.status(200).json(data);
};

const setErrorResponse = (error, response, status = 500) => {
  response.status(status).json({ error: { message: error.message || 'Internal server error' } });
};
 */