from rest_framework.permissions import BasePermission, SAFE_METHODS

class AdminGetListOrUserCreateAccountPermission(BasePermission):
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_staff and request.user.is_active):
            return True
        return bool(request.method in ('POST'))
    

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_staff and request.user.is_active):
            return True
        return bool(request.method in SAFE_METHODS)

class IsAuthenticatedUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_active)

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff and request.user.is_active)


class IsAuthenticatedOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_active)
    

class IsAdminOrIsAuthenticated(BasePermission):
    
    def has_permission(self, request, view):
        return bool(request.user and (request.user.is_staff or request.user.is_authenticated))