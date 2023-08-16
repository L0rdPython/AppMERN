const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.error(error.errors);
    res.status(404).json({ error: error.errors.map((error) => error.message) });
  }
};

export default validateSchema;
