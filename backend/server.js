const express = require("express");
const cors = require("cors");
const requestsRouter = require("./routes/requests");
const authRouter = require("./routes/auth");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/requests", requestsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));