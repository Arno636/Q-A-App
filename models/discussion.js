var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var discussionSchema = new Schema({
    title: String,
    message: String,
    userId: Number
});

var Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;