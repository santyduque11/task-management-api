const validate = (schema, property = "body") => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req[property]);

      if (property === "query") {
        req.validatedQuery = validatedData;
      } else {
        req[property] = validatedData;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;