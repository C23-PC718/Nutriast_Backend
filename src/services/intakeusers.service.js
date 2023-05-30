import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IntakeUsers } from "../models/intakeusers.model";
// import cloudinaryConfig from '../configs/cloudinary.config.js';

async function getMultiple(){
  
  try {

    const dbResult = await IntakeUsers.findAll();

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

async function createIntakeUsers(request){

  // Get request Body
  const { username, userId, healthStatus, fatIntake , caloryIntake , fiberIntake , carbohidrateIntake  } = request.body
    
    try {
      // Create new users record using the model
      const newIntakeUsers = await IntakeUsers.create({
        id: uuidv4(),
        userId,
        healthStatus,
        fatIntake, 
        caloryIntake, 
        fiberIntake, 
        carbohidrateIntake, 
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Return the newly in the response
      return {
        status: "success",
        code: 201,
        message: 'new user created successfully!',
        data: newIntakeUsers
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

export default {
  getMultiple,
  createIntakeUsers
}
