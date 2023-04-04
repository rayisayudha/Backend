const userService = require("../../../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SIGNATURE_KEY = process.env.JWT_SIGNATURE_KEY;

function createToken(user) {
  const payload = { id: user.id, typeUser: user.typeUser, email: user.email };

  return jwt.sign(payload, JWT_SIGNATURE_KEY, {
    expiresIn: "1d",
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SIGNATURE_KEY);
  } catch (error) {
    throw new Error("Token expired");
  }
}

const register = async (req, res) => {
  try {
    // Cek Email apakah sudah digunakan
    const existedUser = await userService.findByEmail(req.body.email);
    if (existedUser) {
      return res.status(409).send({
        status: "FAIL",
        message: "Email telah digunakan",
      });
    }
    // Cek User apakah sudah digunakan
    const existedUname = await userService.findByUsername(req.body.username);
    if (existedUname) {
      return res.status(409).send({
        status: "FAIL",
        message: "Username telah digunakan",
      });
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Object Register Args
    const user = {
      typeUser: req.body.typeUser,
      username: req.body.username,

      email: req.body.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // CREATE User
    await userService.create(user);
    delete user.password;

    // Response
    res.status(201).json({
      status: "REGISTER_SUCCESS",
      user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Cek apakah username sudah terdaftar
    let user = await userService.findByUsername(username);
    if (!user) {
      return res.status(404).send({
        message: "Username salah",
      });
    }

    // Cek apakah password benar
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      return res.status(401).send({
        message: "Password salah",
      });
    }

    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    const token = createToken(user);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).send(error);
  }
};

const whoAmI = async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = verifyToken(token);

    const user = JSON.parse(JSON.stringify(await userService.findByEmail(tokenPayload.email)));
    delete user.password;

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({
      status: "FAILED",
      message: "Token expired",
    });
  }
};

const authorization = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = verifyToken(token);
    if (tokenPayload) {
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: "FAILED",
      message: "Token expired",
    });
  }
};

const updateInfoUser = async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = verifyToken(token);

    const user = JSON.parse(JSON.stringify(await userService.findByEmail(tokenPayload.email)));
    delete user.password;

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.typeUser = req.body.typeUser;
    user.updatedAt = new Date();

    await userService.update(user.id, user);
    delete user.password;

    res.status(200).json({
      status: "UPDATE_SUCCESS",
      data: JSON.parse(JSON.stringify(user)),
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  userService.delete(req.params.email);
  res.status(200).json({
    status: "DELETE_SUCCESS",
  });
};

module.exports = { login, register, whoAmI, updateInfoUser, authorization, deleteUser };
