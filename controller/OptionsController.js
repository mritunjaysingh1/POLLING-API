const Option = require("../models/options");
const Question = require("../models/questions");

// // Create options using id given in question
module.exports.create = async function (req, res) {
  const opt = await Option.create({
    option: req.body.content,
    question: req.params.id,
    //
  });
  //  Adding the vote to option of the id
  const updateOpt = await Option.findByIdAndUpdate(opt._id, {
    add_vote: `http://localhost:3000/api/v1/options/${opt._id}/add_vote`,
  });
  updateOpt.save();
  const ques = await Question.findById(req.params.id);
  if (ques) {
    ques.options.push(updateOpt);
    ques.save();

    res.send(ques);
  } else {
    res.send("question does not exists");
  }
};

// Votes will be added to the particular option of the question
module.exports.add_vote = async function (req, res) {
  const opt = await Option.findByIdAndUpdate(req.params.id, {
    $inc: { vote: 1 },
  });
  if (opt) {
    await opt.save();
    console.log(opt);
    res.send(opt);
  } else {
    res.send("option does not exits");
  }
};

//  delete using id

module.exports.delete = async function (req, res) {
  const opt = await Option.findById(req.params.id);
  if (opt) {
    const quesId = opt.question;

    const ques = await Question.findByIdAndUpdate(quesId, {
      $pull: { options: req.params.id },
    });

    await Option.findByIdAndDelete(req.params.id);

    res.send("option deleted");
  } else {
    res.send("id not exists");
  }
};
