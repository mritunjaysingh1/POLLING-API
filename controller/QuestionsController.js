const Question = require("../models/questions");
const Option = require("../models/options");

// create question
module.exports.create = async function (req, res) {
  await Question.create(req.body, function (err, ques) {
    if (err) {
      console.log("error in creating the question schema", err);
    }
    res.send(ques);
  });
};

//question details
module.exports.showDetails = async function (req, res) {
  const ques = await Question.findById(req.params.id).populate("options");

  if (ques) {
    res.send(ques);
  } else {
    res.send("id does not exits");
  }
};

// Delete question
module.exports.deleteQues = async function (req, res) {
  const ques = await Question.findById(req.params.id)
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  if (ques) {
    await Question.deleteOne(req.params.id)
      .clone()
      .catch(function (err) {
        console.log(err);
      });

    await Option.deleteMany({ question: req.params.id })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    res.send("ques deleted");
  } else {
    res.send("question does not exists");
  }
};
