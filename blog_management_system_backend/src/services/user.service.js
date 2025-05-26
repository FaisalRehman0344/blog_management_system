const { User } = require("../models")

const getUserByEmail = async (email) => {
    return User.findOne({ email })
}

const getUserById = async (id) => {
    return User.findById(id)
}

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
};

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
}