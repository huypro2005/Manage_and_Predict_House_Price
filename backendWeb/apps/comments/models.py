from django.db import models
from apps.accounts.models import CustomUser
from apps.news.models import NewsArticle

# Create your models here.
class Comment(models.Model):
    article = models.ForeignKey(NewsArticle, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    answer = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    is_deleted = models.BooleanField(default=False)


    class Meta:
        db_table='comment'

    def __str__(self):
        return f"Comment by {self.author} on {self.article}"