const getToastMessage = msg => {
  const errorObj = {
    INVALID_PASSWORD: "Invalid Password!",
    INVALID_EMAIL_FORMAT: "Invalid email format!",
    EMAIL_NOT_FOUND: "Email not found!",
    WEAK_PASSWORD: "Password should be at least 6 characters!",
    EMAIL_EXISTS: "Email already exists!",
    EMAIL_REQUIRED: "Email is required!"
  };
  return errorObj[msg] || "Something went wrong!";
};

export { getToastMessage };
