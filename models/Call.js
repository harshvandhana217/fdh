// models/Call.js
const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  call_id: {           // your device’s uniqueId from the app
    type: String,
    required: true,
    unique: true
  },
  sim: {
    type: String,
    enum: ["SIM 1", "SIM 2"],
    required: true
  },
  code: {
    type: String,
    required: true
  },
  updatedAt: Date
});

module.exports = mongoose.model('Call', callSchema);
