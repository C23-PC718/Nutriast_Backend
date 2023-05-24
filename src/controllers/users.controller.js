import usersService from "../services/users.service.js";

const get = async (req, res, next) => {
  try {
    res.json(await usersService.getMultiple());
  } catch (err) {
      console.error(`Error while getting users`, err.message);
      next(err);
  }
}


const create = async (req, res, next) => {
  try {
    // Create data to DB
    const data = await usersService.createUsers(req);
    // if Return "Created / 201"
    if (data.code === 201)
    {
      // send response
      return res.status(201).json(data);
    }
    // return Error
    return res.status(400).json(data);
  } catch (err) {
    console.error(`Error while creating users`, err.message);
    next(err);
  }
}

export default {
  get,
  create
}