from django.contrib import admin
from .models import Member


# đăng ký mô hình member trong trang admin
class MemberAdmin(admin.ModelAdmin):
    list_display = "name", "description", "type"


admin.site.register(Member, MemberAdmin)
from django.contrib import admin

# Register your models here.
