const loginUserController = require('./loginUserController');
const registerController = require('./registerController');
const getOwnUserController = require('./getOwnUserController');
const updateProfileController = require('./updateProfileController');
const getUserProfileController = require('./getUserProfileController');
const listUsers = require('./userListController');
const updateUserRole = require('./updateUserRole');

module.exports = {
    loginUserController,
    registerController,
    getOwnUserController,
    updateProfileController,
    getUserProfileController,
    listUsers,
    updateUserRole,
};
