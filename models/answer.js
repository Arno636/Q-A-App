var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var answerSchema = new Schema({
    answer: String,
    questionId: String,
    discussionId: String
});

var Answer = mongoose.model('Answer', questionSchema);

module.exports = Answer;