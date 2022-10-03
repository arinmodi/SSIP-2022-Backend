const auth = require("../../models/auth");
const argon2 = require('argon2');
const { generateJWT } = require("../../middlewares/auth");

module.exports = async (req, res, next) => {
    const details = await auth.findOne({ LoginID : req.body.LoginID });

    if(details) {
        if(await argon2.verify(details.password, req.body.password)) {
            try{
                const jwtPayload = {
                    name : details.LoginId,
                    secret : details.password
                };

                const token = generateJWT(jwtPayload);
                res.status(200).send({
                    token : token,
                    message : "Valid"
                });
            }catch(e) {
                res.status(500).send({
                    message : "Server Error"
                });
            }
        }else{
            res.status(400).send({
                message : "InValid Password..."
            })   
        }
    }else{
        res.status(400).send({
            message : "Invalid Login Id"
        })
    }
} 