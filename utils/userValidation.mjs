export const userValidation = {
    password: {
      isLength: {
        options: { min: 3 },
        errorMessage: 'Password should be at least 8 chars',
      }
    },
    image:{
        notEmpty: {
            errorMessage: "Please Provide image"
        }
    },
    email:{
        isString: {
            errorMessage: "email has to be a string"
        },
        notEmpty: {
            errorMessage: "Please Provide Email"
        }
    }
  }