const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./db/dbConnect");
const userRoutes = require("./routes/userRoute");
const bookingRoutes = require("./routes/bookingRoutes");
const addRoom = require("./routes/addRoom");
const userProfile = require("./routes/userProfile");

const app = express();
const PORT = 9000;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/add", addRoom);
app.use("/api/detail", userProfile);
app.use("/profileUploads", express.static("profileUploads"));
app.use("/uploads", express.static("uploads"));

async function startServer() {
    try {

        await db();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {

        console.log(
            "Failed to connect to the database. Server not started."
        );

        console.log(error);
    }
}

startServer();