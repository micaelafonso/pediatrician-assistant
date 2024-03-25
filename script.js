let response = fetch("statistics.json"); 
let parsed = {};
response.then((response) => {
    return response.json();
}).then((json) => {
    parsed = json;
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the user's preferred language
    const userLanguage = navigator.language || navigator.userLanguage;

    // Set up language-specific content
    const content = {

        'en': { boyStr: "Boy", girlStr: "Girl", dateStr: 'Date:', percentile: 'Percentile', weightStr: 'Weight:', heightStr: 'Height:', headCircumferenceStr: 'Head Circumference:', bmiStr: 'BMI:', yearsStr: "Years:", monthsStr: "Months:" },

        'pt': { boyStr: "Rapaz", girlStr: "Rapariga", dateStr: 'Data:', percentile: 'Percentil', weightStr: 'Peso:', heightStr: 'Altura:', headCircumferenceStr: 'Perímetro cefálico:', bmiStr: 'IMC:', yearsStr: "Anos:", monthsStr: "Meses:" },

        // Add more languages as needed
    };

    // Set default language if the user's language is not supported
    const defaultLanguage = 'en';

    // Update content based on the user's language
    const userContent = content[userLanguage] || content[defaultLanguage];

    // Update HTML elements with language-specific content
    document.getElementById('boyStr').innerText = userContent.boyStr;
    document.getElementById('girlStr').innerText = userContent.girlStr;
    document.getElementById('dateStr').innerText = userContent.dateStr;
    document.getElementById('percentile').innerText = userContent.percentile;
    document.getElementById('weightStr').innerText = userContent.weightStr;
    document.getElementById('heightStr').innerText = userContent.heightStr;
    document.getElementById('headCircumferenceStr').innerText = userContent.headCircumferenceStr;
    document.getElementById('bmiStr').innerText = userContent.bmiStr;
    document.getElementById('yearsStr').innerText = userContent.yearsStr;
    document.getElementById('monthsStr').innerText = userContent.monthsStr;

});


let gender = "boys";
let weight = 0;
let height = 1;

let months = 0;
let days = 0;
let hc = 0;

radiobtn = document.getElementById("male");
radiobtn.checked = true;

let boyBackgroundColor = "#D9EDF8";

let girlBackgroundColor = "#F2C6DE";
document.body.style.backgroundColor = boyBackgroundColor;

document.getElementById('date').addEventListener('input', (e) => {
    date = new Date(e.target.value);

    var difference = Date.now() - date.getTime();

    days = Math.round(difference / 1000 / 60 / 60 / 24);

    months = Math.round(days / 30);
    document.getElementById('years').innerText = 0;
    document.getElementById('months').innerText = 0;
    performAllCalculations();
});

document.getElementById('male').addEventListener('change', (e) => {
    document.body.style.backgroundColor = boyBackgroundColor;
    gender = "boys";
    performAllCalculations();

});

document.getElementById('female').addEventListener('change', (e) => {
    document.body.style.backgroundColor = girlBackgroundColor;

    gender = "girls";
    performAllCalculations();
});


document.getElementById('height').addEventListener('input', (e) => {
    height = e.target.value;
    performAllCalculations();

});

document.getElementById('weight').addEventListener('input', (e) => {
    weight = e.target.value;
    performAllCalculations();

});

document.getElementById('headCircumference').addEventListener('input', (e) => {
    hc = e.target.value;
    performAllCalculations();

});

function bmi() {
    var bmi = weight / (height/100 * height/100);
    document.getElementById('bmi').innerHTML = bmi.toFixed(2);
    return bmi;
}

function standardNormalCDF(x) {
    return (1 - math.erf(-x / math.sqrt(2))) / 2;
}

function performAllCalculations() {
    WeightPercentile();
    HeightPercentile();
    bmi();
    bmiPercentile();
    headCircumferencePercentile();
}


function bmiPercentile() {
    var formula = "bmiDaysTill5y";
    var index = 0;
    if (days < 1857) {
        index = days - 1;
    }
    else if (months < 121) {
        index = months-62;
        formula = "bmiMonths5to19";
    }
    var L = parsed[gender][formula]["L"][index];
    var M = parsed[gender][formula]["M"][index];
    var S = parsed[gender][formula]["S"][index];
    var z = (math.pow(bmi()/M, L) -1) / (L * S);
    var percentile = standardNormalCDF(z) * 100;
    document.getElementById("bmip").innerHTML = percentile.toFixed(0);
}

function WeightPercentile() {
    var formula = "weightDaysTill5y";
    var index = 0;
    if (days < 1857) {
        index = days - 1;
    }
    else if (months < 121) {
        index = months-62;
        formula = "weightMonths5to10";
    }
    console.log(parsed[gender][formula]["L"]);
    var L = parsed[gender][formula]["L"][index];
    var M = parsed[gender][formula]["M"][index];
    var S = parsed[gender][formula]["S"][index];
    var z = (math.pow(weight/M, L) -1) / (L * S);
    var percentile = standardNormalCDF(z) * 100;
    document.getElementById("wp").innerHTML = percentile.toFixed(0);
}

function HeightPercentile() {
    var L = 1;
    var index = 0;
    var formula = "heightDaysTill5y";
    if (days < 1857) {
        index = days-1;
    }
    else if (months < 121) {
        index = months-62;
        formula = "heightMonths5to19";
    }
    var M = parsed[gender][formula]["M"][index];
    var S = parsed[gender][formula]["S"][index];
    var z = ((height/M) -1) / (S);
    var percentile = standardNormalCDF(z) * 100;
    document.getElementById("hp").innerHTML = percentile.toFixed(0);
}

function headCircumferencePercentile() {
    var L = 1;
    var index = 0;
    var formula = "headCircumferenceDaysTill5y";
    if (days < 1857) {
        index = days-1;
    }
    var M = parsed[gender][formula]["M"][index];
    var S = parsed[gender][formula]["S"][index];
    var z = ((hc/M) -1) / (S);
    var percentile = standardNormalCDF(z) * 100;
    document.getElementById("hc").innerHTML = percentile.toFixed(0);
}
