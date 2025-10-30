from flask import Flask, jsonify
from flask_cors import CORS
import json

# Initialize Flask App
app = Flask(__name__)
# Enable CORS for all domains and all routes during development
# IMPORTANT: Restrict this origin in production (e.g., to "http://your-nextjs-domain.com")
CORS(app) 

@app.route('/api/regions', methods=['GET'])
def get_regions():
    """
    Serves mock region data for the initial selection modal.
    """
    regions = [
        {"id": "R1", "name": "Northern Region", "centroid_lat": 37.77, "centroid_lng": -122.41},
        {"id": "R2", "name": "Central Plains", "centroid_lat": 38.5, "centroid_lng": -121.5},
        {"id": "R3", "name": "Coastal South", "centroid_lat": 36.5, "centroid_lng": -121.9},
        {"id": "R4", "name": "Highlands West", "centroid_lat": 39.0, "centroid_lng": -123.0},
        {"id": "R5", "name": "Desert East", "centroid_lat": 34.0, "centroid_lng": -118.0},
    ]
    return jsonify({
        "status": "success",
        "data": regions,
        "count": len(regions)
    })

@app.route('/api/map-data', methods=['GET'])
def get_map_data():
    """
    Serves mock coordinate data for the map component.
    """
    # Mock data structure (e.g., coordinates for markers)
    map_markers = [
        {"id": 1, "name": "Python Tower", "lat": 37.7749, "lng": -122.4194, "category": "home"},
        {"id": 2, "name": "Next.js Lighthouse", "lat": 37.8080, "lng": -122.4770, "category": "work"},
        {"id": 3, "name": "Flask Bay", "lat": 37.7600, "lng": -122.4500, "category": "fun"}
    ]
    
    # Return the data as a JSON response
    return jsonify({
        "status": "success",
        "data": map_markers,
        "count": len(map_markers)
    })

@app.route('/', methods=['GET'])
def home():
    """Simple root route to confirm the server is running."""
    return "Flask Backend Running on Port 5000."

if __name__ == '__main__':
    # Flask typically runs on port 5000
    print("Starting Flask server on http://127.0.0.1:5000")
    # You need to have flask-cors installed: pip install flask-cors
    app.run(debug=True, port=5000)
