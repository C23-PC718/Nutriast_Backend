import { IntakeUsers } from "../models/intakeusers.model.js";
import { Users } from "../models/users.model.js";
import { v4 as uuidv4 } from "uuid";

async function getMultiple() {
  try {
    const dbResult = await IntakeUsers.findAll({});
    // Return the mapped in the response
    return {
      status: "success",
      code: 200,
      message: "Fetching intake users successfully!",
      data: dbResult,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "Failed",
      code: 400,
      message: "Error fetching intake users!",
    };
  }
}

async function getById(request) {
  const { intakeUserId } = request.params;
  try {
    const dbResult = await IntakeUsers.findOne({ 
      where: { userid: intakeUserId }, 
      order: [['createdAt', 'DESC']],
      attributes: ['healthstatus', 'feedback']
    });
    return {
      status: "success",
      code: 200,
      message: "Fetching intake users id successfully!",
      data: dbResult,
    };
  }catch (error) {
    console.error(error);
    return {
      status: "Failed",
      code: 400,
      message: "Error fetching intake user BY ID",
    };
  }
}

async function createIntakeUsers(request) {
  const { userId } = request.params;
  const userdata = await Users.findOne({ 
    where: { id: userId }, 
  });
  let lackof = [];
  if (request.body.fatintake < userdata.fatneed){
    lackof.push('fat');
  }
  if (request.body.proteinintake < userdata.proteinneed){
    lackof.push('protein');
  }
  if (request.body.caloryintake < userdata.caloryneed){
    lackof.push('calory');
  }
  if (request.body.fiberintake < userdata.fiberneed){
    lackof.push('fiber');
  }
  let carbohidrateneed = 50/100 * request.body.caloryintake
  if (request.body.carbohidrateintake < carbohidrateneed){
    lackof.push('carbohidrate');
  }
  let feedback = "none"
  let status = "none"
  if (lackof.length === 0) {
    feedback = "Great job on meeting your daily nutrition needs! Keep up the good work and continue to prioritize a balanced and healthy diet. Remember to listen to your body and make adjustments as necessary to maintain optimal health."
    status = "EXCELENT";
  }else {
    feedback = `You are not meeting your daily nutrition needs for ${lackof.join(", ")}. Consider adjusting your diet to include more of these nutrients.`;
    status = "BE AWARE";
  }
  
  try {
    const intakeUserId = uuidv4();
    await IntakeUsers.create({
      id: intakeUserId,
      userid: userId,
      fatintake: request.body.fatintake,
      proteinintake: request.body.proteinintake,
      caloryintake: request.body.caloryintake,
      fiberintake: request.body.fiberintake,
      carbohidrateintake: request.body.carbohidrateintake,
      healthstatus:status,
      feedback:feedback,
    });
    return {
      status: "success",
      code: 200,
      message: "Creating intake users successfully!",
      data: {
        id: intakeUserId,
        userid: userId,
        fatintake: request.body.fatintake,
        proteinintake: request.body.proteinintake,
        caloryintake: request.body.caloryintake,
        fiberintake: request.body.fiberintake,
        carbohidrateintake: request.body.carbohidrateintake,
        healthstatus:status,
        feedback:feedback,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: "Failed",
      code: 400,
      message: "Error creating intake users!",
        userid: userId,
        fatintake: request.body.fatintake,
        proteinintake: request.body.proteinintake,
        caloryintake: request.body.caloryintake,
        fiberintake: request.body.fiberintake,
        carbohidrateintake: request.body.carbohidrateintake,
        healthstatus:status,
        feedback:feedback,
    };
  }
}


export default {
  getMultiple,
  getById,
  createIntakeUsers,
};