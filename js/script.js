"use strict";

let   btnInfo = document.querySelectorAll('.btn_info'), // Инструкция
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
      curtainsBtmCont = document.querySelector('.curtains__btm_cont'), // Кнопки set и aut шторы
      moreМodesИtmСontСurtains = document.querySelector('.more-modes__btm_cont_curtains'), // Ползунок
// Фанкойлы
      fanCoilBtmCont = document.querySelector('.fan-coil__btm_cont'), // Кнопка Включить
      fanCoilSpeedInput = document.querySelector('.fan-coil__speed-input'), // Ползунок
      fanCoilValue = document.querySelector('.fan-coil_value'), // Число проценты
      fanCoilAct = document.querySelectorAll('.fan-coil__act'), // Значки состояния
      fanCoilActCont = document.querySelector('.fan-coil__act_cont'), // Контейнер значков состояния (открыть попап)
      popapFanCoil = document.querySelector('.popap__fan-coil'), // Попап фанкойлы
      popapCloseFanCoil = document.querySelector('.popap__close_fan-coil'), // Закрыть попап фанкойлы
      fanCoilActBtm = document.querySelector('.fan-coil__popap_list'), // Кнопки включить включить  фанкойлы (контейнер)
      fanCoilName = document.querySelectorAll('.fan-coil__name'), // Подсветка для фанкойлов на карте

// Вентиляция
      ventilationBtmCont = document.querySelector('.ventilation__btm_cont-on-Off'), // Кнопки on/off
      ventilationBtmContSpeed = document.querySelector('.ventilation__btm_cont-speed'), // Кнопка скорость 1

// Проветривание
      moreModesOnOffCont = document.querySelector('.more-modes__on-Off_cont'), // Кнопки on/off
      moreModesBtmContTime = document.querySelector('.more-modes__btm_cont-time'), // Кнопки + -
      moreModesTime = document.querySelector('.more-modes_time'); // Время осталось

//let client  = mqtt.connect('ws://192.168.1.10:18883');
let client  = mqtt.connect('ws://192.168.42.1:18883');
let setOut;

headerBtmInfo.addEventListener('click', () => { // Кнопка открить попап инструкция
  popapInfo.classList.add('popap__open');
  popapText.scrollTop = 0;
});

popapCloseInfo.addEventListener('click', () => { // Кнопка закрыть попап инструкция
  popapInfo.classList.remove('popap__open');
});

btnInfo.forEach(info => {   //Назначить слушатель событий для кнопок инфо (цикл)
  info.addEventListener('click', (e) => {  // Открить попап инфо
    popapInfo.classList.add('popap__open');
    popapSubTitle[+(e.target.getAttribute('data-info'))].scrollIntoView();  
  });
});

fanCoilActCont.addEventListener('click', () => {  // Кнопка открить попап фанкойлы
  popapFanCoil.classList.add('popap__open');
});

popapCloseFanCoil.addEventListener('click', () => {  // Кнопка закрыть попап фанкойлы
  popapFanCoil.classList.remove('popap__open');
});
client.subscribe('/devices/FanCoil/controls/#');
client.subscribe('/devices/vent-7-Nebo_1/controls/fan-speed');
client.subscribe('/devices/shtopiDemo/controls/#');
client.subscribe('/devices/LuxControl/controls/SetMode');;
client.subscribe('/devices/WintDev/controls/SetMode');
client.subscribe('/devices/Info/controls/TempInfo');
client.subscribe('/devices/Info/controls/CO2Info');
client.subscribe('/devices/Info/controls/RhInfo');
client.subscribe('/devices/WintDev/controls/time');
client.subscribe('/devices/vent-7-Nebo_1/controls/Set-temp');

