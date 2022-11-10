'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');
const GITHUB_USER = 'mireiaparra';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

//Objetos con cada gatito
const kittenData_1 = {
    image: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
    name: "Anastacio",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_2 = {
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
    name: "Fiona",
    desc: "Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "Persa",
};
const kittenData_3 = {
    image: "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
    name: "Cielo",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};


//Funciones

function renderKitten(kittenData) {
  const liElement = document.createElement('li');
  liElement.classList.add('card');
  const artElement = document.createElement('article');
  const imgElement = document.createElement('img');
  imgElement.classList.add('card_img');
  imgElement.src = kittenData.image;
  imgElement.alt = "gatito";
  artElement.appendChild(imgElement);

  const nameElement = document.createElement('h3');
  const nameText = document.createTextNode(kittenData.name);
  nameElement.appendChild(nameText);
  artElement.appendChild(nameElement);

  const raceElement = document.createElement('h3');
  const raceText = document.createTextNode(kittenData.race);
  raceElement.appendChild(raceText);
  artElement.appendChild(raceElement);

  const parElement = document.createElement('p');
  parElement.classList.add('card_description');
  const parText = document.createTextNode(kittenData.desc);
  parElement.appendChild(parText);
  artElement.appendChild(parElement);

  liElement.appendChild(artElement);

  listElement.appendChild(liElement);  
}

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
       renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
buttonAdd.addEventListener('click', addNewKitten);


function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;

  const newKittenDataObject = {
    image: valuePhoto, //photo: valuePhoto,
    name: valueName,
    desc: valueDesc,
    race: valueRace
    }

  fetch(SERVER_URL,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newKittenDataObject),
      })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
        kittenDataList.push(newKittenDataObject);
        console.log(kittenDataList);
        localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
        renderKittenList(kittenDataList);
        function clean(){
          inputDesc.value = "";
          inputPhoto.value = "";
          inputName.value = "";
          inputRace.value = "";
           }
          clean();
        } else {
          if (valueDesc === '' || valuePhoto === '' || valueName === '') {
            labelMesageError.innerHTML = 'Debe rellenar todos los valores';
          } else {
            if (valueDesc !== '' && valuePhoto !== '' && valueName !== '') {
              labelMesageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
              }}
        }
      });  
  }




//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    const raceSearchText = input_search_race.value;
    listElement.innerHTML = "";
    const kittenDataListFilterd = kittenDataList
    .filter((cat)=>cat.desc.toLowerCase().includes(descrSearchText.toLowerCase()))

    .filter((cat)=>cat.race.toLowerCase().includes(raceSearchText.toLowerCase()))
    renderKittenList(kittenDataListFilterd);
  }

  let kittenDataList = [];

  const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

  if (kittenListStored !== null) {
    kittenDataList = kittenListStored;
    renderKittenList(kittenDataList);
    } else {
      fetch(SERVER_URL,
         {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
          })
        .then(response => response.json())
        .then(data => {  
          kittenDataList = data.results;
          renderKittenList(kittenDataList);
          localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
          })
      .catch((error) => {
        console.error(error);
      });
    } 

  
//Mostrar el litado de gatitos en el HTML


//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);








