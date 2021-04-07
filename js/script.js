"use strict";

let btnInfo = document.querySelectorAll('.btn_info'), // Инструкция
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
      setTempBtmCont = document.querySelector('.set-temp__btm_cont'), // Кнопки вставка температуры
// Шторы
      curtainsSet = document.querySelector('.curtains_set'), // Кнопка set
      curtainsAut = document.querySelector('.curtains_aut'), // Кнопка auto
      valueTitleCurtains = document.querySelector('.value__title_curtains'), // Число проценты
      curtainsSpeedInput = document.querySelector('.curtains__speed-input'), // Ползунок
// Фанкоилы
      fanCoilBtmCont = document.querySelector('.fan-coil__btm_cont'), // Кнопка Включить
      fanCoilSpeedInput = document.querySelector('.fan-coil__speed-input'), // Ползунок
      fanCoilValue = document.querySelector('.fan-coil_value'), // Число проценты
      fanCoilAct = document.querySelectorAll('.fan-coil__act'), // Значки состояния
      fanCoilActCont = document.querySelector('.fan-coil__act_cont'), // Контейнер значков состояния (Открыть попап)
      popapFanCoil = document.querySelector('.popap__fan-coil'), // Попап фанкоилы
      popapCloseFanCoil = document.querySelector('.popap__close_fan-coil'), // Закрыть попап фанкоилы
      fanCoilActBtm = document.querySelector('.fan-coil__popap_list'), // Кнопки включить включить и выключить фанкоилы
      fanCoilName = document.querySelectorAll('.fan-coil__name'), // Подсветка для фанкоилов на карте


// Вентиляция
      ventilationBtmCont = document.querySelector('.ventilation__btm_cont-on-Off'), // Кнопкb on/off
      ventilationBtmContSpeed = document.querySelector('.ventilation__btm_cont-speed'); // Кнопка скорость 1



let client  = mqtt.connect('ws://192.168.42.1:18883');
let setOut;
function OpenPopup() {   // Открить попап инструкция
  popapInfo.classList.add('popap__open');
  popapText.scrollTop = 0;
  console.log(popapText.scrollTop);
}

