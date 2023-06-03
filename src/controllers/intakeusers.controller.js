import intakeUsersService from "../services/intakeusers.service.js";

const get = async (req, res, next) => {
  try {
    res.json(await intakeUsersService.getMultiple());
  } catch (err) {
      console.error(`Error while getting intake user`, err.message);
      next(err);
  }
}

const getbyid = async (req, res, next) => {
  try {
    res.json(await intakeUsersService.getById(req));
  } catch (err) {
      console.error(`Error while getting intake user by id`, err.message);
      next(err);
  }
}

const create = async (req, res, next) => {
  try {
    // Create data to DB
    const data = await intakeUsersService.createIntakeUsers(req.body);
    // if Return "Created / 201"
    if (data.code === 201)
    {
      // send response
      return res.status(201).json(data);
    }
    // return Error
    return res.status(400).json(data);
  } catch (err) {
    console.error(`Error while creating intake users`, err.message);
    next(err);
  }
}

export default {
  get,
  getbyid,
  create
}