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

radiobtn = document.getElementById("male");
radiobtn.checked = true;


document.getElementById('date').addEventListener('input', (e) => {
    date = new Date(e.target.value);

    var difference = Date.now() - date.getTime();

    days = Math.round(difference / 1000 / 60 / 60 / 24);

    months = Math.round(days / 30);
    console.log(parsed);

    performAllCalculations();

});

document.getElementById('male').addEventListener('change', (e) => {
    gender = "boys";
    performAllCalculations();

});

document.getElementById('female').addEventListener('change', (e) => {
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

function imc() {
    var imc = weight / (height/100 * height/100);
    document.getElementById('imc').innerHTML = "IMC: " + imc.toFixed(2);
}

function standardNormalCDF(x) {
    return (1 - math.erf(-x / math.sqrt(2))) / 2;
}

function performAllCalculations() {
    WeightPercentile();
    HeightPercentile();
    imc();
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
    var z = (math.pow(weight/M, L) -1) / (L * S);
    var z = ((height/M) -1) / (S);
    var percentile = standardNormalCDF(z) * 100;
    document.getElementById("hp").innerHTML = "Height For Age Percentile: " + percentile.toFixed(0);
}
