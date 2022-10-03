const issue = require("../../models/issue")

module.exports = async (req, res, next) => {
    try{
        const filteredIssue = await issue.find({ area : req.query.area });

        // doing filtering

        const countOfPending = filteredIssue.reduce((count, obj) => obj.status == 0 ? count + 1 : count, 0);
        const countOfWorking = filteredIssue.reduce((count, obj) => obj.status == 1 ? count + 1 : count, 0);
        const countOfCompleted = filteredIssue.length - (countOfPending + countOfWorking)

        res.status(200).send({
            length : filteredIssue.length,
            data : filteredIssue,
            countOfPending : countOfPending,
            countOfWorking : countOfWorking,
            countOfCompleted : countOfCompleted
        })
    }catch(e) {
        res.status(500).send({
            message : "server error"
        })
    }
};