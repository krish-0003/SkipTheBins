// Author : Aabhaas Jain
const mongoose = require("mongoose");
// FAQ Model
const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,   
        required: true
    }
});
const faq = mongoose.model("faq", FaqSchema);

module.exports = faq;