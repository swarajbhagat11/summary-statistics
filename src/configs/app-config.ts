const is_dev = process.env.NODE_ENV === 'development';
const cors_options = {
  origin: is_dev ? ['http://localhost:3000'] : ['http://localhost:3000'],
  allowedHeaders: ['X-Requested-With', 'X-HTTP-Method-Override', 'x-csrf-token', 'Content-Type', 'Accept', 'Authorization'],
  allowedMethods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['*', 'Authorization'],
};

export { is_dev, cors_options };
