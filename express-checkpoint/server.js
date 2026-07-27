const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.render("closed");
  }
};

app.use(workingHoursMiddleware);

app.get("/", (req, res) => {
  res.render("index", { title: "Home", currentPage: "home" });
});

app.get("/services", (req, res) => {
  res.render("services", { title: "Our Services", currentPage: "services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us", currentPage: "contact" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});