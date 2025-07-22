from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_user_type')

    def get_user_type(self, obj):
        return obj.profile.user_type if hasattr(obj, 'profile') else 'No Profile'
    get_user_type.short_description = 'User Type'

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
