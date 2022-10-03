const { default: to } = require("await-to-js");
const auth = require("../../models/auth");
const argon2 = require("argon2");
const { ErrorHandler } = require("../../helpers/errors");
const constants = require("../../constants");

module.exports = async (req, res, next) => {
    const passwordHash = await argon2.hash(req.body.password);
    var data = {
        password : passwordHash
    };

    const [ err, result ] = await to(auth.findOneAndUpdate({ LoginId : req.body.LoginId }, { $set : data }));

    if(err) {
        const error = new ErrorHandler(constants.ERRORS.DATABASE, {
            statusCode : 500,
            message : "DATABASE ERROR",
            errStack: err
        })

        return next(error);
    }

    if(result) {
        res.status(200).send({
            message : "Password Updated..."
        })
    }else{
        res.status(400).send({
            message : "LoginId Not Found..."
        })
    }
}