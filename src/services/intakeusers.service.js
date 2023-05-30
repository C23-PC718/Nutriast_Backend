import { IntakeUsers } from "../models/intakeusers.model.js";
import { v4 as uuidv4 } from "uuid";

async function getMultiple() {
  try {
    const dbResult = await IntakeUsers.findAll({
      // where: { userId: userid },
    });
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

async function createIntakeUsers(requestBody) {
  try {
    const intakeUserId = uuidv4();
    await IntakeUsers.create({
      id: intakeUserId,
      userid: requestBody.userid,
      fatintake: requestBody.fatintake,
      caloryintake: requestBody.caloryintake,
      fiberintake: requestBody.fiberintake,
      carbohidrateintake: requestBody.carbohidrateintake,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      status: "success",
      code: 200,
      message: "Creating intake users successfully!",
      data: {
        id: intakeUserId,
        userid: requestBody.userid,
        fatintake: requestBody.fatintake,
        caloryintake: requestBody.caloryintake,
        fiberintake: requestBody.fiberintake,
        carbohidrateintake: requestBody.carbohidrateintake,
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
  createIntakeUsers,
};
