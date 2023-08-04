from config import app,db,fk_connect
from models import Course,User,Instructor,Student,Enrollment
from flask import request
from sqlalchemy.exc import IntegrityError
from sqlalchemy import event
from sqlalchemy import or_

@app.route("/courses",methods=["GET","POST"])
def courses():
    if(request.method=="GET"):
        all=Course.query.order_by(Course.title).all()
        courses=[]
        for course in all:
            courses.append(course.to_dict(only=("id","title",)))
        return courses
    elif(request.method=="POST"):
        data=request.json
        course=Course()
        try:
            for attr in data:
                setattr(course,attr,data[attr])
            db.session.add(course)
            db.session.commit()
            return course.to_dict(),201
        except (IntegrityError,ValueError) as ie:
            return {"error":ie.args},422

@app.route("/courses/<int:id>",methods=["GET","PATCH","DELETE"])
def course_by_id(id):
    course=Course.query.filter(Course.id==id).first()
    if course==None:
        return {}, 404
    if(request.method=="GET"):
        return course.to_dict(rules=("-instructor.tenured","-instructor.user_id"))
    if(request.method=="PATCH"):
        data=request.json
        try:
            for attr in data:
                setattr(course,attr,data[attr])
            db.session.commit()
            return course.to_dict(),200
        except (IntegrityError,ValueError) as ie:
            return {"error":ie.args},422
    with app.app_context():
        if "sqlite" in app.config['SQLALCHEMY_DATABASE_URI']:
            event.listen(db.engine,"connect",fk_connect)
        try:
            db.session.delete(course)
            db.session.commit()
            return {},204
        except (IntegrityError,ValueError) as ie:
            return {"error":ie.args},422

@app.route("/instructors",methods=["GET","POST"])
def instructors():
    if(request.method=="GET"):
        all=Instructor.query.all()
        instructors=[]
        for instructor in all:
            instructors.append(instructor.to_dict(only=("id","fname","lname","profile_pic")))
        return instructors
    else:
        instructor=Instructor()
        with app.app_context():
            if "sqlite" in app.config['SQLALCHEMY_DATABASE_URI']:
                event.listen(db.engine,"connect",fk_connect)
                data=request.json
                try:
                    for attr in data:
                        setattr(instructor,attr,data[attr])
                    db.session.add(instructor)
                    db.session.commit()
                    return instructor.to_dict(),201
                except (IntegrityError,ValueError) as ie:
                    return {"error":ie.args},422
    

@app.route("/instructors/<int:id>",methods=["GET","PATCH",'DELETE'])
def instructor_by_id(id):
   instructor=Instructor.query.filter(Instructor.id==id).first()
   if not instructor:
       return {},404
   if(request.method=="GET"):
    return instructor.to_dict()
   if(request.method=="PATCH"):
       data=request.json
       try:
        for attr in data:
            setattr(instructor,attr,data[attr])
        db.session.commit()
        return instructor.to_dict(),200
       except (IntegrityError,ValueError) as ie:
           return {"error":ie.args},422
   with app.app_context():
    if "sqlite" in app.config['SQLALCHEMY_DATABASE_URI']:
        event.listen(db.engine,"connect",fk_connect)
    try:
        db.session.delete(instructor)
        db.session.commit()
        return {},204
    except (IntegrityError,ValueError) as ie:
        return {"error":ie.args},422

@app.route("/students",methods=["GET","POST"])
def students():
    if(request.method=="GET"):
        all=Student.query.all()
        students=[]
        for student in all:
            students.append(student.to_dict(only=("fname","lname","id","profile_pic")))
        return students
    else:
        student=Student()
        data=request.json
        with app.app_context():
            if "sqlite" in app.config['SQLALCHEMY_DATABASE_URI']:
                event.listen(db.engine,"connect",fk_connect)
            try:
                for attr in data:
                    setattr(student,attr,data)
                db.session.add(student)
                db.session.commit()
                return student.to_dict(),201
            except (IntegrityError,ValueError) as ie:
                return {"error":ie.message},422

@app.route("/students/<int:id>",methods=["GET","PATCH","DELETE"])
def get_student_by_id(id):
    student=Student.query.filter(Student.id==id).first()
    if not student:
        return {},404
    if(request.method=="GET"):
        return student.to_dict()
    if(request.method=="PATCH"):
        data=request.json
        try:
            for attr in data:
                setattr(student,attr,data)
            db.session.commit()
            return student.to_dict()
        except (IntegrityError,ValueError) as ie:
            return {"error":ie.args},422
    with app.app_context():
        if "sqlite" in app.config['SQLALCHEMY_DATABASE_URI']:
            event.listen(db.engine,"connect",fk_connect)
        try:
            db.session.delete(student)
            db.session.commit()
            return {},204
        except (IntegrityError,ValueError) as ie:
            return {"error":ie.args},422
    
    

@app.route("/enrollments",methods=["POST"])
def enrollments():
    data=request.json
    if "student_id" not in data or ("course_id" not in data and "title" not in data):
        return {"error":"You must include include student id and course id/title"},422
    with app.app_context():
        if "sqlite" in app.config['SQLALCHEMY_DATABASE_URI']:
            event.listen(db.engine,"connect",fk_connect)
        course=Course.query.filter(or_(Course.id==data.get("course_id"),Course.title==data.get("title"))).first()
        if not course:
            return {"error":"course does not exist"},404
        enrollment=Enrollment(student_id=data['student_id'],course_id=course.id)
        db.session.add(enrollment)
        try:
            db.session.commit()
            return enrollment.to_dict(),201
        except (IntegrityError,ValueError) as ie:
            return {"error":ie.args},422
    
@app.route("/enrollments/<int:student_id>:<string:course_title>",methods=["DELETE"])
def enrollment_by_student_id_and_course_title(student_id,course_title):
    course=Course.query.filter(Course.title==course_title).first()
    if not course:
        return {"error":"course does not exist"},404
    enrollment=Enrollment.query.filter(Enrollment.student_id==student_id,Enrollment.course_id==course.id).first()
    if not enrollment:
        return {"error":"You are not enrolled in this course"},404
    try:
        db.session.delete(enrollment)
        db.session.commit()
        return {},204
    except (IntegrityError,ValueError) as ie:
        return {"error":ie.args},422
    


