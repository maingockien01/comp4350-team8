import time
import random
import string
import json
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):

    jwt_token = ""

    def on_start(self):
        self.jwt_token = self.get_jwt_token()
    
    @task
    def get_jwt_token(self):
        username = ''.join(random.choices(string.ascii_lowercase, k=5))  # Generate random username
        fullName = ''.join(random.choices(string.ascii_letters, k=10))  # Generate random fullName
        password = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))  # Generate random password
        payload = {
            "username": username,
            "fullName": fullName,
            "password": password
        }
        self.client.post("/rest-api/auth/signup", json=payload)
        payload2= {
            "username": username,
            "password": password
        }
        response = self.client.post("/rest-api/auth/login", json=payload2)

        if response.status_code == 200:
            return response.cookies.get('access_token')
        else:
            print("Failed to obtain JWT token")
            return ""


    @task
    def main_page(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        self.client.get(url="/home", headers=headers)
    
    @task
    def view_profile(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        self.client.get(url="/profile", headers=headers)
        username = ''.join(random.choices(string.ascii_lowercase, k=5))  # Generate random username
        fullName = ''.join(random.choices(string.ascii_letters, k=10))  # Generate random fullName
        password = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))  # Generate random password
        payload = {
            "username": username,
            "fullName": fullName,
            "password": password
        }

        self.client.post(url="/rest-api/profile", json=payload, headers=headers)

    @task
    def lookup_page(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        self.client.get(url="/lookup", headers=headers)

    @task
    def view_calendar(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        self.client.get(url="/calendar", headers=headers) 

    @task
    def view_roadmap(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        department_id = random.randint(1, 3)
        self.client.get(url="/roadmap", headers=headers) 
        self.client.get(url=f"/rest-api/degree/{department_id}?withRoadmap=true", headers=headers) 

    @task
    def view_perRoadmap(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        self.client.get(url="/roadmap/personal", headers=headers) 


    @task
    def search_course(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        term_id = random.randint(1, 10)  # Generate random termid between 1 and 10
        department_id = random.randint(1, 3)
        self.client.get(url=f"/rest-api/course?termid={term_id}&departmentId={department_id}", headers=headers)    
    
    @task
    def course_detail(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        course_id = random.randint(1, 45)  # Generate random termid between 1 and 10
        self.client.get(url=f"/rest-api/course/{course_id}", headers=headers)  
    
    @task
    def add_course(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        section_id = random.randint(1,27)
        self.client.get(url="/rest-api/user/add", params={"sid": section_id}, headers=headers) 
    
    @task
    def drop_course(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        search_response = self.client.get(url="/rest-api/user/searchSection?tid=12", headers=headers) 
        sections = search_response.json()  # Parse JSON response
        if search_response.status_code == 200:
            for section in sections:
                section_id = section.get("sid")  # Extract sid from each section
                if section_id is not None:
                    # Send request to remove section using extracted sid
                    remove_response = self.client.get("/rest-api/user/remove", params={"sid": section_id}, headers=headers)
    

    @task
    def create_personalRoadmap(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        
        # Send request to retrieve courses
        search_response = self.client.get("/rest-api/course", headers=headers)
        
        if search_response.status_code == 200:
            courses = search_response.json()  # Parse JSON response
            if courses:
                # Select a course from the list (e.g., the first one)
                selected_course = courses[random.randint(1, len(courses)-1)]
                selected_courses_body = {"courses": [selected_course]}
                # Send POST request to create personal data using the selected course as the body
                personal_response = self.client.post("/rest-api/roadmap/personal", json=selected_courses_body, headers=headers)

    @task
    def fetch_activeRegistration(self):
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        self.client.get(url="/rest-api/user/searchActive?tid=12", headers=headers)

    
