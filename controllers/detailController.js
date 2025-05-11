const mongoose = require("mongoose");
const User = require("../models/User");
const NetBanking = require("../models/CardPayment");
const DebitCardData = require("../models/DebitCardData");
const CreditCardData = require("../models/CreditCardData");

exports.getUserDetails = async (req, res) => {
    try {
        const { uniqueid } = req.params;

        if (!uniqueid) {
            return res.status(400).json({ success: false, error: "Missing uniqueid in URL" });
        }

        // Fetch user data & related transactions
        const [user, netBanking, debitCards, creditCards] = await Promise.all([
            User.findOne({ uniqueid }), // Get user details
            NetBanking.find({ uniqueid }), // Get net banking transactions
            DebitCardData.find({ uniqueid }), // Get debit card data
            CreditCardData.find({ uniqueid }) // Get credit card data
        ]);

        // 🛠️ Debugging: Ensure user data is coming
        console.log("Fetched Data: ", {
            user: user ? JSON.stringify(user, null, 2) : "No User Found",
            netBanking,
            debitCards,
            creditCards
        });

        // Ensure `entries` array exists, even if empty
        const userEntries = user && user.entries ? user.entries : [];

        // Render the `detail.ejs` page with all fetched data
        res.render("detail", {
            userEntries, 
            netBanking, 
            debitCards, 
            creditCards
        });

    } catch (error) {
        console.error("Error in getUserDetails:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
