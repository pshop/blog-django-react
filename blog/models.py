from django.db import models

from authentication.models import CustomUser


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    publication_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    author = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE, related_name="posts")
