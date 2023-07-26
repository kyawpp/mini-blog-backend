const errorCodes = {
    //general
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    //user errors codes
    INVALID_REQUEST_DATA: 'INVALID_REQUEST_DATA',
    USERNAME_ALREADY_EXISTS: 'USERNAME_ALREADY_EXISTS',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    
    //login errors
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    //Card errors
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    INVALID_REQUEST_DATA: 'INVALID_REQUEST_DATA',
    CARD_NOT_FOUND: 'CARD_NOT_FOUND',
  };
  
  const errorMessages = {
    //general error
    INTERNAL_SERVER_ERROR: 'An error occurred while processing the request',
    //user error messages
    INVALID_REQUEST_DATA: 'Invalid request data',
    USERNAME_ALREADY_EXISTS: 'Username already exists',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    //login error messages
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_NOT_FOUND: 'User not found',
    //card error messages
    UNAUTHORIZED: 'Unauthorized.',
    FORBIDDEN: 'Forbidden.',
    INVALID_REQUEST_DATA: 'Invalid request data.',
    CARD_NOT_FOUND: 'Card not found.',
  };
  module.exports = { errorCodes, errorMessages };
  