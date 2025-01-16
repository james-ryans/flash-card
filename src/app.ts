import express, { Express, Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

export default app;
