const Joi = require("joi");

const media = Joi.object({
    url : Joi.string().min(10).required(),
    type : Joi.string().min(3).max(5).required()
})

const issueSchemaValidator = Joi.object({
    title : Joi.string().min(4).max(25).required(),
    description : Joi.string().min(30).max(300).required(),
    medias : Joi.array().min(2).max(4).items(media).required(),
    area : Joi.string().min(2).max(50).required(),
    location : Joi.object({
        type : Joi.string().min(2).max(15).required(),
        coordinates : Joi.array().min(2).max(2).required()
    }).required(),
    contact : Joi.string().min(10).max(10).required(),
});

const getIssuesSchemaValidator = Joi.object({
    area : Joi.string().min(2).max(50).required(),
});

const getUserIssuesSchemaValidator = Joi.object({
    contact : Joi.string().min(10).max(10).required()
});

const StausIssueSchemaValidator = Joi.object({
    status : Joi.string().min(1).max(1).required()
});

const updateIssueStatusSchemaValidator = Joi.object({
    status : Joi.string().min(1).max(1).required(),
    id : Joi.string().min(24).max(24).required()
})

const getDetailsSchema = Joi.object({
    id : Joi.string().min(24).max(24).required()
})

module.exports = { 
    issueSchemaValidator, 
    getIssuesSchemaValidator, 
    getUserIssuesSchemaValidator, 
    StausIssueSchemaValidator, 
    updateIssueStatusSchemaValidator,
    getDetailsSchema 
}