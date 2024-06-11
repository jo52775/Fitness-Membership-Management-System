from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    firstname = db.Column(db.String(50), unique=False, nullable=False)
    lastname = db.Column(db.String(50), unique=False, nullable=False)
    birthday = db.Column(db.String(20), nullable=False)
    membership_type = db.Column(db.String(10), unique=False, nullable=False)
    workout_plan = db.Column(db.String(200), unique=False, nullable=True)

    def to_json(self):
        return{
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "email": self.email,
            "firstName": self.firstname,
            "lastName": self.lastname,
            "birthday": self.birthday,
            "membershipType": self.membership_type,
            "workoutPlan": self.workout_plan,
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), unique=False, nullable=False)
    user = db.Column(db.String(50), unique=False, nullable=True)

    def to_json(self):
        return{
            "id": self.id,
            "content": self.content,
            "user": self.user,
        }