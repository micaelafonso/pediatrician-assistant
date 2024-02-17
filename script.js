let response = fetch("statistics.json"); 
let parsed = {};
response.then((response) => {
    return response.json();
}).then((json) => {
    parsed = json;
});

let gender = "boys";
let weight = 0;
let height = 1;
let weeks = 0;
let years = 0;
let months = 0;
let days = 0;
let hc = 0;

radiobtn = document.getElementById("male");
radiobtn.checked = true;
let boyBackgroundColor= "#D9EDF8";
let girlBackgroundColor = "#F2C6DE";
document.body.style.backgroundColor = boyBackgroundColor;


document.getElementById('date').addEventListener('input', (e) => {
    date = new Date(e.target.value);

    var difference = Date.now() - date.getTime();

    days = Math.round(difference / 1000 / 60 / 60 / 24);

    months = Math.round(days / 30);

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
    document.getElementById('bmi').innerHTML = "bmi: " + bmi.toFixed(2);
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
    document.getElementById("bmip").innerHTML = "BMI Percentile: " + percentile.toFixed(0);
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
    var L = parsed[gender][formula]["L"][index];
    var M = parsed[gender][formula]["M"][index];
    var S = parsed[gender][formula]["S"][index];
    var z = (math.pow(weight/M, L) -1) / (L * S);
    var percentile = standardNormalCDF(z) * 100;
    document.getElementById("wp").innerHTML = "Weight For Age Percentile: " + percentile.toFixed(0);
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
        console.log(index);
        formula = "heightMonths5to19";
    }
    var M = parsed[gender][formula]["M"][index];
    var S = parsed[gender][formula]["S"][index];
    var z = ((height/M) -1) / (S);
    var percentile = standardNormalCDF(z) * 100;
    document.getElementById("hp").innerHTML = "Height For Age Percentile: " + percentile.toFixed(0);
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
    document.getElementById("hc").innerHTML = "Head Circumference For Age Percentile: " + percentile.toFixed(0);
}
