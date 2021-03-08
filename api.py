from flask import jsonify, request
from flask_cors import CORS
from app import app
import service

CORS(app)

@app.route("/agile/value", methods=["GET"])
def get_agile_values():
    try:
        return jsonify(service.get_agile_values()), 200
    except Exception as e:
        return {"message": str(e)}, 400

@app.route("/agile/value", methods=["POST"])
def add_agile_value():
    print(request.json)
    try:
        service.add_agile_value(request.json)
        return { "message": "Created" }, 201
    except Exception as e:
        return { "message": str(e) }, 400

@app.route("/agile/value/<int:agile_value_id>", methods=["PUT"])
def update_agile_value(agile_value_id):
    try:
        service.update_agile_value(agile_value_id, request.json)
        return { "message": "Updated" }, 200
    except Exception as e:
        return { "message": str(e) }, 400

@app.route("/agile/value/<int:agile_value_id>", methods=["DELETE"])
def delete_agile_value(agile_value_id):
    try:
        service.delete_agile_value(agile_value_id)
        return { "message": "Deleted" } , 204
    except Exception as e:
        return { "message": str(e) }, 400

@app.route("/agile/principle", methods=["GET"])
def get_agile_principles():
    try:
        return jsonify(service.get_agile_principles()), 200
    except Exception as e:
        return {"message": str(e)}, 400

@app.route("/agile/principle", methods=["POST"])
def add_agile_principle():
    try:
        service.add_agile_principle(request.json)
        return { "message": "Created" }, 201
    except Exception as e:
        return { "message": str(e) }, 400

@app.route("/agile/principle/<int:agile_principle_id>", methods=["PUT"])
def update_agile_principle(agile_principle_id):
    try:
        service.update_agile_principle(agile_principle_id, request.json)
        return { "message": "Updated" }, 200
    except Exception as e:
        return { "message": str(e) }, 400

@app.route("/agile/principle/<int:agile_principle_id>", methods=["DELETE"])
def delete_agile_principle(agile_principle_id):
    try:
        service.delete_agile_principle(agile_principle_id)
        return { "message": "Deleted" } , 204
    except Exception as e:
        return { "message": str(e) }, 400


if __name__ == '__main__':
    app.run(debug=True)