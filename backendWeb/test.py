"""Basic connection example.
"""

import redis
import os
from dotenv import load_dotenv
load_dotenv()

print(os.environ.get('PORT_REDIS'))
print(os.environ.get('HOST_REDIS'))
r = redis.Redis(
    host=os.environ.get('HOST_REDIS'),
    port=int(os.environ.get('PORT_REDIS')),
    decode_responses=True,
    username=os.environ.get('USERNAME_REDIS'),
    password=os.environ.get('PASSWORD_REDIS'),
)

success = r.set('foo', 'bar')
# True

result = r.get('foo')
print(result)
# >>> bar

