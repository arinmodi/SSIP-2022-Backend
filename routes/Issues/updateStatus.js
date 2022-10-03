const { default: to } = require("await-to-js");
const constants = require("../../constants");
const { ErrorHandler } = require("../../helpers/errors");
const issue = require("../../models/issue")

module.exports = async (req, res, next) => {
    var data = {
        status : req.body.status
    }

    const [err, result] = await to(issue.findOneAndUpdate({ _id : req.body.id }, { $set : data }));

    if(err) {
        const Error = new ErrorHandler(constants.ERRORS.DATABASE, {
            statusCode: 500,
            message: 'Database Error',
            errStack: err,
        });

        return next(Error);
    }

    if(result == null) {
        const error = new ErrorHandler(constants.ERRORS.INPUT,{
            statusCode: 400,
            message: 'Provide Valid Id',
            errStack: err,
        });

        return next(error);
    }

    res.status(200).send({
        message : "Updated Status..."
    });
}