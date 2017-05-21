import signUpErrorCodes from '../resources/firebaseTexts';

export const handleSignUpError = (error) => {
    switch (error.code) {
    case signUpErrorCodes.EMAIL_ALREADY_IN_USED:
        // error.message
        break;
    case signUpErrorCodes.INVALID_EMAIL:
        // error.message
        break;
    case signUpErrorCodes.WEAK_PASSWORD:
        // error.message
        break;
    case signUpErrorCodes.OPERATION_NOT_ALLOWED:
        // error.message
        break;
    default:
        // Unknow error message
    }
};

export const handleSignInError = () => {
    // Handle sign in error
};
