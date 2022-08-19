const express = require("express");
const User = require("../model/User");
const Router = express.Router();
const jwt = require("jsonwebtoken");

/**
 * @openapi
 * '/users/getUser':
 *  post:
 *     tags:
 *     - Get User
 *     summary: Get User details
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *                properties:
 *                  emailId:
 *                    type: string
 *                  password:
 *                    type: string
 *
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  phoneNumber:
 *                    type: string
 *                  dateOfBirth:
 *                    type: string
 *                    format: date
 *                  password:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  role:
 *                    type: string
 *                  isLoggedIn:
 *                    type: boolean
 *                  age:
 *                    type: number
 *       403:
 *         description: Unauthorized/Forbidden
 *       404:
 *         description: Not Found
 */
Router.post("/getUser", async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.body != null && req.body != undefined) {
      const query = User.findOneAndUpdate(
        { emailId: req.body.emailId, password: req.body.password },
        { isLoggedIn: true },
        async (err, user) => {
          if (user == null || err) {
            res.json({ message: "User Not Found" });
          } else {
            user.isLoggedIn = true;
            const userToken = req.body;
            console.log("Mongo record Along with log in status" + user);
            jwt.sign(
              { userToken },
              "secretkey",
              { expiresIn: "300000s" },
              (err, token) => {
                res
                  .status(200)
                  .json({
                    emailId: req.body.emailId,
                    password: req.body.password,
                    role: user.role,
                    token: token,
                    username: user.firstName
                  });
              }
            );
          }
        }
      );
    }
  } catch (error) {
    next(error);
    res.status(404).json({ err: "User Not Found" });
  }
});

/**
 * @openapi
 * '/users/getAllUser':
 *  post:
 *     tags:
 *     - Get All User
 *     summary: Get All User details
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                type: object
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  phoneNumber:
 *                    type: string
 *                  dateOfBirth:
 *                    type: string
 *                    format: date
 *                  password:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  role:
 *                    type: string
 *                  isLoggedIn:
 *                    type: boolean
 *                  age:
 *                    type: number
 *       403:
 *         description: Unauthorized/Forbidden
 *       400:
 *         description: Bad request
 */
Router.post("/getAllUser", async (req, res, next) => {
  try {
    const allUser = [];
    const user = (await User.find()).forEach((user) => {
      allUser.push(user);
    });
    console.log(allUser);
    res.status(200).json({ users: allUser });
  } catch (error) {
    next(error);
    res.status(500).json({ err: error });
  }
});

/**
 * @openapi
 * '/users/addUser':
 *  post:
 *     tags:
 *     - Add User
 *     summary: New User details
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  phoneNumber:
 *                    type: string
 *                  dateOfBirth:
 *                    type: string
 *                    format: date
 *                  password:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  role:
 *                    type: string
 *                  isLoggedIn:
 *                    type: boolean
 *                  age:
 *                    type: number
 *
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       500:
 *         description: Internal server error
 */
Router.post("/addUser", async (req, res, next) => {
  try {
    if (req.body !== null && req.body !== undefined) {
      User.findOne({ emailId: req.body.emailId }, async (err, user) => {
        if (user !== null && user !== undefined && user !== []) {
          console.log("Already exists");
          res.send("User Already Exists");
        } else {
          const post = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            phoneNumber: req.body.phoneNumber,
            dateOfBirth: req.body.dateOfBirth,
            password: req.body.password,
            role: req.body.role,
            isLoggedIn: req.body.isLoggedIn,
            age: req.body.age
          });
          post.save();
          res.send({ message: "User Details updated sucessfully..." });
        }
      });
    }
  } catch (error) {
    res.sendStatus(409).json({ err: "User Already Exists" });
  }
});

/**
 * @openapi
 * '/users/logout':
 *  post:
 *     tags:
 *     - Logout User
 *     summary: Logout user session
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  phoneNumber:
 *                    type: string
 *                  dateOfBirth:
 *                    type: string
 *                    format: date
 *                  password:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  role:
 *                    type: string
 *                  isLoggedIn:
 *                    type: boolean
 *                  age:
 *                    type: number
 *
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       500:
 *         description: Internal server error
 */
Router.post("/logout", async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.body != null && req.body != undefined) {
      const query = User.findOneAndUpdate(
        { emailId: req.body.emailId },
        { isLoggedIn: false },
        async (err, user) => {
          if (err) {
            res.send(err);
          }
          const userToken = req.body;
          console.log("Mongo record Along with log in status" + user);
          res.send({ message: "Logged out successfully.." });
        }
      );
    }
  } catch (error) {
    res.status(404).json({ err: "User Not Found" });
  }
});

/**
 * @openapi
 * '/users/updateUser':
 *  post:
 *     tags:
 *     - Update User Password
 *     summary: Update pwd
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  phoneNumber:
 *                    type: string
 *                  dateOfBirth:
 *                    type: string
 *                    format: date
 *                  password:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  role:
 *                    type: string
 *                  isLoggedIn:
 *                    type: boolean
 *                  age:
 *                    type: number
 *
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       500:
 *         description: Internal server error
 */
Router.post("/updateUser", async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.body != null && req.body != undefined) {
      const query = User.findOneAndUpdate(
        { emailId: req.body.emailId },
        { password: req.body.password },
        async (err, user) => {
          if (err) {
            res.send(err);
          }
          const userToken = req.body;
          console.log("Mongo record Along with log in status" + user);
          res.send({ message: "Updated successfully.." });
        }
      );
    }
  } catch (error) {
    res.status(404).json({ err: "User Not Found" });
  }
});

module.exports = Router;