client.on("message", function (topic, payload) {
  if (topic.includes('/devices/FanCoil/controls/F') && topic.length < 30){   //Изменить цвет активных фанкойлов
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
    for (let i = 1; i < 4; i++) { //Удалить класы режимов фанкойлов.
      fanCoilBtmCont.children[i].classList.remove('btn_act-green', 'btn_act-red');
    }
    if (+payload === 1){
      setOut = 1;
      fanCoilBtmCont.children[1].classList.add('btn_act-green');
      for (let i = 1; i <= 8; i++) { // Возвращаем класы у индикаторов фанкойлов в режиме вкл (1)
        client.subscribe(`/devices/FanCoil/controls/F-${i}`);
      }
    } else if (+payload === 2){
      setOut = 2;
      fanCoilBtmCont.children[2].classList.add('btn_act-red');
      fanCoilAct.forEach(del => {   // Удалить класы у индикаторов фанкойлов если режим выкл (2)
        del.classList.remove('fan-coil__name_act-on', 'fan-coil__name_act-off');
      });
    } else if (+payload === 3){
      setOut = 3;
      fanCoilBtmCont.children[3].classList.add('btn_act-green');
      for (let i = 1; i <= 8; i++) { // Возвращаем класы у индикаторов фанкойлов в режиме авто (3)
        client.subscribe(`/devices/FanCoil/controls/F-${i}`);
      }
    } 
  } else if (topic === '/devices/FanCoil/controls/FanSpeedSet'){    // показываем скорость фанкойлов.
    fanCoilSpeedInput.value = payload;
    fanCoilValue.innerText = payload  + '%';
  // } else if (topic === '/devices/VentDemo/controls/VentTempDemo'){  // Показываем температуру с вентмашины
  //   tempHtml.innerText = (+payload).toFixed(1);
  } else if (topic === '/devices/Info/controls/TempInfo'){  // Показываем температуру с датчика
    tempHtml.innerText = (+payload).toFixed(1);
  } else if (topic === '/devices/Info/controls/CO2Info'){  // Показываем CO2 с датчика
    co2Html.innerText = (+payload).toFixed(0);
  } else if (topic === '/devices/Info/controls/RhInfo'){  // Показываем влажность с датчика
    rhHtml.innerText = (+payload).toFixed(0);
  } else if (topic === '/devices/vent-7-Nebo_1/controls/Set-temp'){// Показываем вставку температуры
    setTempInput.innerText = +payload;
  } else if (topic === '/devices/vent-7-Nebo_1/controls/fan-speed'){// Показываем on off 1 2 3 вентмашина
    for (let i = 1; i < 5; i++) { //Удалить класы режимов фанкойлов.
      ventilationBtmCont.children[i].classList.remove('btn_act-green', 'btn_act-red');
    }
    ventilationBtmCont.children[+payload].classList.add(`${ventilationBtmCont.children[+payload].getAttribute('data-info')}`);
  } else if (topic === '/devices/FanCoil/controls/FanSpeedValue'){ // Градиэнт для ползунка фанкойлов
    fanCoilSpeedInput.style.background = `linear-gradient(to right, rgba(0, 255, 0, 0.7) ${+payload / 100}%, #403e3e 0%,  rgba(255, 255, 255, 0) 0%)`;
  } else if (topic === '/devices/shtopiDemo/controls/SetShtopiDemo'){ // Показываем вставку для штор
    curtainsSetInput.value = payload;
    valueTitleCurtains.innerText = payload  + '%';
  } else if (topic === '/devices/LuxControl/controls/SetMode'){   // Режим on auto шторы
    curtainsBtmCont.children[+!+payload + 1].classList.remove('btn_act-green');
    curtainsBtmCont.children[+payload + 1].classList.add('btn_act-green');
  } else if (topic === '/devices/WintDev/controls/time'){ // получить минуты таймера
    moreModesTime.innerText = (+payload / 60).toFixed(0); 
  } else if (topic === '/devices/WintDev/controls/SetMode'){ //Включить выключить проветривание 
    moreModesOnOffCont.children[+payload + 1].classList.remove(`${moreModesOnOffCont.children[+payload + 1].getAttribute('data-info')}`);
    moreModesOnOffCont.children[+!+payload + 1].classList.add(`${moreModesOnOffCont.children[+!+payload + 1].getAttribute('data-info')}`);
    if (+payload === 0){
      moreModesBtmContTime.classList.remove("more-modes__btm_cont-time-act");
      //client.publish(`/devices/WintDev/controls/time/on`, `1`);
    } else if (+payload === 1){
      moreModesBtmContTime.classList.add("more-modes__btm_cont-time-act");
      //client.publish(`/devices/WintDev/controls/time/on`, `300`);
    }
  }
});


