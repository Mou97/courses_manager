const Validator = require('validator').default

const validateRegisterInput = (data) => {
    let errors = {}
    data.name = data.name || ''
    data.email = data.email || ''
    data.password = data.password || ''

    if (!Validator.isLength(data.name, { min: 5, max: 30 })) {
        errors.name = 'Name must be between 5 and 30 characters'
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required"
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Not a valid email format"
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "Password must be between 8 and 20 characters"
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}
module.exports = validateRegisterInput