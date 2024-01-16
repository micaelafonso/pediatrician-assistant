var weightWeeksBoysL = [0.3487, 0.2776, 0.2581, 0.2442, 0.2331, 0.2237, 0.2155, 0.2081, 0.2014, 0.1952, 0.1894, 0.1840, 0.1789, 0.1740]
var weightWeeksBoysM = [3.3464, 3.4879, 3.7529, 4.0603, 4.3671, 4.6590, 4.9303, 5.1817, 5.4149, 5.6319, 5.8346, 6.0242, 6.2019, 6.3690]
var weightWeeksBoysS = [0.14602, 0.14483, 0.14142, 0.13807, 0.13497, 0.13215, 0.12960, 0.12729, 0.12520, 0.12330, 0.12157, 0.12001, 0.11860, 0.11732]

let weight = 0;
let height = 1;
let years = 0;
let months = 0;
let weeks = 0;

console.log("Test");

document.getElementById('years').addEventListener('input', (e) => {
    years = e.target.value;
});

document.getElementById('months').addEventListener('input', (e) => {
    months = e.target.value;
});

document.getElementById('weeks').addEventListener('input', (e) => {
    weeks = e.target.value;
    document.getElementById('wp').innerHTML = "Weight Percentile: " + weeksBoyPercentile().toFixed(2);
});

document.getElementById('height').addEventListener('input', (e) => {
    height = e.target.value;
    imc(weight, height);
});

document.getElementById('weight').addEventListener('input', (e) => {
    weight = e.target.value;
    imc(weight, height);
});

function imc(weight, height) {
    var imc = weight / (height * height);
    document.getElementById('imc').innerHTML = "IMC: " + imc.toFixed(2);
}

function standardNormalCDF(x) {
    return (1 - math.erf(-x / math.sqrt(2))) / 2;
}

function weeksBoyPercentile() {
    console.log(weightWeeksBoysL[weeks]);
    var z = (math.pow(weight/weightWeeksBoysM[weeks], weightWeeksBoysL[weeks]) -1) / (weightWeeksBoysL[weeks] * weightWeeksBoysS[weeks]);
    return standardNormalCDF(z) * 100;
}
