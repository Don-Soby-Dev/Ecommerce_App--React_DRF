const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Requires min 8 chars, uppercase, number, special char, no whitespace
  return passwordRegex.test(password);
};
