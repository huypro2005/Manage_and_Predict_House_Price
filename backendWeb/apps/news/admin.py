from django.contrib import admin
from .models import NewsArticle, Comment, Source


admin.site.register(Comment)
admin.site.register(Source)

@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'is_approved', 'is_checked')
    search_fields = ('title', 'author__username')
    list_filter = ('is_approved', 'created_at', 'author', 'is_checked')
    actions = ['approve_articles']

    def approve_articles(self, request, queryset):
        queryset.update(is_approved=True, is_checked=True)
        self.message_user(request, f'Approved {queryset.count()} articles.')
    
    approve_articles.short_description = "Approve selected articles"
