const express = require("express");
const Company = require("../model/Company");
const Router = express.Router();
//const producer = require('../kafka/producer');

Router.post("/getCompanyStocks", async (req, res, next) => {
  console.log(req.body);
  try {
    const companies = [];
    if (req.body != null && req.body != undefined) {
      const query = (
        await Company.find({ companyCode: req.body.companyCode }, null, {
          sort: { date: -1 },
        })
      ).forEach((company) => {
        companies.push(company);
      });
      console.log(companies);
      res.status(200).json({ companies: companies });
    }
  } catch (error) {
    next(error);
    res.status(500).json({ err: error });
  }
});

/**
 * @openapi
 * '/stocks/getAllCompanyStocks':
 *  post:
 *     tags:
 *     - Get all Companies
 *     summary: All company details
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
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  companyCode:
 *                    type: string
 *                  companyName:
 *                    type: string
 *                  date:
 *                    type: string
 *                    format: date-time
 *                  logo:
 *                    type: string
 *                  stockPrice:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  companyCEO:
 *                    type: string
 *                  companyWebSite:
 *                    type: string
 *                  stockExchange:
 *                    type: string
 *       403:
 *         description: Unauthorized/Forbidden
 *       400:
 *         description: Bad request
 */
Router.post("/getAllCompanyStocks", async (req, res, next) => {
  console.log(req.body);
  try {
    const companies = [];
    const query = (
      await Company.find({}, null, { sort: { date: -1 } })
    ).forEach((company) => {
      companies.push(company);
    });
    console.log(companies);
    res.status(200).json({ companies: companies });
  } catch (error) {
    next(error);
    res.status(500).json({ err: error });
  }
});

/**
 * @openapi
 * '/stocks/addCompany':
 *  post:
 *     tags:
 *     - Add Company
 *     summary: Add/Edit Company
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  companyCode:
 *                    type: string
 *                  companyName:
 *                    type: string
 *                  date:
 *                    type: string
 *                    format: date-time
 *                  logo:
 *                    type: string
 *                  stockPrice:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  companyCEO:
 *                    type: string
 *                  companyWebSite:
 *                    type: string
 *                  stockExchange:
 *                    type: string
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
 *                  companyCode:
 *                    type: string
 *                  companyName:
 *                    type: string
 *                  date:
 *                    type: string
 *                    format: date-time
 *                  logo:
 *                    type: string
 *                  stockPrice:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  companyCEO:
 *                    type: string
 *                  companyWebSite:
 *                    type: string
 *                  stockExchange:
 *                    type: string
 *       403
 *         description: Unauthorized/ForBidden
 *       500:
 *         description: Internal Server Error
 */
Router.post("/addCompany", async (req, res, next) => {
  try {
    if (req.body != null && req.body != undefined) {
      console.log("Add Company Stocks " + JSON.stringify(req.body));
      /*To post message to kafka
             producer(req.body.stockPrice).catch((err) => {
                 console.error("error in producer: ", err)
             }) */
      const post = new Company({
        companyCode: req.body.companyCode,
        companyName: req.body.companyName,
        date:
          req.body.date == null ||
          req.body.date == "" ||
          req.body.date == undefined
            ? Date.now()
            : req.body.date,
        stockPrice: req.body.stockPrice,
        logo: req.body.logo,
        emailId: req.body.emailId,
        companyCEO: req.body.companyCEO,
        stockExchange: req.body.stockExchange,
        companyWebSite: req.body.companyWebSite
      });
      post.save();
      res.send({
        message: "Post stocks of the company",
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * '/stocks/deleteCompany':
 *  delete:
 *     tags:
 *     - Delete Company
 *     summary: Delete Company
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  companyCode:
 *                    type: string
 *                  companyName:
 *                    type: string
 *                  date:
 *                    type: string
 *                    format: date-time
 *                  logo:
 *                    type: string
 *                  stockPrice:
 *                    type: string
 *                  emailId:
 *                    type: string
 *                  companyCEO:
 *                    type: string
 *                  companyWebSite:
 *                    type: string
 *                  stockExchange:
 *                    type: string
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
 *                  message:
 *                    type: string
 *       403
 *         description: Unauthorized/ForBidden
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found
 */
Router.delete("/deleteCompany", async (req, res, next) => {
  try {
    if (req.body != null && req.body != undefined) {
      await Company.findOneAndDelete(
        { companyCode: req.body.companyCode },
        function (err) {
          if (err) console.log(err);
          console.log("Deleted Successfully");
        }
      );
      res.status(200).json({ message: "Deleted Successfully..." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = Router;
