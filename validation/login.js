const Validator = require('validator').default

const validateLoginInput = (data) => {
    let errors = {}
    data.email = data.email || ''
    data.password = data.password || ''


    if (!Validator.isEmail(data.email)) {
        errors.email = "Not a valid email format"
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}
module.exports = validateLoginInput