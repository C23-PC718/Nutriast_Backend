import { IntakeUsers } from "../models/intakeusers.model.js";
import { Users } from "../models/users.model.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from 'sequelize';
import dataMakanan from '../Data/dataMakanan.json'assert {type: 'json'};

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

async function getHistory(request){
  const { intakeUserId } = request.params;
  
  try{
    const dbResult = await IntakeUsers.findAll({
      where: {
        userid: intakeUserId,
      },
      // attributes: ["createdAt"],
      order: [['createdAt', 'DESC']],
    });
    return{
      status: "success",
      code: 200,
      message: "Fetching intake users id successfully!",
      data: dbResult,
    }
  }catch(error){
    return {
      status: "Failed",
      code: 400,
      message: "Error fetching intake user BY ID",
    };
  }
}

async function getById(request) {
  const { intakeUserId } = request.params;
  // console.log(intakeUserId)
  // cek apakah hari ini sudah checkout?
  const today = new Date(); // Get the current date and time
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
  const check = await IntakeUsers.findOne({
    where: {
      userid: intakeUserId,
      createdAt: {
        [Op.gte]: today,
      },
      
      // order: [["createdAt", "DESC"]],
    },attributes: ["healthstatus", "feedback"],
  });
  // console.log(check)
  try {
    if(check == null){
      return {
        status: "success",
        code: 200,
        message: "Fetching intake users id history successfully!",
        data: {
          "healthstatus":"UNKNOWN", "feedback":"You haven't fill intake form for today."
        },
      };
    }else{
      return {
        status: "success",
        code: 200,
        message: "Fetching intake users id successfully!",
        data: check,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Failed",
      code: 400,
      message: "Error fetching intake user hstory BY ID",
    };
  }
}

async function createIntakeUsers(request) {

  const { userId } = request.params;
  const check = await IntakeUsers.findOne({
    where: {
      userid: userId,
      createdAt: {
        [Op.gte]: today,
      },
    },
  });
  if(check == null){
    return{
      status: "false",
      code: 204,
      message: "You have filled this form today!",
    };
  }else{
    let totalFat = 0
    let totalProtein = 0
    let totalCalory = 0
    let totalFiber = 0
    let totalCarbohidrate = 0
    let inputData = request.body

    for (let food in inputData) {
      let foodData = inputData[food];
      let jsonFileData = dataMakanan[food];
    
      totalFat += foodData * jsonFileData.fat;
      totalProtein += foodData * jsonFileData.protein;
      totalCalory += foodData * jsonFileData.calory;
      totalFiber += foodData * jsonFileData.fiber;
      totalCarbohidrate += foodData * jsonFileData.carbohidrate;
    }

    const userdata = await Users.findOne({
      where: { id: userId },
    });
    let lackof = [];
    if (totalFat < userdata.fatneed) {
      lackof.push("fat");
    }
    if (totalProtein < userdata.proteinneed) {
      lackof.push("protein");
    }
    if (totalCalory < userdata.caloryneed) {
      lackof.push("calory");
    }
    if (totalFiber < userdata.fiberneed) {
      lackof.push("fiber");
    }
    let carbohidrateneed = (65 / 100) * request.body.caloryintake;
    if (totalCarbohidrate < carbohidrateneed) {
      lackof.push("carbohidrate");
    }
    let feedback = "none";
    let status = "none";
    if (lackof.length === 0) {
      feedback =
        "Great job on meeting your daily nutrition needs! Keep up the good work and continue to prioritize a balanced and healthy diet. Remember to listen to your body and make adjustments as necessary to maintain optimal health.";
      status = "EXCELENT";
    } else {
      feedback = `You are not meeting your daily nutrition needs for ${lackof.join(
        ", "
      )}. Consider adjusting your diet to include more of these nutrients.`;
      status = "POOR";
    }

    const createdAtValue = new Date();
    const updatedAtValue = new Date();
    createdAtValue.setHours(createdAtValue.getHours() + 7);
    updatedAtValue.setHours(updatedAtValue.getHours() + 7);
    try {
      const intakeUserId = uuidv4();
      await IntakeUsers.create({
        id: intakeUserId,
        userid: userId,
        fatintake: totalFat,
        proteinintake: totalProtein,
        caloryintake: totalCalory,
        fiberintake: totalFiber,
        carbohidrateintake: totalCarbohidrate,
        healthstatus: status,
        feedback: feedback,
        createdAt: createdAtValue,
        updatedAt: updatedAtValue,
      });
      return {
        status: "success",
        code: 200,
        message: "Creating intake users successfully!",
        data: {
          id: intakeUserId,
          userid: userId,
          fatintake: totalFat,
          proteinintake: totalProtein,
          caloryintake: totalCalory,
          fiberintake: totalFiber,
          carbohidrateintake: totalCarbohidrate,
          healthstatus: status,
          feedback: feedback,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: "Failed",
        code: 400,
        message: "Error creating intake users!",
        userid: userId,
        fatintake: totalFat,
        proteinintake: totalProtein,
        caloryintake: totalCalory,
        fiberintake: totalFiber,
        carbohidrateintake: totalCarbohidrate,
        healthstatus: status,
        feedback: feedback,
      };
    }
  }

  
}

export default {
  getMultiple,
  getById,
  getHistory,
  createIntakeUsers,
};
