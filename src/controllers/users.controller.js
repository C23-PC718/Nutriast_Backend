import usersService from "../services/users.service.js";
import ResponseClass from "../models/response.model.js";

// get all users
const get = async (res, next) => {
  try {
    res.json(await usersService.getMultiple());
  } catch (err) {
      console.error(`Error while getting users`, err.message);
      next(err);
  }
}

// get user by id
const getbyid = async (req, res, next) => {
  try {
    const data = await usersService.getbyid(req);

    if (data.code === 200)
    {
      // send response
      return res.status(200).json(data);
    }
    // return Error
    return res.status(404).json(data);
  } catch (err) {
      console.error(`Error while getting user by id`, err.message);
      next(err);
  }
}

// register function
const register = async(req, res, next) =>  {
  try {
      res.json(await usersService.registerUsers(req.body));
  }catch(error){
      console.log(error);
      next(error);
  }
}

// login function
const login = async(req, res) => {
  try {
      var loginResult = await usersService.loginUsers(req.body);

      // if login result is success
      if (loginResult.code == 200) {
          var responseSuccess = new ResponseClass.SuccessResponse()

          // return response cookie with refresh_token
          res.cookie('refreshToken', loginResult.refresh_token, {
              httpOnly: true,
              // maxAge: 24 * 60 * 60 * 1000
          });
          
          // return response
          responseSuccess.message = "Login Success"
          responseSuccess.data = {
              object: "authentication_token",
              userId: loginResult.userId,
              email: req.body.email,
              roles: loginResult.roles,
              authentication_token: loginResult.accessToken
          }
  
          res.json(responseSuccess);
      }else{
          // return error response
          res.json(loginResult);
      }
      
  } catch (error) {
      console.log(error);
  }
}


const logout = async(req, res, next) => {
  try {
      var logoutResult = await usersService.logoutUsers(req.headers.cookie);

      if (logoutResult.code == 200) {
          res.clearCookie('refreshToken')
      }

      res.json(logoutResult)
  } catch (error) {
      console.log(error);
      next(error)
  }
}


export default {
  get,
  getbyid,
  login,
  register,
  logout
}