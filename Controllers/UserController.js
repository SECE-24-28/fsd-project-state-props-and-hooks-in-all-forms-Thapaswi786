const user = require("../Models/UserModel");

const signupUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password } = req.body;

        const NewUser = new User({
            firstname,
            lastname,
            email,
            phone,
            password,
        });
        const savedUser = await NewUser.save();
        res.status(201).json({
            message: " User created successfully",
            data:savedUser,
        });
    }

    catch(error) {
        res.status(404).json({
            message: "Error registering user",
            error: error.message,
        });
    }
};

module.exports = {
    signupUser,
}