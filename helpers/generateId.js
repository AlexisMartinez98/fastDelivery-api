const generateId = () => {
  const random = Math.random().toString(32).substring(2);
  const randomDate = Date.now().toString(32);
  return random + randomDate;
};

module.exports = generateId;
