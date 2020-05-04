from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


from .models import BlogPost
from .serializers import BlogPostSerializer

from logging import critical as log


class BlogPostList(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        blog_posts = BlogPost.objects.all()
        serializer = BlogPostSerializer(blog_posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogPostDetail(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, blog_post_id, format=None):
        blog_post = get_object_or_404(BlogPost, pk=blog_post_id)
        serializer = BlogPostSerializer(blog_post)
        return Response(serializer.data)

    def delete(self, request, blog_post_id, format=None):
        blog_post = get_object_or_404(BlogPost, pk=blog_post_id)
        if self.request.user.pk == blog_post.author.pk:
            blog_post.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class BlogPostByUSer(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, author_pk, format=None):
        blog_posts = BlogPost.objects.filter(author__pk=author_pk)
        serializer = BlogPostSerializer(blog_posts, many=True)
        return Response(serializer.data)
