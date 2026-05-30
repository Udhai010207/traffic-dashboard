from flask import Flask, render_template, jsonify
import random
import pandas as pd

app = Flask(__name__)

# Initial traffic data

# LOAD ROADS FROM CSV DATASET

dataset = pd.read_csv("traffic.csv")

roads = dataset['road_name'].tolist()
hours = dataset['hour'].tolist()

# Home page

@app.route('/')
def home():
    return render_template('index.html')

# Live traffic API

@app.route('/traffic_data')
def traffic_data():

    data = []

    for road, hour in zip(roads, hours):

        vehicle_count = random.randint(50, 500)

        if vehicle_count > 350:
            congestion = "High"

        elif vehicle_count > 200:
            congestion = "Medium"

        else:
            congestion = "Low"

        data.append({
            "road": road,
            "hour": hour,
            "vehicles": vehicle_count,
            "congestion": congestion
        })
        
    df = pd.DataFrame(data)

    df.to_csv("traffic.csv", index=False)

    

    return jsonify(data)

# Run server

if __name__ == '__main__':
    app.run(debug=True)