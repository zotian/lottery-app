const isValidEmail = email => {
  const re = /\S+@\S+\.\S+/;
  if (re.test(email)) {
    return true;
  }
  return false;
};

const isEmptyField = input => {
  if (!input.replace(/\s/g, "").length) {
    return true;
  }
  return false;
};

export { isValidEmail, isEmptyField };
