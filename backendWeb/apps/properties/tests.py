from django.test import TestCase

# Create your tests here.
import requests

client_id = 6
client_secret = 'pbkdf2_sha256$1000000$TOZnqcb2PtPERaWlV7FfiL$T/jVXeNdH9Ki7ZnYNKNlA+OkRLBX5HQHS8eBEYELt+0='

token_url = 'http://localhost:8000/oauth2/token/'

data = {
    "grant_type": "password",
    "username": "admin123", 
    "password": "123456789", 
    "client_id": '1ZmLhcaS4Fmjx17L9lU6lVBofyf8YVBvGUpUcDrm',
    "client_secret": "pbkdf2_sha256$1000000$TOZnqcb2PtPERaWlV7FfiL$T/jVXeNdH9Ki7ZnYNKNlA+OkRLBX5HQHS8eBEYELt+0="
}


response = requests.post(token_url, data=data)
token = response.json().get('access_token')

print(response.json())    

headers = {'Authorization': f'Bearer {token}'}
api_url = 'http://localhost:8000/api/v1/properties/'
api_response = requests.get(api_url, headers=headers)

print(api_response.json())