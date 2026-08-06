const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;

const MAX_TITLE_LENGTH = 100;
const MAX_IMG_URL_LENGTH = 200;
const MAX_PRICE_DIGITS = 10;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Requires min 8 chars, uppercase, number, special char, no whitespace
  return passwordRegex.test(password);
};

export const validateProductTitle = (value) => {
  const trimmedValue = value?.toString().trim();

  if (!trimmedValue) {
    return "Title is required.";
  }

  if (trimmedValue.length > MAX_TITLE_LENGTH) {
    return "Title must be at most 100 characters.";
  }

  return true;
};

export const validateProductPrice = (value) => {
  const trimmedValue = value?.toString().trim();

  if (!trimmedValue) {
    return "Price is required.";
  }

  const numericValue = Number(trimmedValue);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return "Price must be greater than zero.";
  }

  const digitsOnly = trimmedValue.replace(/[^\d]/g, "");
  if (digitsOnly.length > MAX_PRICE_DIGITS) {
    return "Price must have at most 10 digits.";
  }

  return true;
};

export const validateProductImgUrl = (value) => {
  const trimmedValue = value?.toString().trim();

  if (!trimmedValue) {
    return "Image URL is required.";
  }

  if (!trimmedValue.startsWith("https://")) {
    return "Image URL must start with https://";
  }

  if (trimmedValue.length > MAX_IMG_URL_LENGTH) {
    return "Image URL must be at most 200 characters.";
  }

  try {
    const parsedUrl = new URL(trimmedValue);
    if (parsedUrl.protocol !== "https:") {
      return "Image URL must start with https://";
    }
  } catch {
    return "Please enter a valid URL.";
  }

  return true;
};

export const validateProductCategory = (value) => {
  if (!value) {
    return "Please select a category.";
  }

  return true;
};
