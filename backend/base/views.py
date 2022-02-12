from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from .products import products
from .models import Product
from .serializers import ProductSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     token['username'] = user.username
    #     token['message'] = 'hello world'
    #     # ...

    #     return token
    def validate(self,attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


routes =[
    '/api/v1/products/',
'/api/v1/products/create',

'/api/v1/products/upload/',

'/api/v1/products/<id>/reviews/',

'/api/v1/products/top/',
'/api/v1/products/<id>/',

'/api/v1/products/delete/<id>/',
'/api/v1/products/<update>/<id>/',

]


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    # return Response(products)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    # product= None
    # for i in products:
    #     if i['_id']==pk :
    #         product=i
    #         break
    # return Response(product)
    product= Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)