import "dotenv/config";
import { createServer } from "./server.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

const bootstrap = async () => {
  await connectDatabase();
  const app = createServer();
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
};
bootstrap().catch((error) => {
  console.error("Failed to start server : ", error);
  process.exit(1);
});
