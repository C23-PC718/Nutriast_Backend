import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Users } from "../models/users.model.js";
// import cloudinaryConfig from '../configs/cloudinary.config.js';

async function getMultiple(){
  try {
    const dbResult = await Users.findAll();
    // Return the mapped in the response
    return {
      status: "success", 
      code : 200,
      message : 'Fetching users successfully!',
      data : dbResult
    }
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error fetching users!'
    }
  }
}

async function createUsers(request){
  // Get request Body
  const { username, email, password, birthdate, gender, height, weight } = request.body
    try {
      // Create new users record using the model
      const newUsers = await Users.create({
        id: uuidv4(),
        username,
        email,
        password, 
        birthdate, 
        gender, 
        height, 
        weight,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      // Return the newly users in the response
      return {
        status: "success",
        code: 201,
        message: 'new user created successfully!',
        data: newUsers
      }
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error creating user!'
    }
  }
}

/*
async function registerUsers(request){

  var responseError = new ResponseClass.ErrorResponse()
  var responseSuccess = new ResponseClass.SuccessResponse()

  if(!request.email || !request.password || !request.email || !request.birthdate || !request.gender || !request.height || !request.weight)

  // Get request Body
  const { username, email, password, birthdate, gender, height, weight } = request.body
    try {
      // Create new users record using the model
      const newUsers = await Users.create({
        id: uuidv4(),
        username,
        email,
        password, 
        birthdate, 
        gender, 
        height, 
        weight,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      // Return the newly users in the response
      return {
        status: "success",
        code: 201,
        message: 'new user created successfully!',
        data: newUsers
      }
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error creating user!'
    }
  }
}
*/

export default {
  getMultiple,
  createUsers
}
