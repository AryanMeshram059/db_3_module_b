const fetch = require("node-fetch");

const URL = "http://localhost:3000/api/request/60";

const tokens = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTAwMSwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzc1MzI4NjcwLCJleHAiOjE3NzUzMzIyNzB9.DYK0KCZf9n1qNnYPMG8Syv9uYg7P4-M4tKOOGIRqj84",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTAwMiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzc1MzI4NjUzLCJleHAiOjE3NzUzMzIyNTN9.7b2lZbG_NeI37cecVBpbYJZQ6wI71pxwALqz3cGTrJU",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTAwMywicm9sZSI6IkFkbWluIiwiaWF0IjoxNzc1MzI4NjM0LCJleHAiOjE3NzUzMzIyMzR9.adWmZtZK5ALoFYnI6M4S_vNhysoOlt49GZQrogcL35I",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTAwNCwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzc1MzI4NjIyLCJleHAiOjE3NzUzMzIyMjJ9.seg7RtmwVUgDVrr7-zZuIFcf2c9yf7IwH4t1Ek30tfA"
];

for (let i = 0; i < 8; i++) {
  fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${tokens[i % tokens.length]}`
    },
    body: JSON.stringify({
      status: i % 2 === 0 ? "approved" : "rejected"
    })
  })
    .then(res => res.text())
    .then(data => console.log(`Admin ${i}:`, data));
}