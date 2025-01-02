from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import time
from dotenv import load_dotenv
from aixplain.factories import PipelineFactory

def configure():
    load_dotenv()

configure()

app = Flask(__name__)
CORS(app)

pipeline = PipelineFactory.get("6775d5c625ed6ea48aa6fcc3")
os.environ["TEAM_API_KEY"] = os.getenv("TEAM_API_KEY")

user_cooldowns = {}

@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_ip = request.remote_addr
        user_agent = request.headers.get("User-Agent", "unknown")
        unique_user_key = f"{user_ip}-{user_agent}"
        current_time = time.time()

        if unique_user_key in user_cooldowns:
            time_since_last_request = current_time - user_cooldowns[unique_user_key]
            if time_since_last_request < 600:
                remaining_time = int(600 - time_since_last_request)
                return jsonify({"error": f"Cooldown active. Please wait {remaining_time} seconds."}), 429

        user_cooldowns[unique_user_key] = current_time

        data = request.json
        question = data.get("question", "")

        if not question:
            return jsonify({"error": "Question is required"}), 400

        query = f"""
        I need help with my studies. Can you please help me? I need help with:
        {question}

        Please answer in a response that is understandable and use common language.
        """

        result = pipeline.run(query)
        output_url = result["data"][0]["segments"][0]["response"]

        response = requests.get(output_url)
        content = response.text

        return jsonify({"answer": content, "processing": False})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occurred while processing your request."}), 500

@app.route("/cooldown", methods=["GET"])
def get_cooldown():
    user_ip = request.remote_addr
    user_agent = request.headers.get("User-Agent", "unknown")
    unique_user_key = f"{user_ip}-{user_agent}"

    if unique_user_key in user_cooldowns:
        current_time = time.time()
        time_since_last_request = current_time - user_cooldowns[unique_user_key]
        remaining_time = max(0, int(600 - time_since_last_request))
        return jsonify({"cooldown": remaining_time})

    return jsonify({"cooldown": 0})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=False)
