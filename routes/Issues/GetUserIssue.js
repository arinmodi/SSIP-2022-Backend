const issue = require("../../models/issue")

module.exports = async (req, res, next) => {
    try{
        const filteredIssue = await issue.find({ contact : req.query.contact });

        res.status(200).send({
            length : filteredIssue.length,
            data : filteredIssue
        })
    }catch(e) {
        res.status(500).send({
            message : "server error"
        })
    }
};