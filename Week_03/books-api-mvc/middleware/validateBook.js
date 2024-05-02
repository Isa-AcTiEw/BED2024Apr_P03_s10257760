const Joi = require("joi");

const validateBook = (req,res,next) =>{
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        author: Joi.string().min(3).max(50).required(),
    });


    const validation = schema.validate(req.body, {abortEarly: false});

    if (validation.error){
        const error = validation.error.details.map((error => error.message));
        res.status(400).json({message:"Validation error", errors});
        return; // Terminate middleware execution on validation error
    }

    next(); // If validation passes proceed to next middleware function\

};
module.exports = validateBook;


// Imported Joi library for schema validation
// validateBook function is a middleware function that checks if the requests, is in the correct form
// Joi schema has parameters such as title minimum characters is 3. Maximum is 50 same for author.

//abortEarlt: false (ensures all errors are collected and reported)

