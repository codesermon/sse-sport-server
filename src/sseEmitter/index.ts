import SSE from "ts-express-sse";

const sseEmitter = new SSE(["sse", "testing", "on", "Google", "Cloud", "Platform"])

// setInterval(() => {
//     sseEmitter.send(Math.round(Math.random() * 1000000))
// }, 10000);

export default sseEmitter
