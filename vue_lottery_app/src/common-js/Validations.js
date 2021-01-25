const isValidEmail = email => {
  const re = /\S+@\S+\.\S+/;
  if (re.test(email)) {
    return true;
  }
  return false;
};

const isEmptyField = input => {
  return !input.replace(/\s/g, "").length;
};

export { isValidEmail, isEmptyField };