fanCoilBtmCont.addEventListener('click', (e) => { // Установить режим работы фанкойлов on off auto
  client.publish(`/devices/FanCoil/controls/SetMode/on`, `${e.target.getAttribute('data-item')}`);
  if (e.target.getAttribute('data-item') === '3'){
    client.publish(`/devices/FanCoil/controls/FanSpeedSet/on`, `100`);
  }
});

fanCoilActBtm.addEventListener('click', (e) => {   // Кнопки включить и выключить фанкойлы
  if (e.target.innerText === 'on'){
    client.publish(`/devices/FanCoil/controls/${e.target.parentNode.parentNode.querySelector('.fan-coil__name').innerText}/on`, "1");
  }else if (e.target.innerText === 'off'){
    client.publish(`/devices/FanCoil/controls/${e.target.parentNode.parentNode.querySelector('.fan-coil__name').innerText}/on`, "0");
  }
});

function fanSpeedSet() {  // устанвить скорость фанкойлов
  if (+fanCoilSpeedInput.value >= 30){
    client.publish(`/devices/FanCoil/controls/FanSpeedSet/on`, `${fanCoilSpeedInput.value}`);
  } else if (+fanCoilSpeedInput.value <= 30) {
    client.publish(`/devices/FanCoil/controls/FanSpeedSet/on`, `0`);
  }
}

function fanSpeedSethtml() { //Показать скорость фанкойлов проценты
  fanCoilValue.innerText = fanCoilSpeedInput.value + '%';
}



ventilationBtmCont.addEventListener('click', (e) => { //Вентмашина on/off 1 2 3
  client.publish(`/devices/vent-7-Nebo_1/controls/fan-speed/on`, `${e.target.getAttribute('data-num')}`);
});



function SetTempAll (e){ // Вставка температуры
  if (e.target.innerText === '+'){
    if (+setTempInput.innerText < 28){
      client.publish(`/devices/vent-7-Nebo_1/controls/Set-temp/on`, `${+setTempInput.innerText + 1}`);
    }
  } else if (e.target.innerText === '-'){
    if (+setTempInput.innerText > 18){
      client.publish(`/devices/vent-7-Nebo_1/controls/Set-temp/on`, `${+setTempInput.innerText - 1}`);
    }
  }
}

setTempBtmCont.addEventListener('click', SetTempAll); //Вставка температуры

function curtains(){
  client.publish(`/devices/shtopiDemo/controls/SetShtopiDemo/on`, `${curtainsSetInput.value}`); // устанвить уровень штор
}

moreМodesИtmСontСurtains.addEventListener('click', (e) => {  //Поднять опустить шторы.
  client.publish(`/devices/LuxControl/controls/${e.target.getAttribute('data-item')}/on`, 1);
});

curtainsBtmCont.addEventListener('click', (e) => {  //Переключить режимы шторы.
    client.publish(`/devices/LuxControl/controls/SetMode/on`, `${e.target.getAttribute('data-item')}`);
});

//e.target.getAttribute('data-item');


//children[1].getAttribute('data-info')
moreModesBtmContTime.addEventListener('click', (e) => {  //Добавить уменьшить время таймера
  if (e.target.innerText === '+'){
    if (+moreModesTime.innerText < 25){
      client.publish(`/devices/WintDev/controls/time/on`, `${+moreModesTime.innerText * 60 + 300}`);
    } else if (+moreModesTime.innerText >= 25){
      client.publish(`/devices/WintDev/controls/time/on`, `1800`);
    }
  } else if (e.target.innerText === '-'){
    if (+moreModesTime.innerText > 5){
      client.publish(`/devices/WintDev/controls/time/on`, `${+moreModesTime.innerText * 60 - 300}`);
    } else if (+moreModesTime.innerText <= 5){
      client.publish(`/devices/WintDev/controls/time/on`, `1`);
    }
  }
});

moreModesOnOffCont.addEventListener('click', (e) => {   // Кнопки включить и выключить режим проветривания
    client.publish(`/devices/WintDev/controls/SetMode/on`, `${e.target.getAttribute('data-num')}`);
});

