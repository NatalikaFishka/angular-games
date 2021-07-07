const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    owner: { type: Types.ObjectId, ref: "User" },
    cardsCategory: { type: String },
    score: { type: Number },
    cardsInGame: { type: Number },
    matchesPerCard: { type: Number },
    data: { type: Date, default: Date.now }
});

module.exports = model("Result", schema)