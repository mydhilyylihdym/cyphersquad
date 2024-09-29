document.getElementById("generatePlan").addEventListener("click", function() {
    // User Input
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    
    if (!name || isNaN(age)) {
        alert("Please provide valid input.");
        return;
    }

    // Mental Disability Categories
    const disabilityCategories = {
        "Mild": [0.5, 0.7],
        "Moderate": [0.2, 0.5],
        "Severe": [0, 0.2]
    };

    // Generate random attempted and correct questions
    const attempted = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    const correct = Math.floor(Math.random() * (attempted + 1));

    // Study Plan Generator
    function generateStudyPlan(attempted, correct) {
        const accuracy = correct / attempted;
        let category = "";

        for (let cat in disabilityCategories) {
            let range = disabilityCategories[cat];
            if (accuracy >= range[0] && accuracy < range[1]) {
                category = cat;
                break;
            }
        }

        if (category === "") {
            category = "No Disability Detected";
        }

        let studyPlan = {
            "Category": category,
            "Recommended Study Time": `${Math.floor(accuracy * 10)} hours/week`,
            "Focus Areas": [],
            "Additional Support": ""
        };

        if (category !== "No Disability Detected") {
            studyPlan.FocusAreas = ["Memory Enhancement", "Concentration Improvement"];
            studyPlan.AdditionalSupport = "Special Education Resources";
        }

        return studyPlan;
    }

    // Generate the study plan
    const studyPlan = generateStudyPlan(attempted, correct);

    // Output the results
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
        <h3>Study Plan for ${name}</h3>
        <p>Age: ${age}</p>
        <p>Number of Questions Attempted: ${attempted}</p>
        <p>Number of Questions Correctly Answered: ${correct}</p>
        <p>Accuracy: ${(correct / attempted).toFixed(2)}</p>
        <p>Category: ${studyPlan.Category}</p>
        <p>Recommended Study Time: ${studyPlan["Recommended Study Time"]}</p>
        <p>Focus Areas: ${studyPlan.FocusAreas.length ? studyPlan.FocusAreas.join(", ") : "None"}</p>
        <p>Additional Support: ${studyPlan.AdditionalSupport || "None"}</p>
    `;
});
