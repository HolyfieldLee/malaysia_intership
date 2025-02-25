import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Resource, CourseOffer

class Command(BaseCommand):
    help = "Load data from Excel into database"

    def handle(self, *args, **kwargs):
        resource_file = "/app/data/RESOURCE.xlsx"
        offer_file = "/app/data/OFFER.xlsx"

        # ✅ Resource 데이터 로드
        resource_df = pd.read_excel(resource_file)
        for _, row in resource_df.iterrows():
            Resource.objects.update_or_create(
                resource_code=row["Resource Code"],
                defaults={
                    "campus": row["Campus"],
                    "description": row["Description"],
                    "capacity": row["Capacity"],
                    "lecture": row["Lecture"] == "Y",
                    "tutorial": row["Tutorial"] == "Y",
                    "lab": row["Lab"] == "Y",
                    "workshop": row["Workshop"] == "Y",
                    "resource_status": row["Resource Status"],
                }
            )

        # ✅ CourseOffer 데이터 로드
        offer_df = pd.read_excel(offer_file)
        for _, row in offer_df.iterrows():
            CourseOffer.objects.update_or_create(
                course_code=row["CourseCode"],
                defaults={
                    "faculty_code": row["FacultyCode"],
                    "session": row["Session"],
                    "capacity": row["Capacity"],
                    "min_per_session": row["Min Per Session"],
                    "lecturer": row["Lecturer"],
                }
            )

        self.stdout.write(self.style.SUCCESS("✅ 데이터베이스에 데이터가 성공적으로 저장되었습니다!"))