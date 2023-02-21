export const GetErrorMessage = (errorCode, errMessageFromAPI, pageName) => {
    let errorMessage = '';

    switch (errorCode) {
        case 100:
            errorMessage = 'You are not authorized for this request';
            break;
        case 101:
            errorMessage = 'Something went wrong';
            break;
        case 102:
            errorMessage = 'Authentication token has expired';
            break;
        case 103:
            errorMessage = 'Authentication token is invalid';
            break;
        case 104:
            errorMessage = pageName === 'signup' ? errMessageFromAPI  : errMessageFromAPI + ' is not valid';
            break;
        case 105:
            errorMessage = 'Invalid mobile number - Please enter the following format : 03XXXXXXXXXX';
            break;
        case 106:
            errorMessage = pageName === 'forget' ? 'This email is not attached with a PTV account' : 'Resource not found';
            break;
        case 107:
            errorMessage = 'Invalid OTP code';
            break;
        case 108:
            errorMessage = 'Your link has expired';
            break;
        case 109:
            errorMessage = 'Username or Password is incorrect';
            break;
        case 110:
            errorMessage = 'This email or phone is already linked with another account';
            break;
        case 111:
            errorMessage = 'Your account is not verified. Please check your email for verfication link';
            break;
        case 112:
            errorMessage = 'Your account has already been verified. Please login.';
            break;
        default:
            errorMessage = 'Something went wrong.';
            break;
    }

    return errorMessage;
}