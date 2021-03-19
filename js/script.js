"use strict";

let tempv = document.querySelector('.temp__value'); // co2
let BtmAp = document.querySelector('.ap'); // Кнопка вверх
let BtmDwn = document.querySelector('.dwn'); // Кнопка вниз
let s1 = document.querySelector('.s1'); // Кнопка вниз
let s2 = document.querySelector('.s2'); // Кнопка вниз
let s3 = document.querySelector('.s3'); // Кнопка вниз
let on = document.querySelector('.on'); // Кнопка вниз
let off = document.querySelector('.off'); // Кнопка вниз
let inp = document.querySelector('.in'); // Кнопка вниз
let inpLt = document.querySelector('.lt'); // Кнопка вниз
let co2 = document.querySelector('.co2'); // Кнопка вниз
let inW1 = document.querySelector('.in-w1'); // Кнопка вниз
let inW2 = document.querySelector('.in-w2'); // Кнопка вниз
let inW3 = document.querySelector('.in-w3'); // Кнопка вниз
let paopap = document.querySelector('.paopap'); // раопап
let paopapOpen = document.querySelector('.paopap__btm-open'); // открыть
let paopapClos = document.querySelector('.paopap__btm-clos'); // закрыть


let grd1 = 0;
let grd2 = 0;
let grd3 = 0;

paopapOpen.addEventListener('click', () => {
  paopap.classList.add('paopap_act');
});

paopapClos.addEventListener('click', () => {
  paopap.classList.remove('paopap_act');
});



inW1.style.background = `linear-gradient(to right, #403e3e ${grd1}%, #403e3e 0%,  grey 0%)`;
inW2.style.background = `linear-gradient(to right, #403e3e ${grd2}%, #403e3e 0%,  grey 0%)`;
inW3.style.background = `linear-gradient(to right, #403e3e ${grd3}%, #403e3e 0%,  grey 0%)`;

function grad1() {
  let grd = inW1.value;
  grd1 = grd;
  inW1.style.background = `linear-gradient(to right, #403e3e ${grd1}%, #403e3e 0%,  grey 0%)`;
}

function grad2() {
  let grd = inW2.value;
  grd2 = grd;
  inW2.style.background = `linear-gradient(to right, #403e3e ${grd2}%, #403e3e 0%,  grey 0%)`;
}
function grad3() {
  let grd = inW3.value;
  grd3 = grd;
  inW3.style.background = `linear-gradient(to right, #403e3e ${grd3}%, #403e3e 0%,  grey 0%)`;
}






BtmAp.addEventListener('click', OpenPopup);


function OpenPopup() {
  let num = tempv.textContent;
  tempv.textContent = +num + 1;
  
}

BtmDwn.addEventListener('click', OpenPopup2);


function OpenPopup2() {
  let num = tempv.textContent;
  tempv.textContent = +num - 1;
  
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
  off.classList.remove('act-off');
  on.classList.add('act-on');
}
function offf() {
  on.classList.remove('act-on');
  off.classList.add('act-off');
}

on.addEventListener('click', onf);
off.addEventListener('click', offf);


function input() {
  inpLt.textContent = inp.value + "%";
}

// function co2in() {
//   inpLt.textContent = inp.value;
// }

// setInterval();
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