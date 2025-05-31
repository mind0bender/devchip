import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { pino, type Logger } from "pino";
import PinoPretty, { type PrettyStream } from "pino-pretty";

const PORT: number = parseInt(process.env.PORT || "8080");

const prettyStream: PrettyStream = PinoPretty();

const logger: Logger = pino({}, prettyStream);

const app: Express = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req: Request, res: Response): void => {
  res.json({
    name: "John Doe",
    email: "you@example.com",
  });
});

app.listen(PORT, (): void => {
  logger.info(`server running on http://localhost:${PORT}`);
});

export default app;
