/**
 * Function takes in the error code and returns error message to be shown to the user.
 */
export const getFirebaseAuthErrorMessage = (code: string | undefined): string => {
    let message = ""
    switch (code) {
        //Common errors
        case "auth/user-not-found":
            message = "The account does not exist. Do you want to sign up instead?"
            break;
        case "auth/user-disabled":
            message = "The account has been disabled. Please contact us for more information."
            break;
        case "auth/unauthorized-domain":
            message = "You are trying to authenticate from a different domain."
            break;
        case "auth/too-many-requests":
            message = "Uh oh! It looks like you have tried to login multiple times. For security reasons, we have disabled your account for a few minutes. Please try again after some time."
            break;
        case "auth/network-request-failed":
            message = "Uh oh! It looks like your network connection is not stable. Please try again."
            break;
        //Sign in with google
        case "auth/popup-closed-by-user":
            message = "Google sign in cancelled by the user."
            break;
        case "auth/credential-already-in-use":
            message = "This Google account is already in use."
            break;
        //Sign up with email, password errors
        case "auth/invalid-email":
            message = "The email you entered is invalid."
            break
        case "auth/weak-password":
            message = "The password is too weak."
            break;
        case "auth/email-already-in-use":
            message = "This email is being used by another account."
            break;
        //Sign in with email and password
        case "auth/wrong-password":
            message = 'The password you entered is wrong. If you do not remember your password, please click on "Forgot Password".'
            break;
        default: message = "Uh oh! There was an unexpected error."
    }
    return message
}