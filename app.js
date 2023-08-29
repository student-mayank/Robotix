const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
const app = express();
const env = require("dotenv");
const multer = require("multer");
const Model = require("./FormSchema.js");
env.config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.DBURL, { dbName: "robo" });

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("connected to database!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${process.env.PORT}`, 3000);
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("<h1>Robotix</h1>");
});
app.get("/data", (req, res) => {
  Model.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

app.post("/register", upload.single("image"), async (req, res) => {
  var obj = {
    member1: {
      name: req.body.m1Name,
      roll: req.body.m1Roll,
      phoneNo: req.body.m1PhoneNo,
      branch: req.body.m1Branch,
    },
    member2: {
      name: req.body.m2Name,
      branch: req.body.m2Branch,
    },
    member3: {
      name: req.body.m3Name,
      branch: req.body.m3Branch,
    },
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  const student = new Model(obj);
  try {
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});
