from flask import request, jsonify
from config import app, db
from models import User, Review

# Get all users
@app.route("/getUsers", methods=["GET"])
def get_all_users():
    users_in_json = []
    users = User.query.all()

    for user in users:
        users_in_json.append(user.to_json())
    
    return jsonify({"users" : users_in_json})

# Get all reviews
@app.route("/getReviews", methods=["GET"])
def get_all_reviews():
    reviews_in_json = []
    reviews = Review.query.all()

    for review in reviews:
        reviews_in_json.append(review.to_json())
    
    return jsonify({"reviews" : reviews_in_json})

# Get User Information
@app.route("/getUserInfo", methods=["POST"])
def get_user_info():
    username = request.json.get("username")
    userInfo = User.query.filter_by(username = username).first()
    userInfo_in_json = userInfo.to_json()
    
    return jsonify({"userInfo" : userInfo_in_json})

# Login
@app.route("/login", methods=["POST"])
def login():
    usernameLogin = request.json.get("username")
    passwordLogin = request.json.get("password")

    if not usernameLogin or not passwordLogin:
        return jsonify({"message": "Please fill username and password fields"}), 400
    
    user = User.query.filter_by(username=usernameLogin, password=passwordLogin).first()

    if user is not None:
        return jsonify({"loginStatus": "success"})
        
    else:
        return jsonify({"loginStatus": "failed"})

# Register new user
@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")
    email = request.json.get("email")
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    birthday = request.json.get("birthday")
    membership_type = request.json.get("membershipType")

    if not username or not password or not email or not first_name or not last_name or not birthday or not membership_type:
        return jsonify({"message": "Unfilled"}), 400

    new_user = User(username = username, password = password, email = email, firstname = first_name, lastname = last_name, birthday = birthday,
                    membership_type = membership_type)

    try:
        db.session.add(new_user)
        db.session.commit()

    except Exception:
        return jsonify({"message": "Username/email already taken"}), 400
    
    return jsonify({"message":"Registered!"})

# Post a review
@app.route("/postReview", methods=["POST"])
def post_review():
    content = request.json.get("content")
    user = request.json.get("username")

    if(content == ""):
        return jsonify({"message":"Nothing entered"})
    
    new_review = Review(content = content, user = user)
    
    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message":"Review posted!"})

# Add/update a workout plan
@app.route("/addWorkoutPlan", methods=["PATCH"])
def add_workout_plan():
    workout_plan = request.json.get("workoutPlan")
    username = request.json.get("username")

    plan_user = User.query.filter_by(username=username).first()

    plan_user.workout_plan = workout_plan
    db.session.commit()

    return jsonify({"message":"Workout plan added!"})

# Update User's Password
@app.route("/updatePassword", methods=["PATCH"])
def update_user_information():
    username = request.json.get("username")
    password = request.json.get("newPassword")
    updated_user = User.query.filter_by(username= username).first()

    if(password == ""):
        return jsonify({"message":"Empty field"})
    
    if(password == updated_user.password):
        return jsonify({"message":"New password is Old password"})
    
    else:
        updated_user.password = password
        db.session.commit()
        return jsonify({"message":"Password Successfully Updated!"})

# Delete All Reviews
@app.route("/deleteReviews", methods=["DELETE"])
def delete_reviews():
    reviews = Review.query.all()
    for item in reviews:
        db.session.delete(item)
    db.session.commit()
    return jsonify({"message" : "deleted reviews"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)