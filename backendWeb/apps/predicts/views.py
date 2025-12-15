from django.shortcuts import render
from rest_framework import status   
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializer import DashboardSerializer, PredictRequestSerializer
from .models import Dashboard, PredictRequest
from django.http import Http404
import joblib as jl
from django.db import transaction
import os
from django.conf import settings
import json
import pandas as pd
# Create your views here.

model_path = os.path.join(settings.BASE_DIR, 'apps/predicts/model_ai/model1.pkl')
model = jl.load(model_path)

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    
    def get(self, request):
        dashboard = Dashboard.objects.get(user=request.user)
        serializer = DashboardSerializer(dashboard)
        return Response(serializer.data)

    def put(self, request):
        dashboard = Dashboard.objects.get(user=request.user)
        serializer = DashboardSerializer(dashboard, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ListPredictRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get_dashboard(self):
        return Dashboard.objects.get(user=self.request.user)

    def get(self, request):
        predict_requests = PredictRequest.objects.filter(user=request.user)
        serializer = PredictRequestSerializer(predict_requests, many=True)
        return Response(serializer.data)
    

    '''
    Hiện tại chưa giới hạn số lần dự đoán
    sau này sẽ thêm giới hạn cho người dùng thường
    commented code liên quan đến giới hạn đã được giữ lại trong phần dưới đây
    '''
    @transaction.atomic
    def post(self, request):
        dashboard = self.get_dashboard()
        # if dashboard.countRemain > 0 or dashboard.Is_premium:
        serializer = PredictRequestSerializer(data=request.data)
        if serializer.is_valid():
            input_data = serializer.validated_data['input_data']
            df = pd.DataFrame({
                'loại nhà đất': [int(input_data['loại nhà đất'])],
                'mã huyện': [int(input_data['mã huyện'])],
                'diện tích': [float(input_data['diện tích'])],
                'mặt tiền': [float(input_data['mặt tiền'])],
                'phòng ngủ': [int(input_data['phòng ngủ'])],
                'pháp lý': [int(input_data['pháp lý'])],
                'tọa độ x': [input_data['tọa độ x'] * 1000000000],
                'tọa độ y': [input_data['tọa độ y'] * 1000000000],
                'số tầng': [int(input_data['số tầng'])],
                'mã tỉnh': [int(input_data['mã tỉnh'])],
            })
            prediction = model.predict(df)
            predicted_price_per_m2 = prediction[0]
            predicted_total_price = predicted_price_per_m2 * input_data['diện tích']
            serializer.save(user=request.user, dashboard=dashboard, predict_result=predicted_total_price, predict_price_per_m2=predicted_price_per_m2)
            # if not dashboard.Is_premium:
            #     dashboard.countRemain -= 1
            #     dashboard.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     return Response({"detail": "No remaining predictions."}, status=status.HTTP_403_FORBIDDEN)
        

    
class PredictRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def getPredictRequest(self, pk):
        try:
            return PredictRequest.objects.filter(pk=pk, user=self.request.user).first()
        except PredictRequest.DoesNotExist:
            raise Http404("Predict request not found")
        
    def get(self, request, pk):
        predict_request = self.getPredictRequest(pk)
        serializer = PredictRequestSerializer(predict_request)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        predict_request = self.getPredictRequest(pk)
        if predict_request:
            predict_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"detail": "Predict request not found."}, status=status.HTTP_404_NOT_FOUND)