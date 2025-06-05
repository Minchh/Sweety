import app from "./app.js";
import { appConfig } from "./config/index.js";
import { generateAdminAccount } from "./utils/generateAdminAccount.js";

const PORT = appConfig.port || 3000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server started on PORT ${PORT}`);
});

// Create admin account
generateAdminAccount();
