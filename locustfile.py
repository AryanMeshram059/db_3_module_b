from locust import HttpUser, task, between
import random

# 🔑 Student tokens
students = [
    {"id": 230011, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMwMDExLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTM0NDAxNCwiZXhwIjoxNzc1MzQ3NjE0fQ.FkJsb3G_LIFcY9rVbaWnpaQHcy_j_x2JietiNybP_a"},
    {"id": 240004, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQwMDA0LCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTM0NDA3NSwiZXhwIjoxNzc1MzQ3Njc1fQ.vFR9TIhpfWYiy5UfBTiDkGCQIwZqbQk18BhFYqLDErU"},
    {"id": 250003, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUwMDAzLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTM0NDEzMSwiZXhwIjoxNzc1MzQ3NzMxfQ.IohzAVcF2j3mHFiFIJigcIGa3gca_7aeF1EoIj_jiTg"},
    {"id": 230008, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMwMDA4LCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTc3NTM0NDE2NywiZXhwIjoxNzc1MzQ3NzY3fQ.IxZuHNP3397bRkTmjEuoiDZRFzvJipMnFD0Vpy1EUOI"}
]

# ✅ Valid attendance IDs
attendance_ids = [4, 5, 16, 32, 45, 74, 79, 88, 89]

class AttendanceUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def create_request(self):
        student = random.choice(students)
        attendance_id = random.choice(attendance_ids)

        payload = {
            "studentId": student["id"],
            "attendanceId": attendance_id,
            "reason": random.choice([
                "Medical leave",
                "Family emergency",
                "FAIL case test"  # triggers rollback
            ])
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": student["token"]
        }

        self.client.post("/api/request", json=payload, headers=headers)