const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener('input', Promjena);


function Promjena()
{
    var tekst = input.value;
    output.innerHTML = tekst;
}