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
  const { userId } = request.params
  try {
    const dbResult = await Users.findOne({ 
      where: { userid: userId }, 
      order: [['createdAt', 'ASC']],
      attributes: ['healthstatus', 'feedback']
    });
    return {
      status: "success",
      code: 200,
      message: "Fetching intake users id successfully!",
      data: dbResult,
    };
  }catch (error) {
    console.error(err);
    return {
      status: "Failed",
      code: 400,
      message: "Error fetching intake user BY ID",
    };
  }
}

async function createIntakeUsers(request) {
  const { userId } = request.params
  // const user = await Users.findOne({
  //   where: { id: userId },
  // });
  let status = "none"
  let feedback = "none"
  try {
    const intakeUserId = uuidv4();
    await IntakeUsers.create({
      id: intakeUserId,
      userid: userId,
      fatintake: request.body.fatintake,
      caloryintake: request.body.caloryintake,
      fiberintake: request.body.fiberintake,
      carbohidrateintake: request.body.carbohidrateintake,
      healthstatus:status,
      feedback:feedback,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      status: "success",
      code: 200,
      message: "Creating intake users successfully!",
      data: {
        id: intakeUserId,
        userid: userId,
        fatintake: request.body.fatintake,
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
    };
  }
}

export default {
  getMultiple,
  getById,
  createIntakeUsers,
};
