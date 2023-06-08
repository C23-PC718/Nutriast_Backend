import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../models/users.model.js";
import { IntakeUsers } from "../models/intakeusers.model.js";
import ResponseClass from "../models/response.model.js";
import fetch from "node-fetch";

async function getMultiple() {
  try {
    const dbResult = await Users.findAll({});
    // Return the mapped in the response
    return {
      status: "success",
      code: 200,
      message: "Fetching users successfully!",
      data: dbResult,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "Failed",
      code: 400,
      message: "Error fetching users!",
    };
  }
}

async function getbyid(request) {
  const { userId } = request.params;

  try {
    const dbResult = await Users.findOne({
      where: { id: userId },
      attributes: [
        "username",
        "email",
        "gender",
        "birthdate",
        "height",
        "weight",
        "fatneed",
        "proteinneed",
        "caloryneed",
        "fiberneed",
        "carbohidrateneed",
        "smoke",
        "alcho",
        "active",
        "cardiovascular",
      ],
    });

    const gender = dbResult.gender.charAt(0).toUpperCase() + dbResult.gender.slice(1);

    // Calculate age based on birthdate
    const birthdate = new Date(dbResult.birthdate);
    const ageDiffMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    // Return the mapped Users in the response
    return {
      status: "success",
      code: 200,
      message: "Fetching user successfully!",
      data: { ...dbResult.toJSON(), gender, age },
    };
  } catch (err) {
    console.error(err);
    return {
      status: "Failed",
      code: 400,
      message: "Error fetching user!",
    };
  }
}

async function predict(request) {
  const { userId } = request.params;
  const userdata = await Users.findOne({
    where: { id: userId },
  });

  if (
    request.body.cholesterol == null ||
    request.body.gluc == null ||
    request.body.ap_hi == null ||
    request.body.ap_lo == null ||
    request.body.smoke == null ||
    request.body.alco == null ||
    request.body.active == null
  ) {
    return {
      status: "Failed",
      code: 400,
      message: "Fill the blank!",
      data: {
        cholesterol: request.body.cholesterol,
        gluc: request.body.gluc,
        ap_hi: request.body.ap_hi,
        ap_lo: request.body.ap_lo,
        smoke: request.body.smoke,
        alco: request.body.alco,
        active: request.body.active,
      },
    };
  } else {
    const birthdate = new Date(userdata.birthdate);
    const ageDiffMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    let gender = 0;
    if (userdata.gender == "male") {
      gender = 1;
    } else if (userdata.gender == "female") {
      gender = 2;
    }
    const data = {
      age: age,
      gender: gender,
      height: userdata.height,
      weight: userdata.weight,
      ap_hi: request.body.ap_hi,
      ap_lo: request.body.ap_lo,
      cholesterol: request.body.cholesterol,
      gluc: request.body.gluc,
      smoke: request.body.smoke,
      alco: request.body.alco,
      active: request.body.active,
    };

    try {
      const response = await fetch("https://nutriastml-2qo27ggsha-et.a.run.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      let cardiovascular;
      if (jsonData.prediction == 1) {
        cardiovascular = "Aware";
      } else if (jsonData.prediction == 0) {
        cardiovascular = "Safe";
      }

      // update the database
      const updateValues = {
        cholesterol: request.body.cholesterol,
        glucose: request.body.gluc,
        cardiovascular: cardiovascular,
        smoke: request.body.smoke,
        alcho: request.body.alco,
        active: request.body.active,
      };
      await Users.update(updateValues, { where: { id: userId } });

      return {
        status: "success",
        code: 200,
        message: "predict Success",
        data: jsonData,
      };
    } catch (error) {
      console.error(error);
      return {
        status: "fail",
        code: 500,
        message: error,
      };
    }
  }
}

async function registerUsers(requestBody) {
  var responseError = new ResponseClass.ErrorResponse();
  var responseSuccess = new ResponseClass.SuccessResponse();
  const parsedBirthdate = new Date(requestBody.birthdate);
  if (
    !requestBody.email ||
    !requestBody.password ||
    !requestBody.username ||
    !parsedBirthdate ||
    !requestBody.gender ||
    !requestBody.height ||
    !requestBody.weight
  ) {
    responseError.message = "Please fill all field correctly!";
    return responseError;
  } else {
    // variable initialize
    let age = 0;
    let fatneed = 0.8 * requestBody.weight; // gram. 0,8 x Berat Badan (kg)
    let proteinneed = 0.8 * requestBody.weight; // gram. 0,8 x Berat Badan (kg)
    let caloryneed = 0.0; // kcal. BMR x Aktivitas Fisik
    let fiberneed = 30; // adult 25-30 gram
    let carbohidrateneed = 0.0; // 45-65% total calory intake.
    let bmr = 0.0;
    let lightphysical = 1.375; // pekerja kantor yang menggunakan komputer
    let mediumphysical = 1.55; // olahragawan biasa
    let hardphysical = 1.725; // atlet atau orang yang melakukan pekerjaan fisik berat

    // find age
    const birthdate = new Date(requestBody.birthdate);
    const ageDiffMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDiffMs);
    age = Math.abs(ageDate.getUTCFullYear() - 1970);
    // count BMR
    if (requestBody.gender == "male") {
      // BMR = 88,362 + (13,397 x berat badan dalam kg) + (4,799 x tinggi badan dalam cm) – (5,677 x usia dalam tahun)
      bmr =
        88.362 +
        13.397 * requestBody.weight +
        4.799 * requestBody.height -
        5.677 * age;
    } else if (requestBody.gender == "female") {
      // BMR = 447,593 + (9,247 x berat badan dalam kg) + (3,098 x tinggi badan dalam cm) – (4,330 x usia dalam tahun)
      bmr =
        447.593 +
        9.247 * requestBody.weight +
        3.098 * requestBody.height -
        4.33 * age;
    }
    caloryneed = bmr * mediumphysical;

    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailRegexp.test(requestBody.email) == false) {
      responseError.message = "Email is invalid";
      return responseError;
    } else {
      const emailuserRegistered = await Users.findOne({
        where: { email: requestBody.email },
      });

      if (emailuserRegistered == null) {
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(requestBody.password, salt);
        try {
          //add student to tabels user
          await Users.create({
            id: uuidv4(),
            name: requestBody.name,
            email: requestBody.email,
            password: hashPass,
            username: requestBody.username,
            birthdate: parsedBirthdate,
            gender: requestBody.gender,
            height: requestBody.height,
            weight: requestBody.weight,
            fatneed: fatneed,
            proteinneed: proteinneed,
            caloryneed: caloryneed,
            fiberneed: fiberneed,
            carbohidrateneed: carbohidrateneed,
          });

          //return response success
          responseSuccess.message = "Register Success";
          responseSuccess.data = {
            name: requestBody.name,
            email: requestBody.email,
            password: requestBody.password,
            username: requestBody.username,
            birthdate: parsedBirthdate,
            gender: requestBody.gender,
            height: requestBody.height,
            weight: requestBody.weight,
            fatneed: fatneed,
            proteinneed: proteinneed,
            caloryneed: caloryneed,
            fiberneed: fiberneed,
            carbohidrateneed: carbohidrateneed,
          };
          return responseSuccess;
        } catch (error) {
          console.log(error);

          //return server error response
          responseError.code = 500;
          responseError.message = error;

          return responseError;
        }
      } else {
        responseError.message = "Email has been registered";
        return responseError;
      }
    }
  }
}

