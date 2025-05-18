import app from "./app.js";
import { appConfig } from "./config/index.js"

const PORT = appConfig.port || 3000;

const server = app.listen(PORT, () => {
	console.log(`🚀 Server started on PORT ${PORT}`);
});
