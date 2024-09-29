from flask import Flask, render_template, request
# import google.auth
import google.generativeai as genai

app = Flask(__name__, template_folder='templates')

# Replace with your Gemini API key
api_key = "AIzaSyDCesVi75w54e6UlABW2f4CJfUvqY00sSA"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_plan', methods=['POST'])
def generate_plan():
    name = request.form['name']
    age = int(request.form['age'])

    if not name or age <= 0:
        return render_template('index.html', error_message="Please provide valid input.")

    # Prepare data for Gemini API request
    data = {
        "inputs": [
            {
                "age": age,
                "name": name  # Include name for personalized recommendations
            }
        ]
    }

    # Configure Gemini API
    genai.configure(api_key=api_key)
    print("Hi")

    # Send the request to the Gemini API
    model = genai.GenerativeModel("gemini-1.5-flash")
    try:
        response = model.generate_content(prompt="Generate a personalized study plan for a user named {name} who is {age} years old.", inputs=data)
    except Exception as e:
        print(e)
        return render_template('error.html', error_message=f"An error occurred: {e}")

    # Extract predicted disability category, study time, focus areas, and additional support
    # (Replace these placeholders with the actual fields returned by your Gemini model's output)
    predicted_category = response.text.split("Category: ")[1].split(",")[0]
    recommended_study_time = response.text.split("Recommended Study Time: ")[1].split(",")[0]
    focus_areas = response.text.split("Focus Areas: ")[1].split(",")[0]
    additional_support = response.text.split("Additional Support: ")[1].split(",")[0]

    return render_template(
        'result.html',
        name=name,
        age=age,
        predicted_category=predicted_category,
        recommended_study_time=recommended_study_time,
        focus_areas=focus_areas,
        additional_support=additional_support
    )

if __name__ == '__main__':
    app.run(debug=True)