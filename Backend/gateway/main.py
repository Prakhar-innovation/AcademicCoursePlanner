from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import requests

app = FastAPI()

SPRING_BOOT_URL = "http://localhost:8081"

# ---------------- CORS ----------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- HOME ----------------

@app.get("/")
def home():
    return {"message": "FastAPI Gateway Running"}

# ==================================================
# STUDENTS
# ==================================================

@app.get("/students/all")
def get_students():

    response = requests.get(
        f"{SPRING_BOOT_URL}/students/all"
    )

    return response.json()

@app.post("/students/add")
def add_student(student: dict):

    response = requests.post(
        f"{SPRING_BOOT_URL}/students/add",
        json=student
    )

    return response.json()

# ==================================================
# COURSES
# ==================================================

@app.get("/courses/all")
def get_courses():

    response = requests.get(
        f"{SPRING_BOOT_URL}/courses/all"
    )

    return response.json()

@app.post("/courses/add")
def add_course(course: dict):

    response = requests.post(
        f"{SPRING_BOOT_URL}/courses/add",
        json=course
    )

    return response.json()


@app.get("/enrollments/all")
def get_enrollments():

    response = requests.get(
        f"{SPRING_BOOT_URL}/enrollments/all"
    )

    return response.json()

@app.post("/enrollments/add")
def add_enrollment(enrollment: dict):

    response = requests.post(
        f"{SPRING_BOOT_URL}/enrollments/add",
        json=enrollment
    )

    return response.json()



@app.get("/prerequisites/all")
def get_prerequisites():

    response = requests.get(
        f"{SPRING_BOOT_URL}/prerequisites/all"
    )

    return response.json()

@app.post("/prerequisites/add")
def add_prerequisite(prerequisite: dict):

    response = requests.post(
        f"{SPRING_BOOT_URL}/prerequisites/add",
        json=prerequisite
    )

    return response.json()