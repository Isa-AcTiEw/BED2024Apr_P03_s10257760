const joi = require("joi");
const validateBook = (req,res,next) =>{
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        author: Joi.string().min(3).max(50).required(),
    });
    const validattion = schema.validate(req.bofy, {abortEarly: false}); // Validate Reuest Body

    if(validattion.error){
        const error = validation.error.details.map((error) => error.message);
        res.status(400).json({message: "Validation error", errors});
        return;
    }
    next();

};