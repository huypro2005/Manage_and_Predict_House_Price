from django.db import models
from apps.accounts.models import CustomUser
from ckeditor.fields import RichTextField

class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    content = RichTextField()
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_checked = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Comment(models.Model):
    article = models.ForeignKey(NewsArticle, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    answer = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    is_deleted = models.BooleanField(default=False)


    def __str__(self):
        return f"Comment by {self.author} on {self.article}"
    

class Source(models.Model):
    article = models.ForeignKey(NewsArticle, on_delete=models.CASCADE, related_name='sources')
    url = models.URLField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name