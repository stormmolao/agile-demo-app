from flask_sqlalchemy import SQLAlchemy
from app import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///agile.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.teardown_appcontext
def teardown_db(exception):
    if db is not None:
        db.session.remove()

class AgileValues(db.Model):
    __tablename__ = 'AGILE_VALUES'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True)
    content = db.Column(db.String(1000), unique=True)

    def __init__(self, title=None, content=None):
        self.title = title
        self.content = content

    def __repr__(self):
        return '<AgileValues %r>' % (self.title)

class AgilePrinciples(db.Model):
    __tablename__ = 'AGILE_PRINCIPLES'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True)
    content = db.Column(db.String(1000), unique=True)

    def __init__(self, title=None, content=None):
        self.title = title
        self.content = content

    def __repr__(self):
        return '<AgilePrinciples %r>' % (self.title)