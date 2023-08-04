from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import re


class Course(db.Model,SerializerMixin):

    __tablename__="courses"

    id=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String,nullable=False,unique=True)
    instructor_id=db.Column(db.Integer,db.ForeignKey("instructors.user_id"))

    instructor=db.relationship("Instructor",back_populates="courses")
    
    enrollments=db.relationship("Enrollment",back_populates="course")
    students=association_proxy("enrollments","student",creator=lambda student: Enrollment(student=student) )

    serialize_rules=("-instructor.courses","-instructor.age","-instructor_id","-enrollments.course")

    @validates("title")
    def validate_title(self,key,value):
        if(type(value)!=str):
            raise ValueError(f"{key} must be a string")
        if(not re.fullmatch("^[\w\d\s]{1,25}$",value)):
            raise ValueError(f"{key} must contain 1 to 25 alphanumeric characters inclusive")
        return value
    
    @validates("instructor_id")
    def validate_instructor_id(self,key,value):
        if(type(value)!=int):
            raise ValueError(f"{key} must be an integer")
        return value

class User(db.Model,SerializerMixin):

    __tablename__="users"
    __table_args__=(db.CheckConstraint("age>=18 and age<=65",name="age_check_constraint"),)

    id=db.Column(db.Integer,primary_key=True)
    fname=db.Column(db.String,nullable=False)
    lname=db.Column(db.String,nullable=False)
    age=db.Column(db.Integer,nullable=False)
    profile_pic=db.Column(db.String)

    @validates("fname","lname")
    def validate_name(self,key,value):
        if(type(value)!=str):
            raise ValueError(f"{key} must be a string")
        if(not re.fullmatch("^[\w\d\s]{1,25}$",value)):
            raise ValueError(f"{key} must contain 1 to 25 alphanumeric characters inclusive")
        return value
    
    @validates("age")
    def validate_age(self,key,value):
        if(type(value)!=int):
            raise ValueError(f"{key} must be an integer")
        if(value<18 or value>65):
            raise ValueError(f"{key} must be 18 to 65 inclusive")
        return value


class Instructor(User,SerializerMixin):

    __tablename__="instructors"

    user_id=db.Column(db.Integer,db.ForeignKey("users.id"),primary_key=True)
    tenured=db.Column(db.Boolean, default=False)

    courses=db.relationship("Course",back_populates="instructor")

    serialize_rules=("-courses.instructor","-user_id")

class Student(User,SerializerMixin):

    __tablename__="students"

    user_id=db.Column(db.Integer,db.ForeignKey("users.id"),primary_key=True)
    active=db.Column(db.Boolean,nullable=False,default=True)

    
    enrollments=db.relationship("Enrollment",back_populates="student")
    courses=association_proxy("enrollments","course",creator=lambda course: Enrollment(course=course))

    serialize_rules=("-courses.students","-enrollments.student","-user_id")

class Enrollment(db.Model,SerializerMixin):

    __tablename__="enrollments"

    student_id=db.Column(db.Integer,db.ForeignKey("students.user_id"),primary_key=True)
    course_id=db.Column(db.Integer,db.ForeignKey("courses.id"),primary_key=True)
    date=db.Column(db.DateTime,nullable=False,default=db.func.now())

    student=db.relationship("Student",back_populates="enrollments")
    course=db.relationship("Course",back_populates="enrollments")

    serialize_only=("date","student.id","student.fname","student.profile_pic","student.lname","course.title","course.id","course.instructor")

    @validates("student_id","course_id")
    def validate_info(self,key,value):
        if(type(value)!=int):
            raise ValueError(f"{key} must be an integer")
        return value
    


# enrollments=db.Table("enrollments",
#                      db.Column("student_id",db.ForeignKey("students.user_id"),primary_key=True),
#                      db.Column("course_id",db.ForeignKey("courses.id"),primary_key=True),
#             )
