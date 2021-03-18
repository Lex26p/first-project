"use strict";

let co2 = document.querySelector('.temp__value'); // co2
let BtmAp = document.querySelector('.ap'); // Кнопка вверх
let BtmDwn = document.querySelector('.dwn'); // Кнопка вниз
let s1 = document.querySelector('.s1'); // Кнопка вниз
let s2 = document.querySelector('.s2'); // Кнопка вниз
let s3 = document.querySelector('.s3'); // Кнопка вниз
let on = document.querySelector('.on'); // Кнопка вниз
let off = document.querySelector('.off'); // Кнопка вниз
let inp = document.querySelector('.in'); // Кнопка вниз
let inpLt = document.querySelector('.lt'); // Кнопка вниз

BtmAp.addEventListener('click', OpenPopup);


function OpenPopup() {
  let num = co2.textContent;
  co2.textContent = +num + 1;
  
}

BtmDwn.addEventListener('click', OpenPopup2);


function OpenPopup2() {
  let num = co2.textContent;
  co2.textContent = +num - 1;
  
}

function btm1() {
  s3.classList.remove('act');
  s2.classList.remove('act');
  s1.classList.add('act');
}
function btm2() {
  s3.classList.remove('act');
  s1.classList.remove('act');
  s2.classList.add('act');
}
function btm3() {
  s1.classList.remove('act');
  s2.classList.remove('act');
  s3.classList.add('act');
}
s1.addEventListener('click', btm1);
s2.addEventListener('click', btm2);
s3.addEventListener('click', btm3);

function onf() {
  off.classList.remove('actf');
  on.classList.add('actf');
}
function offf() {
  on.classList.remove('actf');
  off.classList.add('actf');
}

on.addEventListener('click', onf);
off.addEventListener('click', offf);


function input() {
  inpLt.textContent = inp.value;
}

//inpLt.addEventListener('change', input);
// function PopupSave (evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileTitle.textContent = jobInput.value;
//   popup.classList.remove('popup_opened');
// }



// function PopupSavePlace (evt) {
  

//   evt.preventDefault();
//   elementsBlock.insertAdjacentHTML('afterbegin', `<div class="element">
//             <img src="${urlInput.value}" alt="Млечный путь" class="element__img">
//             <button class="element__delete"></button>
//             <div class="element__container">
//               <p class="element__title">${namePlaceInput.value}</p>
//               <button class="element__group"></button>
//             </div>
//           </div>`);


// let like = document.querySelectorAll(".element__group"); // Лайк
// let deleteElement = document.querySelectorAll(".element__delete"); // uuu

// like[0].addEventListener('click', likeAdd);
// deleteElement[0].addEventListener('click', delElm);

// popupNewPlace.classList.remove('popup_opened');
// }

// function OpenPopupPlace() {
//   popupNewPlace.classList.add('popup_opened');
// }






// openAddPlace.addEventListener('click', OpenPopupPlace);
// popupSavePlase.addEventListener('submit', PopupSavePlace);





// function likeAdd (evt) {
//   evt.target.classList.toggle('element__group_active');
// }

// function delElm (evt) {
//   evt.target.parentNode.remove();
// }

// editBtm.addEventListener('click', OpenPopup);
// popupSubmit.addEventListener('submit', PopupSave);

// popupCloseBtn.addEventListener('click', () => {
//   popup.classList.remove('popup_opened');
// });

// like.forEach(group => {
//   group.addEventListener('click', likeAdd);
// });

// deleteElement.forEach(del => {
//   del.addEventListener('click', delElm);
// });