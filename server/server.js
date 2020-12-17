import 'dotenv/config.js';
import app from "./app.js";

const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // close server and exit processes
    // server.close(() => process.exit(1))
});
