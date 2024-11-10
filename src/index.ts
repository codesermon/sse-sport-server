import express, { Request, Response } from 'express';
import http from 'http'
import sseEmitter from './sseEmitter';
import playerRouter from './routes/players';
import cors from "cors"

const app = express();
const port = process.env.PORT || 8080;


const server = http.createServer(app);

// configure cors
app.use(cors({ 
  origin: [
    "http://localhost:3000",
    "https://sse-sport-client.vercel.app", 
    "https://sse-sport-client-codesermons-projects.vercel.app",
    "https://sse-sport-client-git-main-codesermons-projects.vercel.app"
  ], 
  credentials: true}))
// For parsing application/json
app.use(express.json()); 
// Enable URL-encoded parsing for incoming requests
app.use(express.urlencoded({ extended: false}));
// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Node.js is running on On GCP');
});

app.get('/api/stream', sseEmitter.init);

// players router
app.use("/api", playerRouter)

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