function OpenPopupInfo(e) {   // Открить попап инфо 
  popapInfo.classList.add('popap__open');
  if (e.target.parentNode.classList.contains('monitoring')){
    popapSubTitle[0].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('set-temp')){
    popapSubTitle[1].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('curtains')){
    popapSubTitle[2].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('fan-coil')){
    popapSubTitle[3].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('ventilation')){
    popapSubTitle[4].scrollIntoView();
  } else if (e.target.parentNode.classList.contains('more-modes')){
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
client.subscribe('/devices/FanCoil/#');
client.subscribe('/devices/VentDemo/controls/#');
//console.log(client);

client.on("message", function (topic, payload) {
  if (topic.includes('/devices/FanCoil/controls/F') && topic.length < 30){   //Изменить цвет активных фанкоилов
    console.log(topic);
    if (+payload === 0){
      fanCoilName[+topic.slice(28, 29) - 1].classList.add('fan-coil__name_act-off');
      fanCoilName[+topic.slice(28, 29) - 1].classList.remove('fan-coil__name_act-on');
      if (setOut === 1 || setOut === 3){ //Если режим выкл (2) то индекаторы не переключаются.
        fanCoilAct[+topic.slice(28, 29) - 1].classList.add('fan-coil__name_act-off');
        fanCoilAct[+topic.slice(28, 29) - 1].classList.remove('fan-coil__name_act-on');
      }
    } else if (+payload === 1){
      fanCoilName[+topic.slice(28, 29) - 1].classList.add('fan-coil__name_act-on');
      fanCoilName[+topic.slice(28, 29) - 1].classList.remove('fan-coil__name_act-off');
      if (setOut === 1 || setOut === 3){ //Если режим выкл (2) то индекаторы не переключаются.
        fanCoilAct[+topic.slice(28, 29) - 1].classList.add('fan-coil__name_act-on');
        fanCoilAct[+topic.slice(28, 29) - 1].classList.remove('fan-coil__name_act-off');
      }
    }
  } else if (topic === '/devices/FanCoil/controls/SetMode'){    // показываем какой режим фанкойлов активный.
    for (let i = 1; i < 4; i++) { //Удалить класы режимов фанкоилов.
      fanCoilBtmCont.children[i].classList.remove('btn_act-green', 'btn_act-red');
    }
    if (+payload === 1){
      setOut = 1;
      fanCoilBtmCont.children[1].classList.add('btn_act-green');
      for (let i = 1; i <= 8; i++) { // Возвращаем класы у индикаторов фанкоилов в режиме вкл (1)
        client.subscribe(`/devices/FanCoil/controls/F-${i}`);
      }
    } else if (+payload === 2){
      setOut = 2;
      fanCoilBtmCont.children[2].classList.add('btn_act-red');
      fanCoilAct.forEach(del => {   // Удалить класы у индикаторов фанкоилов если режим выкл (2)
        del.classList.remove('fan-coil__name_act-on', 'fan-coil__name_act-off');
      });
    } else if (+payload === 3){
      setOut = 3;
      fanCoilBtmCont.children[3].classList.add('btn_act-green');
      for (let i = 1; i <= 8; i++) { // Возвращаем класы у индикаторов фанкоилов в режиме авто (3)
        client.subscribe(`/devices/FanCoil/controls/F-${i}`);
      }
    } 
  } else if (topic === '/devices/FanCoil/controls/FanSpeedSet'){    // показываем скорость фанкоилов.
    fanCoilSpeedInput.value = payload;
    fanCoilValue.innerText = payload  + '%';
  } else if (topic === '/devices/VentDemo/controls/VentTempDemo'){  // Показываем температуру с вентмашины
    tempHtml.innerText = payload;
  } else if (topic === '/devices/VentDemo/controls/VentSetTempDemo'){// Показываем вставку температуры
    setTempInput.innerText = payload;
  } else if (topic === '/devices/VentDemo/controls/VentSetOnOffDemo'){// Показываем вставку температуры
    ventilationBtmCont.children[1].classList.remove('btn_act-green', 'btn_act-red');
    ventilationBtmCont.children[2].classList.remove('btn_act-green', 'btn_act-red');
    if (+payload === 0){
      ventilationBtmCont.children[1].classList.add('btn_act-green');
    } else if (+payload === 1){
      ventilationBtmCont.children[2].classList.add('btn_act-red');
    }
  } else if (topic === '/devices/VentDemo/controls/VentSetSpeedDemo'){
      if (ventilationBtmCont.children[1].classList.contains("btn_act-green")){
        for (let i = 1; i <= 3; i++) { //Удалить класы режимов скорости вентмашины.
          ventilationBtmContSpeed.children[i].classList.remove('btn_act-green');
        }
        ventilationBtmContSpeed.children[+payload].classList.add('btn_act-green');
      }
  }

});


function SetModeFanCoil(e) {   // Установить режим фанкоилов
  client.publish(`/devices/FanCoil/controls/SetMode/on`, `${e.target.getAttribute('data-item')}`);
}

fanCoilBtmCont.addEventListener('click', SetModeFanCoil);

function FanActOn(e) {   // Кнопки включить и выключить фанкоилы
  if (e.target.innerText === 'on'){
    client.publish(`/devices/FanCoil/controls/${e.target.parentNode.parentNode.querySelector('.fan-coil__name').innerText}/on`, "1");
  }else if (e.target.innerText === 'off'){
    client.publish(`/devices/FanCoil/controls/${e.target.parentNode.parentNode.querySelector('.fan-coil__name').innerText}/on`, "0");
  }
}

fanCoilActBtm.addEventListener('click', FanActOn); //Назначить слушатель событий для кнопок on/off фанкоилы

function fanSpeedSet() {
  client.publish(`/devices/FanCoil/controls/FanSpeedSet/on`, `${fanCoilSpeedInput.value}`);
}

function fanSpeedSethtml() {
  fanCoilValue.innerText = fanCoilSpeedInput.value + '%';
}


function SetOnOffVent (e){ // Вентмашина on/off
  if (e.target.innerText === 'on'){
    client.publish(`/devices/VentDemo/controls/VentSetOnOffDemo/on`, `0`);
    setTimeout (()=> {client.subscribe('/devices/VentDemo/controls/VentSetSpeedDemo')}, 200); // Подписатся на скорость вентмашина
  } else if (e.target.innerText === 'off'){
    client.publish(`/devices/VentDemo/controls/VentSetOnOffDemo/on`, `1`);
    for (let i = 1; i <= 3; i++) { //Удалить класы режимов скорости вентмашины.
      ventilationBtmContSpeed.children[i].classList.remove('btn_act-green');
    }
  }
}

ventilationBtmCont.addEventListener('click', SetOnOffVent); //Вентмашина on/off

function SetSpeedVent (e){ // Скорость вентмашина
    client.publish(`/devices/VentDemo/controls/VentSetSpeedDemo/on`, `${+e.target.innerText}`);
}

ventilationBtmContSpeed.addEventListener('click', SetSpeedVent); //Скорость вентмашина


function SetTempAll (e){ // Вставка температуры
  if (e.target.innerText === '+'){
    if (+setTempInput.innerText < 28){
      client.publish(`/devices/VentDemo/controls/VentSetTempDemo/on`, `${+setTempInput.innerText + 1}`);
    }
  } else if (e.target.innerText === '-'){
    if (+setTempInput.innerText > 18){
      client.publish(`/devices/VentDemo/controls/VentSetTempDemo/on`, `${+setTempInput.innerText - 1}`);
    }
  }
}

setTempBtmCont.addEventListener('click', SetTempAll); //Вставка температуры