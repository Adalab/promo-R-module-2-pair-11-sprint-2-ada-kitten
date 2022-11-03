'use strict';

buttonAdd.addEventListener('click', addNewKitten);
function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;

  const newKittenDataObject = {
    photo: valuePhoto,
    name: valueName,
    desc: valueDesc,
    race: valueRace
}

  if (valueDesc === '' || valuePhoto === '' || valueName === '') {
    labelMesageError.innerHTML = 'Debe rellenar todos los valores';
  } else {
    if (valueDesc !== '' && valuePhoto !== '' && valueName !== '') {
      labelMesageError.innerHTML = '';
    }
  }

  kittenDataList.push(newKittenDataObject);
  renderKittenList(kittenDataList);
}


