# Django 컨테이너 생성용 Dockerfile
FROM python:3.10

WORKDIR /app

# 필수 패키지 설치
RUN pip install --upgrade pip

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]