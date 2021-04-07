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
      ventilationBtmCont = document.querySelector('.ventilation__btm_cont-on-Off'), // Кнопкb on/off
      ventilationBtmContSpeed = document.querySelector('.ventilation__btm_cont-speed'); // Кнопка скорость 1



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
client.subscribe('/devices/FanCoil/#');
client.subscribe('/devices/VentDemo/controls/#');

client.on("message", function (topic, payload) {
  if (topic.includes('/devices/FanCoil/controls/F') && topic.length < 30){   //Изменить цвет активных фанкойлов
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

fanCoilBtmCont.addEventListener('click', (e) => { // Установить режим фанкойлов
  client.publish(`/devices/FanCoil/controls/SetMode/on`, `${e.target.getAttribute('data-item')}`);
});

function FanActOn(e) {   // Кнопки включить и выключить фанкойлы
  if (e.target.innerText === 'on'){
    client.publish(`/devices/FanCoil/controls/${e.target.parentNode.parentNode.querySelector('.fan-coil__name').innerText}/on`, "1");
  }else if (e.target.innerText === 'off'){
    client.publish(`/devices/FanCoil/controls/${e.target.parentNode.parentNode.querySelector('.fan-coil__name').innerText}/on`, "0");
  }
}

fanCoilActBtm.addEventListener('click', FanActOn); //Назначить слушатель событий для кнопок on/off фанкойлы

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

ventilationBtmContSpeed.addEventListener('click', (e) => { //Скорость вентмашина
  client.publish(`/devices/VentDemo/controls/VentSetSpeedDemo/on`, `${+e.target.innerText}`);
});

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