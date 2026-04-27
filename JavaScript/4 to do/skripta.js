const input = document.getElementById("input");
const button = document.getElementById("button");
const lista = document.getElementById("lista");

button.addEventListener('click', Dodaj);
input.addEventListener('keypress', (event)=>{
    CheckForEnter(event);
});

function CheckForEnter(event)
{
    if(event.key == "Enter")
    {
        Dodaj();
    }
}

function Dodaj()
{
    var tekst = input.value;
    if(tekst == "") return;

    const item = document.createElement('li');
    item.innerHTML = tekst;

    item.addEventListener('click', ()=>
    {
        item.classList.toggle("napravio");
    });
    
    // Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "x";
    deleteButton.addEventListener('click', ()=>{
        lista.removeChild(item);
    });
    item.appendChild(deleteButton);
    
    lista.appendChild(item);
    input.value = "";
}