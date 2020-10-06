const Validator = require('validator').default

const validateProfileInput = (data) => {

    let errors = {}
    if (!Validator.isEmpty(data.email)) {
        if (!Validator.isEmail(data.email))
            errors.email = 'Not a valid email format'
    }
    if (!Validator.isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube))
            errors.youtube = 'Not a valid URL link'
    }
    if (!Validator.isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin))
            errors.linkedin = 'Not a valid URL link'
    }
    if (!Validator.isEmpty(data.googleScholar)) {
        if (!Validator.isURL(data.googleScholar))
            errors.googleScholar = 'Not a valid URL link'
    }
    if (!Validator.isEmpty(data.researchgate)) {
        if (!Validator.isURL(data.researchgate))
            errors.researchgate = 'Not a valid URL link'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = validateProfileInput