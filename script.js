// script.js
function calculateWaitTimes() {
    const gameMode = document.getElementById("gameMode").value;
    const numMatches = parseInt(document.getElementById("numMatches").value);

    const waitTimes = {
        "PMC": {min: 2.5, max: 5},
        "Scav": {min: 2.5, max: 10},
    };

    // Math formulas as hover titles
    const optimisticFormula = `Min time + 0.25 * (Max time - Min time) = ${waitTimes[gameMode].min} + 0.25 * (${waitTimes[gameMode].max} - ${waitTimes[gameMode].min})`;
    const pessimisticFormula = `Max time - 0.25 * (Max time - Min time) = ${waitTimes[gameMode].max} - 0.25 * (${waitTimes[gameMode].max} - ${waitTimes[gameMode].min})`;

    // Estimate when most matches are quick
    const optimisticEstimateMinutes = waitTimes[gameMode].min * numMatches + (waitTimes[gameMode].max - waitTimes[gameMode].min) * 0.25 * numMatches;
    // Estimate when most matches take longer
    const pessimisticEstimateMinutes = waitTimes[gameMode].max * numMatches - (waitTimes[gameMode].max - waitTimes[gameMode].min) * 0.25 * numMatches;

    // Convert minutes to hours
    const optimisticEstimateHours = optimisticEstimateMinutes / 60;
    const pessimisticEstimateHours = pessimisticEstimateMinutes / 60;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p title="${optimisticFormula}">If Most Matching Took Less Time: ${optimisticEstimateMinutes.toFixed(2)} minutes (${optimisticEstimateHours.toFixed(2)} hours)</p>
        <p title="${pessimisticFormula}">If Most Matching Took More Time: ${pessimisticEstimateMinutes.toFixed(2)} minutes (${pessimisticEstimateHours.toFixed(2)} hours)</p>
    `;
}
