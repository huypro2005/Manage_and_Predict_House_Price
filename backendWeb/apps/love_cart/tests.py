from django.test import TestCase

# Create your tests here.

import redis
import redis

r = redis.Redis(
    host='redis-15571.crce185.ap-seast-1-1.ec2.redns.redis-cloud.com',
    port=15571,
    decode_responses=True,
    username="default",
    password="KtwBw2yH7kOZux4T4F7RnbmWxPEWfUvX",
)

success = r.set('foo', 'bar')
# True

result = r.get('foo')
print(result)