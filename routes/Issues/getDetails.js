const constants = require("../../constants");
const { ErrorHandler } = require("../../helpers/errors");
const issue = require("../../models/issue")

module.exports = async (req, res, next) => {
    const details = await issue.findOne({ _id : req.query.id });

    if(details == null) {
        const error = new ErrorHandler(constants.ERRORS.INPUT,{
            statusCode: 400,
            message: 'Provide Valid Id',
        });

        return next(error);
    }else{
        res.status(200).send({
            data : details
        });
    }
}