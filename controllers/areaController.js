// Author: Prashit Patel (B00896717)

const areas = require("../models/areas");

const getArea = async (req, res) => {
  areas
    .find()
    .exec()
    .then((result) => {
      try {
        if (!result || result.length === 0) {
          res.statusCode = 200;
          res.send({ message: "Areas not found!" });
        } else {
          res.statusCode = 200;
          res.send({
            message: "Areas retrieved",
            success: true,
            areas: result,
          });
        }
      } catch (err) {
        res.statusCode = 500;
        res.send({ message: "Areas retrival failed!" });
      }
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send({ message: "Something went wrong!" });
    });
};

const createArea = async (req, res) => {
  try {
    const area = new areas({
      _id: mongoose.Types.ObjectId(),
      name: req.body.area,
    });

    area
      .save()
      .then((result) => {
        res.statusCode = 200;
        res.send({ message: "Area successfully added", success: true });
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.send({ message: "Area addition failed!" });
      });
  } catch (err) {
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
};

module.exports = {
    getArea,
    createArea
}
