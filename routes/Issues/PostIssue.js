const { default: to } = require("await-to-js");
const constants = require("../../constants");
const { ErrorHandler } = require("../../helpers/errors");
const Issues = require("../../models/issue");

module.exports = async (req, res, next) => {
    const [err, result] = await to(Issues.create({ ...req.body }));

    if(err) {
        console.log(err);

        const e = new ErrorHandler(constants.ERRORS.DATABASE, {
            statusCode : 410,
            message : "DATABASE ERROR",
            errStack: err
        });

        return next(e);
    }

    
    res.status(200).send({
        message : "Complaint Registred",
        id : result._id
    });
}