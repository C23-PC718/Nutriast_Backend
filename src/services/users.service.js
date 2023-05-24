import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Users } from "../models/users.model.js";
// import cloudinaryConfig from '../configs/cloudinary.config.js';

async function getMultiple(){
  
  try {

    const dbResult = await Users.findAll();

    // Return the mapped galleries in the response
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

  // const imageUrl = request.file.path
  
  // Error message
  // if (!title || !description) {
  //   let message = ""
    
  //     if (!title ) {
  //       message += ", title"
  //     }
      
  //     // if (!imageUrl) {

  //     //   message += ", imageUrl"
  //     // }

  //     if (!description) {
  //       message += ", description"
  //     }
    
  //     return { 
  //       status: 'Failed',
  //       code: 400,
  //       message: `Failed creating gallery${message} is empty!`
  //     }
  //   }
    
    try {
      
      
      // let imageUrl = null
      // let filename = null

      // if (request.file) {
      //   imageUrl = request.file.path
      //   filename = request.file.filename
      //   // console.log(request.file)
      // }

      // set default imageUrl if empty
      // const defaultImageUrl = 'https://res.cloudinary.com/dp7yp5kgv/image/upload/v1684334844/galleries/map_uqx7qx.jpg';
      // const finalImageUrl = imageUrl || defaultImageUrl;
      
      // Create new gallery record using the Galleries model
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

      // Return the newly created gallery in the response
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

export default {
  getMultiple,
  createUsers
}


// {
//   "username":"test",
//   "email":"test@gmail.com",
//   "password":"test",
//   "birthdate":"2002-05-05",
//   "gender":"male",
//   "height":1.0,
//   "weight":1.0,
// }