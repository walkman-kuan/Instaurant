import { signUpErrorCodes, signInErrorCodes, resetPasswordErrorCodes } from '../resources/firebaseTexts';

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

export const handleSignInError = (error) => {
    switch (error.code) {
    case signInErrorCodes.INVALID_EMAIL:
        // error.message
        break;
    case signInErrorCodes.USER_DISABLED:
        // error.message
        break;
    case signInErrorCodes.USER_NOT_FOUNED:
        // error.message
        break;
    case signInErrorCodes.WRONG_PASSWORD:
        // error.message
        break;
    default:
        // Unknow error message
    }
};

export const handlePasswordResetError = (error) => {
    switch (error.code) {
    case resetPasswordErrorCodes.INVALID_EMAIL:
        // error.message
        break;
    case resetPasswordErrorCodes.USER_NOT_FOUNED:
        // error.message
        break;
    default:
        // Unknow error message
    }
};