async function loginUsers(requestbody) {
  var responseError = new ResponseClass.ErrorResponse();
  if (!requestbody.email || !requestbody.password) {
    responseError.message = "Email or Password missing!";
    return responseError;
  } else {
    //find email from request body in database
    const userRegistered = await Users.findOne({
      where: { email: requestbody.email },
    });
    if (userRegistered == null) {
      responseError.message = "Email not found!";
      return responseError;
    } else {
      //compare request body password with password in database
      if (userRegistered !== null) {
        const matchPassword = await bcrypt.compare(
          requestbody.password,
          userRegistered.password
        );
        if (!matchPassword) {
          responseError.message = "Wrong Password!";
          return responseError;
        } else {
          const resultToken = generateToken(userRegistered);
          try {
            //update refresh token to database
            await Users.update(
              { refresh_token: resultToken.refreshToken },
              {
                where: {
                  id: userRegistered.id,
                },
              }
            );

            //return login result response
            const loginResult = {
              code: 200,
              userId: userRegistered.id,
              refresh_token: resultToken.refreshToken,
              accessToken: resultToken.accessToken,
            };

            return loginResult;
          } catch (error) {
            console.log(error);

            responseError.code = 500;
            responseError.message = error;

            return responseError;
          }
        }
      }
    }
  }
}

async function logoutUsers(request) {
  var responseError = new ResponseClass.ErrorResponse();
  var responseSuccess = new ResponseClass.SuccessWithNoDataResponse();

  if (!request) {
    responseSuccess.code = 204;
    responseSuccess.message = "The Request did not return any content";
    return responseSuccess;
  }

  try {
    const requestCookie = request.split("=");
    const refreshToken = requestCookie[1];

    const loginUser = await Users.findOne({
      where: { refresh_token: refreshToken },
    });

    if (loginUser !== null) {
      await Users.update(
        { refresh_token: null },
        { where: { id: loginUser.id } }
      );
    } else {
      responseSuccess.code = 204;
      responseSuccess.message = "The Request did not return any content";
      return responseSuccess;
    }

    responseSuccess.code = 200;
    responseSuccess.message = "You've Been Logged Out";
    return responseSuccess;
  } catch (error) {
    console.log(error);
    responseError.code = 500;
    responseError.message = error;
    return responseError;
  }
}

function generateToken(userRegistered) {
  const userId = userRegistered.id;
  const name = userRegistered.name;
  const email = userRegistered.email;
  //create access token for authorization using jwt
  const accessToken = jwt.sign(
    { userId, name, email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      // expiresIn: "120s",
      expiresIn: "120d",
    }
  );

  //create refresh token using jwt
  const refreshToken = jwt.sign(
    { userId, name, email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "360d",
    }
  );

  const token = {
    refreshToken: refreshToken,
    accessToken: accessToken,
  };

  return token;
}

export default {
  getMultiple,
  getbyid,
  predict,
  registerUsers,
  loginUsers,
  logoutUsers,
};
