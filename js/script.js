"use strict";

const btnInfo = document.querySelectorAll('.btn_info'), // Инструкция
      headerBtmInfo = document.querySelector('.header__btm_info'), // Инструкция
      popapCloseInfo = document.querySelector('.popap__close_info'), // Закрыть инструкцию
      popapInfo = document.querySelector('.popap__info'), // Попап
      popapText = document.querySelector('.popap__content__text'), // Попап контент
      popapSubTitle = document.querySelectorAll('.popap__subtitle'), // Попап разделы
// Показания датчиков
      tempHtml = document.querySelector('.temp__html'), // Температура
      rhHtml = document.querySelector('.rh__html'), // Влажность
      co2Html = document.querySelector('.co2__html'), // СО2
// Вставка температуры
      setTempInput = document.querySelector('.set-temp__input'), // Вставка температуры
      setTempBtmAdd = document.querySelector('.set-temp__btm_add'), // Кнопка +
      setTempBtmLess = document.querySelector('.set-temp__btm_less'), // Кнопка -
// Шторы
      curtainsSet = document.querySelector('.curtains_set'), // Кнопка set
      curtainsAut = document.querySelector('.curtains_aut'), // Кнопка auto
      valueTitleCurtains = document.querySelector('.value__title_curtains'), // Число проценты
      curtainsSpeedInput = document.querySelector('.curtains__speed-input'), // Ползунок
// Фанкоилы
      fanCoilHtmlPowerOn = document.querySelector('.fan-coil_power-on'), // Кнопка Включить
      fanCoilHtmlPowerOff = document.querySelector('.fan-coil_power-off'), // Кнопка Выключить
      fanCoilFanAut = document.querySelector('.fan-coil_fan-aut'), // Кнопка auto
      fanCoilSpeedInput = document.querySelector('.fan-coil__speed-input'), // Ползунок
      fanCoilValue = document.querySelector('.fan-coil_value'), // Число проценты
      fanCoilAct = document.querySelectorAll('.fan-coil__act'), // Значки состояния
      fanCoilActCont = document.querySelector('.fan-coil__act_cont'), // Контейнер значков состояния (Открыть попап)
      popapFanCoil = document.querySelector('.popap__fan-coil'), // Попап фанкоилы
      popapCloseFanCoil = document.querySelector('.popap__close_fan-coil'), // Закрыть попап фанкоилы

// Вентиляция
      ventilationPowerOn = document.querySelector('.ventilation_power-on'), // Кнопка Включить
      ventilationPowerOff = document.querySelector('.ventilation_power-off'), // Кнопка Выключить
      ventilationFan1 = document.querySelector('.ventilation_fan-1'), // Кнопка скорость 1
      ventilationFan2 = document.querySelector('.ventilation_fan-2'), // Кнопка скорость 2
      ventilationFan3 = document.querySelector('.ventilation_fan-3'); // Кнопка скорость 3


//let client  = mqtt.connect('ws://192.168.42.1:18883');

function OpenPopup() {   // Открить попап инструкция
  popapInfo.classList.add('popap__open');
  popapText.scrollTop = 0;
  console.log(popapText.scrollTop);
}

function OpenPopupInfo(e) {   // Открить попап инфо 
  if (e.target.parentNode.classList.contains('monitoring')){
    popapInfo.classList.add('popap__open');
    popapSubTitle[0].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('set-temp')){
    popapInfo.classList.add('popap__open');
    popapSubTitle[1].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('curtains')){
    popapInfo.classList.add('popap__open');
    popapSubTitle[2].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('fan-coil')){
    popapInfo.classList.add('popap__open');
    popapSubTitle[3].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('ventilation')){
    popapInfo.classList.add('popap__open');
    popapSubTitle[4].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('more-modes')){
    popapInfo.classList.add('popap__open');
    popapSubTitle[5].scrollIntoView();
  }
}

function closePopup() {   // Закрыть попап инструкция
  popapInfo.classList.remove('popap__open');
}

headerBtmInfo.addEventListener('click', OpenPopup);  // Кнопка открить попап инструкция
popapCloseInfo.addEventListener('click', closePopup);  // Кнопка закрыть попап инструкция

btnInfo.forEach(info => {   //Назначить слушатель событий для кнопок инфо (цикл)
  info.addEventListener('click', OpenPopupInfo);
});

function OpenPopupfanCoil() {   // Открыть попап фанкоилы
  popapFanCoil.classList.add('popap__open');
}

function closePopupfanCoil() {   // Закрыть попап фанкоилы
  popapFanCoil.classList.remove('popap__open');
}

fanCoilActCont.addEventListener('click', OpenPopupfanCoil);  // Кнопка открить попап фанкоилы
popapCloseFanCoil.addEventListener('click', closePopupfanCoil);  // Кнопка закрыть попап фанкоилы
//client.subscribe('/devices/FanCoil_1/#');
//client.subscribe('/devices/wb-adc/controls/#');
//console.log(client);

//client.on("message", function (topic, payload) {
    
//     if (topic === "/devices/wb-adc/controls/A3"){
//         tempHtml.textContent = 50 / 10 * (+payload);
//     } else if (topic === "/devices/FanCoil_1/controls/Temperature"){
//         rhHtml.textContent = payload;
//     } else if (topic === "/devices/FanCoil_1/controls/Set mode"){
//         if(+payload === 1){
//             fanSpeed(1, 0, 0);
//         }else if(+payload === 2){
//             fanSpeed(0, 1, 0);
//         }else if(+payload === 0){
//             fanSpeed(0, 0, 1);
//         }
//     }
    
// });
function fanSpeed(speed1, speed2, speed3) {   // Закрыть попап фанкоилы
  if (speed1 === 1){
    ventilationFan1.classList.add('btn_act-green');
  } else {
    ventilationFan1.classList.remove('btn_act-green');
  }
  if (speed2 === 1){
    ventilationFan2.classList.add('btn_act-green');
  } else {
    ventilationFan2.classList.remove('btn_act-green');
  }
  if (speed3 === 1){
    ventilationFan3.classList.add('btn_act-green');
  } else {
    ventilationFan3.classList.remove('btn_act-green');}
}
fanSpeed(1, 0, 0);
// ventilationFan1.addEventListener('click', OpenPopup1);
// ventilationFan2.addEventListener('click', OpenPopup2);
// ventilationFan3.addEventListener('click', OpenPopup3);

// setTempBtmAdd.addEventListener('click', OpenPopup4);
// setTempBtmLess.addEventListener('click', OpenPopup5);

//   function OpenPopup1() {
//     client.publish("/devices/FanCoil_1/controls/Set mode/on", "1");
//     // console.log(client.publish);
//     // let num = tempv.textContent;
//     // tempv.textContent = +num + 1;
//   }
//   function OpenPopup2() {
//     client.publish("/devices/FanCoil_1/controls/Set mode/on", "2");
//   }
//   function OpenPopup3() {
//     client.publish("/devices/FanCoil_1/controls/Set mode/on", "0");
//   }

//   function OpenPopup4() {
//     client.publish("/devices/FanCoil_1/controls/Set temperature/on", `${+setTempInput.textContent + 1}`);
//   }

//   function OpenPopup5() {
//     client.publish("/devices/FanCoil_1/controls/Set temperature/on", `${+setTempInput.textContent - 1}`);
//   }