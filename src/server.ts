import app from "./main";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;
dotenv.config();

app.listen(port, () => {
  console.log(
    `[server]: Bloq Code Challenge is running at http://localhost:${port}`
  );
});
