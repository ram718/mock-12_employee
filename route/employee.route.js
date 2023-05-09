const express = require("express");
const empRouter = express.Router();
const { EmpModel } = require("../model/employee.model");

// Post API
empRouter.post("", async (req, res) => {
  const payload = req.body;
  try {
    const employee = new EmpModel(payload);
    await employee.save();
    res.status(200).send({ msg: "Employee added" });
  } catch (err) {
    res.status(400).send({ msg: "Bad Request" });
  }
});

// Get API
empRouter.get("", async (req, res) => {
  const page = +req.query.page;
  const skip_pages = (page - 1) * 5 || 0;
  const { filter, sort, q } = req.query;
  try {
    if (filter) {
      const data = await EmpModel.find({ department: filter })
        .skip(skip_pages)
        .limit(5);
      res.status(200).send(data);
    } else if (sort) {
      if (sort === "asc") {
        const data = await EmpModel.find()
          .sort({ salary: 1 })
          .skip(skip_pages)
          .limit(5);
        res.status(200).send(data);
      } else {
        const data = await EmpModel.find()
          .sort({ salary: -1 })
          .skip(skip_pages)
          .limit(5);
        res.status(200).send(data);
      }
    } else if (q) {
      const data = await EmpModel.find({ first_name: q })
        .skip(skip_pages)
        .limit(5);
      res.status(200).send(data);
    } else {
      const data = await EmpModel.find().skip(skip_pages).limit(5);
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).send({ msg: "Bad Request" });
  }
});

// Patch API
empRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    await EmpModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "Employee details are updated" });
  } catch (err) {
    res.status(400).send({ msg: "Bad Request" });
  }
});

// Delete API
empRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await EmpModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).send({ msg: "Bad Request" });
  }
});

module.exports = { empRouter };
