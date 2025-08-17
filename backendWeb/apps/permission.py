from rest_framework.permissions import BasePermission, SAFE_METHODS

class AdminGetListOrUserCreateAccountPermission(BasePermission):
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_staff):
            return True
        return bool(request.method in ('POST'))
    

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_staff):
            return True
        return bool(request.method in SAFE_METHODS)
    
