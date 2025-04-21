//email validation regex
// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export function validateEmailInputField(email: string): string | null {
  if (!email.trim()) {
    return 'Please Enter the Email';
  } else if (!email.includes('@')) {
    return 'Email must contain @ symbol';
  } else if (!email.includes('.')) {
    return 'Email must contain a domain extension (e.g., .com)';
  } else if (email.startsWith('@')) {
    return 'Email must have a username before @ symbol';
  } else if (email.indexOf('@') === email.length - 1) {
    return 'Email must have a domain after @ symbol';
  } else if (email.split('@')[1] && !email.split('@')[1].includes('.')) {
    return 'Email domain must include an extension (e.g., .com)';
  } else if (!/^[a-zA-Z0-9._-]+@/.test(email)) {
    return 'Email username can only contain letters, numbers, periods, underscores, and hyphens';
  } else if (!/@[a-zA-Z0-9.-]+\./.test(email)) {
    return 'Email domain can only contain letters, numbers, periods, and hyphens';
  } else if (!/\.[a-zA-Z]{2,6}$/.test(email)) {
    return 'Email must end with a valid domain extension (2-6 letters)';
  }

  return null;
}

//password validation regrex
/* const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; */
export function validatePasswordInputField(password: string): string | null {
  if (!password) {
    return 'Please Enter the Password';
  } else if (password.length < 8) {
    return 'Password must be atleast 8 characters long';
  } else if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain atleast one uppercase letter';
  } else if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain atleast one lowercase letter';
  } else if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain atleast one number';
  } else if (!/(?=.*[@$!%*?&])/.test(password)) {
    return 'Password must contain atleast one special character(!@#$%^&*)';
  } else if (password.length > 50) {
    return 'Password can max be 50 characters long';
  }

  return null;
}
