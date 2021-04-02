"use strict";

let btnInfo = document.querySelector('.btn_info'); // Инструкция



// Показания датчиков
let tempHtml = document.querySelector('.temp__html'); // Температура
let rhHtml = document.querySelector('.rh__html'); // Влажность
let co2Html = document.querySelector('.co2__html'); // СО2

// Вставка температуры
let setTempInput = document.querySelector('.set-temp__input'); // Вставка температуры
let setTempBtmAdd = document.querySelector('.set-temp__btm_add'); // Кнопка +
let setTempBtmLess = document.querySelector('.set-temp__btm_less'); // Кнопка -

// Шторы
let curtainsSet = document.querySelector('.curtains_set'); // Кнопка set
let curtainsAut = document.querySelector('.curtains_aut'); // Кнопка auto
let valueTitleCurtains = document.querySelector('.value__title_curtains'); // Число проценты
let curtainsSpeedInput = document.querySelector('.curtains__speed-input'); // Ползунок

// Фанкоилы
let fanCoilHtmlPowerOn = document.querySelector('.fan-coil_power-on'); // Кнопка Включить
let fanCoilHtmlPowerOff = document.querySelector('.fan-coil_power-off'); // Кнопка Выключить
let fanCoilFanAut = document.querySelector('.fan-coil_fan-aut'); // Кнопка auto
let fanCoilSpeedInput = document.querySelector('.fan-coil__speed-input'); // Ползунок
let fanCoilValue = document.querySelector('.fan-coil_value'); // Число проценты
let fanCoilAct = document.querySelectorAll('.fan-coil__act'); // Значки состояния
let fanCoilActCont = document.querySelector('.fan-coil__act_cont'); // Контейнер значков состояния

// Вентиляция
let ventilationPowerOn = document.querySelector('.ventilation_power-on'); // Кнопка Включить
let ventilationPowerOff = document.querySelector('.ventilation_power-off'); // Кнопка Выключить
let ventilationFan1 = document.querySelector('.ventilation_fan-1'); // Кнопка скорость 1
let ventilationFan2 = document.querySelector('.ventilation_fan-2'); // Кнопка скорость 2
let ventilationFan3 = document.querySelector('.ventilation_fan-3'); // Кнопка скорость 3


let client  = mqtt.connect('ws://192.168.42.1:18883');


client.subscribe('/devices/FanCoil_1/#');
client.subscribe('/devices/wb-adc/controls/#');
console.log(client);

client.on("message", function (topic, payload) {
    
    if (topic === "/devices/wb-adc/controls/A3"){
        tempHtml.textContent = 50 / 10 * (+payload);
    } else if (topic === "/devices/FanCoil_1/controls/Temperature"){
        rhHtml.textContent = payload;
    } else if (topic === "/devices/FanCoil_1/controls/Set mode"){
        
        if(+payload === 1){
            ventilationFan3.classList.remove('btn_act-green');
            ventilationFan2.classList.remove('btn_act-green');
            ventilationFan1.classList.add('btn_act-green');
        }else if(+payload === 2){
            ventilationFan3.classList.remove('btn_act-green');
            ventilationFan1.classList.remove('btn_act-green');
            ventilationFan2.classList.add('btn_act-green');
        }else if(+payload === 0){
            ventilationFan2.classList.remove('btn_act-green');
            ventilationFan1.classList.remove('btn_act-green');
            ventilationFan3.classList.add('btn_act-green');
        };
    };
    
});

ventilationFan1.addEventListener('click', OpenPopup1);
ventilationFan2.addEventListener('click', OpenPopup2);
ventilationFan3.addEventListener('click', OpenPopup3);

setTempBtmAdd.addEventListener('click', OpenPopup4);
setTempBtmLess.addEventListener('click', OpenPopup5);

  function OpenPopup1() {
    client.publish("/devices/FanCoil_1/controls/Set mode/on", "1");
    // console.log(client.publish);
    // let num = tempv.textContent;
    // tempv.textContent = +num + 1;
  };
  function OpenPopup2() {
    client.publish("/devices/FanCoil_1/controls/Set mode/on", "2");
  };
  function OpenPopup3() {
    client.publish("/devices/FanCoil_1/controls/Set mode/on", "0");
  };

  function OpenPopup4() {
    client.publish("/devices/FanCoil_1/controls/Set temperature/on", `${+setTempInput.textContent + 1}`);
  };

  function OpenPopup5() {
    client.publish("/devices/FanCoil_1/controls/Set temperature/on", `${+setTempInput.textContent - 1}`);
  };