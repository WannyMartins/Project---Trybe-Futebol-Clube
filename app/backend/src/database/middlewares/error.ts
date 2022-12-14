import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  console.log(message);
  switch (name) {
    case 'ValidationError':
      res.status(401).json({ message });
      break;
    case 'InvalidData':
      res.status(400).json({ message });
      break;
    case 'NotFound':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).end();
      break;
  }
};

export default errorMiddleware;
