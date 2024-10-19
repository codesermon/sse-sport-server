import express, { Request, Response } from 'express';
import http from 'http'
import sseEmitter from './sseEmitter';
import { getUsersController } from './controllers/users';

const app = express();
const port = process.env.PORT || 8081;


const server = http.createServer(app);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js! On GCP');
});

app.get('/api/stream', sseEmitter.init);

app.get("/api/users", getUsersController)

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
