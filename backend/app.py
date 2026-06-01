from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

bus_data = {
    "AP39AB1234": {
        "lat": 16.3067,
        "lng": 80.4365
    }
}


@app.route("/")
def home():
    return "SmartBus AI Backend Running"

@app.route("/update_location", methods=["POST"])
def update_location():

    data = request.json

    print("DATA RECEIVED:", data)

    bus_no = data["busNo"]

    bus_data[bus_no] = {
        "lat": data["lat"],
        "lng": data["lng"]
    }

    return jsonify({
        "message": "Location Updated"
    })

@app.route("/get_location/<bus_no>")
def get_location(bus_no):

    if bus_no in bus_data:
        return jsonify(bus_data[bus_no])

    return jsonify({
        "error": "Bus not found"
    })

@app.route("/all")
def all_buses():
    return jsonify(bus_data)

# =========================
# AI CHATBOT
# =========================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json
    msg = data["message"].lower()

    if "where" in msg and "bus" in msg:
        return jsonify({
            "reply": "🚌 Bus AP39AB1234 is near Guntur. ETA: 8 Minutes."
        })

    elif "route" in msg:
        return jsonify({
            "reply": "🛣 Route: Vignan University → Guntur"
        })

    elif "eta" in msg:
        return jsonify({
            "reply": "⏱ ETA: 8 Minutes"
        })

    elif "driver" in msg:
        return jsonify({
            "reply": "👨‍✈️ Driver: Ramesh Kumar"
        })

    elif "attendance" in msg:
        return jsonify({
            "reply": "✅ Attendance Marked Successfully"
        })

    elif "fee" in msg or "paid" in msg:
        return jsonify({
            "reply": "💳 Fee Status: Paid"
        })

    elif "seat" in msg:
        return jsonify({
            "reply": "💺 Available Seats: 12"
        })

    else:
        return jsonify({
            "reply": "🤖 I can help with bus location, routes, ETA, attendance, fee status, seats and driver details."
        })

if __name__ == "__main__":
    app.run(debug=True)