// const fetch = require("node-fetch");

// const URL = "http://localhost:3000/api/request";

// // 🔑 Your student tokens
// const students = [
//   { id: 1001, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMwMDExLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTMzOTA5OSwiZXhwIjoxNzc1MzQyNjk5fQ.mSqlFYZ1FWePJtZdpCWZUbBgcN40KtBSbU2ahklSivA" },
//   { id: 1002, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQwMDA0LCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTMzOTIyNywiZXhwIjoxNzc1MzQyODI3fQ.efTRHHm0PxhwoJzX5uc1tMti--w3h4bNycakREcJ0ZI" },
//   { id: 1003, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQwMDA2LCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTMzOTI5NywiZXhwIjoxNzc1MzQyODk3fQ.LKWKOWXfgn6S0BUXg525OS-VANfzBY6Q-QWHvWaWrtM" },
//   { id: 1004, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUwMDAzLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTMzOTM2OCwiZXhwIjoxNzc1MzQyOTY4fQ.H0whikj47B9OsHROnKDyMjPuix_YyHtRq5JNTIbxGWw" }
// ];

// // 🔁 Send 15 concurrent requests
// for (let i = 0; i < 15; i++) {
//   const student = students[i % students.length];

//   fetch(URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": student.token // ✅ raw token (your backend format)
//     },
//     body: JSON.stringify({
//       studentId: student.id,
//       reason: i < 10 
//         ? `Normal request ${i}` 
//         : `FAIL request ${i}`,   // 🔥 triggers rollback in your logic
//       date: "2026-04-05"
//     })
//   })
//     .then(async (res) => {
//       let data;
//       try {
//         data = await res.json();   // try parsing JSON
//       } catch {
//         data = await res.text();   // fallback if not JSON
//       }

//       console.log(
//         `Request ${i} (Student ${student.id}):`,
//         data
//       );
//     })
//     .catch(err => console.error("FETCH ERROR:", err.message));
// }

const fetch = require("node-fetch");

const URL = "http://localhost:3000/api/request";

// 🔑 Your student tokens
const students = [
  {
    id: 230011,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMwMDExLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTM0NDAxNCwiZXhwIjoxNzc1MzQ3NjE0fQ.FkJsb3G_LIFcY9rVbaWnpaQHcy_j_x2JietiNybP_a"
  },
  {
    id: 240004,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQwMDA0LCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTM0NDA3NSwiZXhwIjoxNzc1MzQ3Njc1fQ.vFR9TIhpfWYiy5UfBTiDkGCQIwZqbQk18BhFYqLDErU"
  },
  {
    id: 250003,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUwMDAzLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTM0NDEzMSwiZXhwIjoxNzc1MzQ3NzMxfQ.IohzAVcF2j3mHFiFIJigcIGa3gca_7aeF1EoIj_jiTg"
  },
  {
    id: 230008,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMwMDA4LCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTM0NDE2NywiZXhwIjoxNzc1MzQ3NzY3fQ.IxZuHNP3397bRkTmjEuoiDZRFzvJipMnFD0Vpy1EUOI"
  }
];

// ✅ Valid Attendance IDs from your DB
const attendanceIds = [4, 5, 16, 32, 45, 74, 79, 88, 89];

// 🔁 Send 15 concurrent requests
for (let i = 0; i < 15; i++) {
  const student = students[i % students.length];
  const attendanceId = attendanceIds[i % attendanceIds.length];

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": student.token // ✅ your system format
    },
    body: JSON.stringify({
      studentId: student.id,
      attendanceId: attendanceId,
      reason: i < 10
        ? `Normal request ${i}`
        : `FAIL request ${i}`
    })
  })
    .then(async (res) => {
      const text = await res.text(); // ✅ read once

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      console.log(
        `Request ${i} (Student ${student.id}, Attendance ${attendanceId}):`,
        data
      );
    })
    .catch(err => console.error("FETCH ERROR:", err.message));
}