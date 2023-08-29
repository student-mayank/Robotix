const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  member1: {
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

    phoneNo: {
      type: String,
      required: true,
    },
  },
  member2: {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },

    branch: {
      type: String,
      lowercase: true,
    },
  },

  member3: {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    branch: {
      type: String,
      lowercase: true,
    },
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const formModel = mongoose.model("event", formSchema, "dataSheet");

module.exports = formModel;
