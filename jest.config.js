module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: "node",
    transform: {
      "^.+\\.js$": "babel-jest",
    },
  };
};
