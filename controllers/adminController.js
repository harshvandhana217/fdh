const Admin = require('../models/Admin');

exports.getAdminNumber = async (req, res) => {
  try {
    let admin = await Admin.findOne();
    // If there's no Admin document yet, create one with a null phoneNumber
    if (!admin) {
      admin = await Admin.create({ phoneNumber: null });
    }

    // Always return success: true, with data set (possibly null)
    return res.status(200).json({
      success: true,
      data: admin.phoneNumber
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error fetching admin phone number",
      error: err.message
    });
  }
};

exports.updateAdminNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (phoneNumber === 'null') {
      await Admin.updateOne({}, { phoneNumber: null });
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).json({
          success: false,
          message: "Invalid phone number format"
        });
      }
      let admin = await Admin.findOne();
      if (!admin) {
        admin = new Admin({ phoneNumber });
      } else {
        admin.phoneNumber = phoneNumber;
      }
      await admin.save();
    }

    // Return JSON to the client
    return res.status(200).json({
      success: true,
      data: phoneNumber === 'null' ? null : phoneNumber
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error updating admin phone number",
      error: err.message
    });
  }
};
