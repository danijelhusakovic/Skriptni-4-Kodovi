const prvi = document.getElementById("prviBroj");
const drugi = document.getElementById("drugiBroj");
const tipka = document.getElementById("zbrojButton");
const zbrojElement = document.getElementById("zbrojRezultat");

tipka.addEventListener('click', Zbroji);

function Zbroji()
{
    var prviBroj = parseInt(prvi.value);
    var drugiBroj = parseInt(drugi.value);
    var zbroj = prviBroj + drugiBroj;
    zbrojElement.innerHTML = zbroj;
}