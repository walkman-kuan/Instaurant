export const signUpErrorCodes = {
    EMAIL_ALREADY_IN_USED: 'auth/email-already-in-use',
    INVALID_EMAIL: 'auth/invalid-email',
    OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
    WEAK_PASSWORD: 'auth/weak-password',
};

export const signInErrorCodes = {
    INVALID_EMAIL: 'auth/invalid-email',
    USER_DISABLED: 'auth/user-disabled',
    USER_NOT_FOUNED: 'auth/user-not-found',
    WRONG_PASSWORD: 'auth/wrong-password',
};

export const resetPasswordErrorCodes = {
    INVALID_EMAIL: 'auth/invalid-email',
    USER_NOT_FOUNED: 'auth/user-not-found',
};
