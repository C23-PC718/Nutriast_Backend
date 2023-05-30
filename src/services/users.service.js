import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../models/users.model.js";

async function getMultiple() {
  try {
    const dbResult = await Users.findAll();
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

async function registerUsers(request) {
  var responseError = new ResponseClass.ErrorResponse();
  var responseSuccess = new ResponseClass.SuccessResponse();

  if (
    !request.email ||
    !request.password ||
    !request.username ||
    !request.birthdate ||
    !request.gender ||
    !request.height ||
    !request.weight ||
    !request.cholesterol ||
    !request.glucose
  ) {
    responseError.message = "Please fill all field correctly!";
    return responseError;
  } else {
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
            birthDate: requestBody.birthdate,
            gender: requestBody.gender,
            height: requestBody.height,
            weight: requestBody.weight,
            cholesterol: requestBody.cholesterol,
            glucose: requestBody.glucose,
          });

          //return response success
          responseSuccess.message = "Register Success";
          responseSuccess.data = {
            name: requestBody.name,
            email: requestBody.email,
            password: requestBody.password,
            username: requestBody.username,
            birthdate: requestBody.birthdate,
            gender: requestBody.gender,
            height: requestBody.height,
            weight: requestBody.weight,
            cholesterol: requestBody.cholesterol,
            glucose: requestBody.glucose,
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
    responseError.message = "Email or Password missing";
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
        { where: { id: loginStudent.id } }
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
      expiresIn: "120s",
    }
  );

  //create refresh token using jwt
  const refreshToken = jwt.sign(
    { userId, name, email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
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
  registerUsers,
  loginUsers,
  logoutUsers,
};
