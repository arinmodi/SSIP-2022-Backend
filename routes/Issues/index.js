const router = require('express').Router({ mergeParams: true });
const validator = require('../../middlewares/validation');
const { 
    issueSchemaValidator, getIssuesSchemaValidator, 
    getUserIssuesSchemaValidator, StausIssueSchemaValidator, 
    updateIssueStatusSchemaValidator, getDetailsSchema 
} = require('./@validationSchema');
const addTheIssue = require('./PostIssue');
const getTheIssues = require("./GetIssue");
const { authMiddleware } = require('../../middlewares/auth');
const getUserIssue = require('./GetUserIssue');
const getStatusIssue = require('./GetStatusIssue');
const updateStatus = require('./updateStatus');
const getDetails = require('./getDetails');

router.post('/add', validator(issueSchemaValidator), addTheIssue);
router.get('/get', validator(getIssuesSchemaValidator, 'query'), authMiddleware, getTheIssues)
router.get('/getMyIssues', validator(getUserIssuesSchemaValidator, 'query'), getUserIssue);
router.get('/getStatusIssue', validator(StausIssueSchemaValidator, 'query'), authMiddleware, getStatusIssue);
router.patch('/updateStatus', validator(updateIssueStatusSchemaValidator), updateStatus);
router.get('/details', validator(getDetailsSchema, 'query'), getDetails);

module.exports = router;