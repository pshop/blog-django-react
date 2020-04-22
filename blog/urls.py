from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import BlogPostList, BlogPostByUSer, BlogPostDetail

urlpatterns = [
    path('blogposts', BlogPostList.as_view()),
    path('blogposts/post/<int:blog_post_id>', BlogPostDetail.as_view()),
    path('blogposts/author/<int:author_pk>', BlogPostByUSer.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)