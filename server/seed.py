from config import app,db
from models import Course,User,Instructor,Student,Enrollment
from faker import Faker
from random import randint, choice as rc
from sqlalchemy.exc import IntegrityError

faker=Faker()

with app.app_context():

    Enrollment.query.delete()
    Course.query.delete()
    Instructor.query.delete()
    Student.query.delete()
    User.query.delete()

    course_titles=["math","science","social studies","english","dance","basketball","swimming","art","music"]
    courses=[]
    for course_title in course_titles:
        course=Course(title=course_title)
        courses.append(course)
        db.session.add(course)
    db.session.commit()

    instructor_profile_pics=["https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg","https://www.masslive.com/resizer/kNl3qvErgJ3B0Cu-WSBWFYc1B8Q=/arc-anglerfish-arc2-prod-advancelocal/public/W5HI6Y4DINDTNP76R6CLA5IWRU.jpeg","https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B","https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"]
    instructors=[]
    for i in range(5):
        instructor=Instructor(fname=faker.first_name(),lname=faker.last_name(),age=randint(18,65),profile_pic=rc(instructor_profile_pics))
        instructors.append(instructor)
        db.session.add(instructor)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            print(e.args)

    for course in courses:
        course.instructor=rc(instructors)
    db.session.commit()

    students=[]
    student_profile_pics=["https://www.parentmap.com/sites/default/files/styles/1180x660_scaled_cropped/public/2021-10/iStock-1051247526_0.jpg?itok=sH1ct-hS","https://www.youthdynamics.org/wp-content/uploads/2017/11/teen-engage.png","https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe65a7d96-c713-11ec-81c0-e8eabc9951c2.jpg?crop=3065%2C2044%2C148%2C368","https://cdn2.momjunction.com/wp-content/uploads/2022/02/Important-Life-Lessons-For-Teenagers-To-Know-624x702.jpg"]
    for i in range(10):
        student=Student(fname=faker.first_name(),lname=faker.last_name(),age=randint(18,65),profile_pic=rc(student_profile_pics))
        students.append(student)
        db.session.add(student)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            print(e.args)

    for i in range(500):
        student=rc(students)
        course=rc(courses)
        if course not in student.courses:
            student.courses.append(course)
    db.session.commit()
