const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  roll: {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    lowercase: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const formModel = mongoose.model("event", formSchema, "dataSheet");

module.exports = formModel;
