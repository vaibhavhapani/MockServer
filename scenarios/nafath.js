const crypto = require("crypto");
// JWT token response  (hardcoded for now)
const jwtToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOnsiaWQiOjEwMDAwMDAyNTUsImlkX3ZlcnNpb24iOjMsImFyX2ZpcnN0Ijoi2YXYrdmF2K8iLCJhcl9mYXRoZXIiOiLYp9io2LHYp9mH2YrZhSIsImFyX2dyYW5kIjoi2YXYrdmF2K8iLCJhcl9mYW1pbHkiOiLYp9mE2K_Zh9mK2YXYp9mGIiwiZW5fZmlyc3QiOiJNT0hNRUQiLCJlbl9mYXRoZXIiOiJJQlJBSElNIiwiZW5fZ3JhbmQiOiJNT0hNRUQiLCJlbl9mYW1pbHkiOiJBTERIVVlNQU4iLCJhcl90d29fbmFtZXMiOiLZhdit2YXYryDYp9mE2K_Zh9mK2YXYp9mGIiwiZW5fdHdvX25hbWVzIjoiTU9ITUVEIEFMREhVWU1BTiIsImFyX2Z1bGxfbmFtZSI6ItmF2K3ZhdivINin2KjYsdin2YfZitmFINmF2K3ZhdivINin2YTYr9mH2YrZhdin2YYiLCJlbl9mdWxsX25hbWUiOiJNT0hNRUQgSUJSQUhJTSBNT0hNRUQgQUxESFVZTUFOIiwiZ2VuZGVyIjoiTSIsImlkX2lzc3VlX2RhdGVfZyI6IjIwMTUtMTEtMTMiLCJpZF9pc3N1ZV9kYXRlX2giOjE0MzcwMjAxLCJpZF9leHBpcnlfZGF0ZV9nIjoiMjAyNS0wMS0xNyIsImlkX2V4cGlyeV9kYXRlX2giOjE0NDYwNzE4LCJuYXRpb25hbGl0eSI6MTEzLCJsYW5ndWFnZSI6IkEiLCJhcl9uYXRpb25hbGl0eSI6Itin2YTYudix2KjZitipINin2YTYs9i52YjYr9mK2KkiLCJlbl9uYXRpb25hbGl0eSI6IlNhdWRpIEFyYWJpYSIsImRvYl9nIjoiMTk3NS0wNy0xMCIsImRvYl9oIjoxMzk1MDcwMiwiYXJfY2FyZF9pc3N1ZV9wbGFjZSI6ItmI2YPYp9mE2Kkg2KfZhNin2K3ZiNin2YQg2KfZhNmF2K_ZhtmK2KkiLCJlbl9jYXJkX2lzc3VlX3BsYWNlIjoiVGhlIEFnZW5jeSBmb3IgQ2l2aWwgU3RhdHVzIn0sImF1ZCI6IlRDQ19URVNUIiwiaXNzIjoiaHR0cHM6Ly93d3cuaWFtLnNhL25hZmF0aCIsImlhdCI6MTY3NjQ2NDM1NywibmJmIjoxNjc2NDY0MzU3LCJleHAiOjE2NzY0Njc5NDh9.Zs8H2VZmokjyU5wLYqrf-2ZOwo1HmGHeMK-kzhfelK8rQ8Ct2zUaQJE_yPj7Rg-P48SLN6_LeIayhFl3VBmAPPI_ZoEH0kAdnWvoxtSORZyD5-iiJi7u5EbvD7RfU3sr3k2WHvbgpQ_x4QCJS3jSiS7W4DVaabu-iXLGyqwtXLYft9sw8wtbwKZ2IeYhim6H2oDo2J5oVKH4tZn5f5t6fhswvYp6ZI-jaT3G0xQglIHPZl71c1zmUzZgb59Dgg6YSm0KfxHLd8hjFWYjOI-sUQrCsx_pmWJcNq-ThClgcF6GaOiOJv5e9oara6Kv5hbg6yz25egmOPBAkdQHG1f-DQ`;

// /getRandom
function handleGetRandom(req, res) {
  const { nafathId } = req.body;

  if (!nafathId) {
    return res.status(400).json({ error: "nafathId is required" });
  }

  const transId = crypto.randomBytes(4).toString("hex");
  const random = "32";

  res.json({
    transId,
    random,
  });
}

// /checkStatus
function handleCheckStatus(req, res) {
  const { nafathId, transId, random } = req.body;

  if (!nafathId || !transId || !random) {
    return res
      .status(400)
      .json({ error: "nafathId, transId, and random are required" });
  }

  const statuses = ["WAITING", "EXPIRED", "REJECTED", "COMPLETED"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  const person = {
    id: crypto.randomBytes(4).toString("hex"),
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  };

  const accessToken = crypto.randomBytes(16).toString("hex");

  res.json({
    status,
    person,
    accessToken,
  });
}

// Auth middleware
function checkAuthHeader(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];

  if (token) {
    next();
  } else {
    return res.status(401).send("Unauthorized: Invalid token");
  }
}

// /userInfo
function handleUserInfo(req, res) {
  res.set("Content-Type", "application/jwt");
  res.set("X-TraceId", "102210010936033279");

  res.send(jwtToken);
}

module.exports = {
  handleGetRandom,
  handleCheckStatus,
  checkAuthHeader,
};
