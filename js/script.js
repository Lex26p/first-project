"use strict";
let even;
if ('ontouchstart' in document.documentElement) {
  even = "touchstart";
} else {
  even = "click";
}
//Модальные окна
const btnInfo = document.querySelectorAll('.btn_info'), // Инструкция
      headerBtmInfo = document.querySelector('.header__btm_info'), // Инструкция
      popapCloseInfo = document.querySelector('.popap__close_info'), // Закрыть инструкцию
      popapInfo = document.querySelector('.popap__info'), // Попап
      popapText = document.querySelector('.popap__content__text'), // Попап контент
      popapSubTitle = document.querySelectorAll('.popap__subtitle'), // Попап разделы
      popapFanCoil = document.querySelector('.popap__fan-coil'), // Попап фанкойлы
      popapCloseFanCoil = document.querySelector('.popap__close_fan-coil'), // Закрыть попап фанкойлы
      fanCoilActCont = document.querySelector('.fan-coil__act_cont'),// Контейнер значков состояния (открыть попап)
// Показания датчиков
      tempHtml = document.querySelector('.temp__html'), // Температура
      rhHtml = document.querySelector('.rh__html'), // Влажность
      co2Html = document.querySelector('.co2__html'), // СО2
// Вставка температуры
      setTempInput = document.querySelector('.set-temp__input'), // Вставка температуры
      setTempBtmCont = document.querySelector('.set-temp__btm_cont'), // Кнопки вставка температуры
// Шторы
      luxNum = document.querySelector('.lux-num'), // Яркость
      curtainsBtmCont = document.querySelector('.curtains__btm_cont'), // Кнопки set и aut шторы  
      moreМodesИtmСontСurtains = document.querySelector('.more-modes__btm_cont_curtains'),
      //btnMoreModes1 = document.querySelector('.btn_more-modes1'), // 
      //btnMoreModes2 = document.querySelector('.btn_more-modes2'), // 
      curtainsSpeedInput = document.querySelector('.curtains__speed-input'), // Ползунок
      curtainsValue = document.querySelector('.curtains_value'), // Число проценты
// Фанкойлы
      fanCoilBtmCont = document.querySelector('.fan-coil__btm_cont'), // Кнопки Режим
      fanCoilSpeedInput = document.querySelector('.fan-coil__speed-input'), // Ползунок
      fanCoilValue = document.querySelector('.fan-coil_value'), // Число проценты
      fanCoilAct = document.querySelectorAll('.fan-coil__act'), // Значки состояния
      fanCoilActBtm = document.querySelector('.fan-coil__popap_list'), // Кнопки включить включить  фанкойлы (контейнер)
      fanCoilName = document.querySelectorAll('.fan-coil__name'), // Подсветка для фанкойлов на карте
      popapCloseAlert = document.querySelector('.popap__close_alert'), // Закрыть сообщение
      popapАlert = document.querySelector('.popap__alert'), // Попап сообщение
      popapError = document.querySelector('.popap__error'), // Попап Ошибка
      errorText = document.querySelector('.error_text'), // Попап текст ошибки
// Вентиляция
      ventilationBtmCont = document.querySelector('.ventilation__btm_cont-on-Off'), // Кнопки on/off
      ventilationStatus = document.querySelector('.ventilation_status'), // Фактический статус
// Проветривание
      moreModesOnOffCont = document.querySelector('.more-modes__on-Off_cont'), // Кнопки on/off
      moreModesBtmContTime = document.querySelector('.more-modes__btm_cont-time'), // Кнопки + -
      moreModesTime = document.querySelector('.more-modes_time'); // Время осталось

let setOut;



headerBtmInfo.addEventListener(even, () => { // Кнопка открить попап инструкция
  popapInfo.classList.add('popap__open');
  popapText.scrollTop = 0;
});
 
popapCloseInfo.addEventListener(even, () => { // Кнопка закрыть попап инструкция
  popapInfo.classList.remove('popap__open');
});
popapCloseAlert.addEventListener(even, () => { // Кнопка закрыть попап инструкция
  popapАlert.classList.remove('popap__open');
  client.publish(`/devices/FanCoil/controls/Alert/on`, `0`);
});

btnInfo.forEach(info => {   //Назначить слушатель событий для кнопок инфо (цикл)
  info.addEventListener(even, (e) => {  // Открить попап инфо
    popapInfo.classList.add('popap__open');
    popapSubTitle[+(e.target.getAttribute('data-info'))].scrollIntoView();
  });
});

fanCoilActCont.addEventListener(even, () => {  // Кнопка открить попап фанкойлы
  popapFanCoil.classList.add('popap__open');
});

popapCloseFanCoil.addEventListener(even, () => {  // Кнопка закрыть попап фанкойлы
  popapFanCoil.classList.remove('popap__open');
});

//const client  = mqtt.connect(`ws://${window.location.hostname}:18883`);
const client  = mqtt.connect(`ws://192.168.42.1:18883`);

client.subscribe('/devices/vent-7-Nebo_1/controls/Temperature');
client.subscribe('/devices/Info/controls/CO2Info');
client.subscribe('/devices/Info/controls/RhInfo');
client.subscribe('/devices/vent-7-Nebo_1/controls/Set-temp');
client.subscribe('/devices/LuxControl/controls/SetMode');
client.subscribe('/devices/z-way/controls/Shtora1 16-0-38');
client.subscribe('/devices/FanCoil/controls/SetMode');
client.subscribe('/devices/FanCoil/controls/#');
client.subscribe('/devices/vent-7-Nebo_1/controls/fan-set');
client.subscribe('/devices/WintDev/controls/SetMode');
client.subscribe('/devices/WintDev/controls/time');
client.subscribe('/devices/wb-msw-v3_89/controls/Illuminance');
client.subscribe('/devices/vent-7-Nebo_1/controls/Status');
client.subscribe('/devices/FanCoil/controls/Alert');


// client.on('offline', function () {
//   popapError.classList.add('popap__open');
//   errorText.innerText = "Нет связи с контроллером!"
//   client.on('connect', function () {
//     errorText.innerText = "Связь восстановлена!"
//     //setTimeout(() => popapError.classList.remove('popap__open'), 3000);
//     setTimeout(() => location.reload(), 2000);
//   });
// });


client.on("message", function (topic, payload) {
  
  if (topic === '/devices/vent-7-Nebo_1/controls/Temperature'){  // Показываем температуру с датчика
    tempHtml.innerText = (+payload).toFixed(1);
  } else if (topic === '/devices/Info/controls/CO2Info'){  // Показываем CO2 с датчика
    co2Html.innerText = (+payload).toFixed(0);
  } else if (topic === '/devices/Info/controls/RhInfo'){  // Показываем влажность с датчика
    rhHtml.innerText = (+payload).toFixed(0);
  } else if (topic === '/devices/vent-7-Nebo_1/controls/Set-temp'){// Показываем вставку температуры
    setTempInput.innerText = +payload;
  } else if (topic === '/devices/LuxControl/controls/SetMode'){   // Режим on auto шторы
    curtainsBtmCont.children[+!+payload + 1].classList.remove('btn_act-green');
    curtainsBtmCont.children[+payload + 1].classList.add('btn_act-green');
  } else if (topic === "/devices/z-way/controls/Shtora1 16-0-38"){
    curtainsSpeedInput.style.background = `linear-gradient(to left, rgba(255, 255, 255, 0.7) ${100 - +payload}%,  rgba(255, 255, 255, 0) 0%)`;
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
     } else if (+payload === 3){
       setOut = 2;
       fanCoilBtmCont.children[3].classList.add('btn_act-red');
       fanCoilAct.forEach(del => {   // Удалить класы у индикаторов фанкойлов если режим выкл (2)
         del.classList.remove('fan-coil__name_act-on', 'fan-coil__name_act-off');
       });
     } else if (+payload === 2){
       setOut = 3;
       fanCoilBtmCont.children[2].classList.add('btn_act-green');
       for (let i = 1; i <= 8; i++) { // Возвращаем класы у индикаторов фанкойлов в режиме авто (3)
        client.subscribe(`/devices/FanCoil/controls/F-${i}`);
       }
     }
   } else if(topic === '/devices/FanCoil/controls/Alert'){
     if (+payload === 1){
       popapАlert.classList.add('popap__open');
     }
   } else if (topic.includes('/devices/FanCoil/controls/F') && topic.length < 30){   //Изменить цвет активных фанкойлов
    if (+payload === 0){
      fanCoilName[+topic.slice(28, 29) - 1].classList.add('fan-coil__name_act-off');
      fanCoilName[+topic.slice(28, 29) - 1].classList.remove('fan-coil__name_act-on');
      fanCoilName[+topic.slice(28, 29) - 1].setAttribute('data-item', '1');
      fanCoilName[+topic.slice(28, 29) - 1].children[0].setAttribute('data-item', '1');
      if (setOut === 1 || setOut === 3){ //Если режим выкл (2) то индекаторы не переключаются.
        fanCoilAct[+topic.slice(28, 29) - 1].classList.add('fan-coil__name_act-off');
        fanCoilAct[+topic.slice(28, 29) - 1].classList.remove('fan-coil__name_act-on');
      }
    } else if (+payload === 1){
      fanCoilName[+topic.slice(28, 29) - 1].classList.add('fan-coil__name_act-on');
      fanCoilName[+topic.slice(28, 29) - 1].classList.remove('fan-coil__name_act-off');
      fanCoilName[+topic.slice(28, 29) - 1].setAttribute('data-item', '0');
      fanCoilName[+topic.slice(28, 29) - 1].children[0].setAttribute('data-item', '0');
      if (setOut === 1 || setOut === 3){ //Если режим выкл (2) то индекаторы не переключаются.
        fanCoilAct[+topic.slice(28, 29) - 1].classList.add('fan-coil__name_act-on');
        fanCoilAct[+topic.slice(28, 29) - 1].classList.remove('fan-coil__name_act-off');
      }
    }
   } else if (topic === '/devices/FanCoil/controls/FanSpeedSet'){    // показываем скорость фанкойлов.
    fanCoilSpeedInput.value = payload;
    fanCoilValue.innerText = payload  + '%';
  } else if (topic === '/devices/FanCoil/controls/FanSpeedValue'){ // Градиэнт для ползунка фанкойлов
    fanCoilSpeedInput.style.background = `linear-gradient(to right, rgba(0, 255, 0, 0.7) ${+payload / 100}%, #403e3e 0%,  rgba(255, 255, 255, 0) 0%)`;
  } else if (topic === '/devices/vent-7-Nebo_1/controls/fan-set'){// Показываем on off 1 2 3 вентмашина
    for (let i = 1; i < 5; i++) { //Удалить класы режимов вентмашины.
      ventilationBtmCont.children[i].classList.remove('btn_act-green', 'btn_act-red');
    }
    ventilationBtmCont.children[+payload].classList.add(`${ventilationBtmCont.children[+payload].getAttribute('data-info')}`);
  } else if (topic === '/devices/vent-7-Nebo_1/controls/Status'){ // Показываем фактический режим работы вентмашины
    if (+payload === 0){
      ventilationStatus.innerText = "Остановка";
    } else if (+payload === 1){
      ventilationStatus.innerText = "Запуск";
    } else if (+payload === 2){
      ventilationStatus.innerText = "Низкая скорость";
    } else if (+payload === 3){
      ventilationStatus.innerText = "Средняя скорость";
    } else if (+payload === 4){
      ventilationStatus.innerText = "Максимальная скорость";
    } else if (+payload === 5){
      ventilationStatus.innerText = "Поддержка нагрева";
    } else if (+payload === 6){
      ventilationStatus.innerText = "Поддержка охлаждения";
    } else if (+payload === 7){
      ventilationStatus.innerText = "CO₂";
    } else if (+payload === 8){
      ventilationStatus.innerText = "Естественное охлаждение";
    } else if (+payload === 9){
      ventilationStatus.innerText = "Охлаждение";
    } else if (+payload === 10){
      ventilationStatus.innerText = "Пожар";
    } else if (+payload === 11){
      ventilationStatus.innerText = "Дым";
    } else if (+payload === 12){
      ventilationStatus.innerText = "Рециркуляция";
    } else if (+payload === 13){
      ventilationStatus.innerText = "Размораживание";
    }
    
  }else if (topic === '/devices/WintDev/controls/time'){ // получить минуты таймера
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
  } else if (topic === '/devices/wb-msw-v3_89/controls/Illuminance'){  // Показываем Яркость
    luxNum.innerText = (+payload).toFixed(0);
  }
});










setTempBtmCont.addEventListener(even, (e) => { //Вставка температуры
  if (e.target.getAttribute('data-set') === '2'){
    if (+setTempInput.innerText < 28){
      setTempInput.innerText = +setTempInput.innerText + 1;
    }
  } else if (e.target.getAttribute('data-set') === '1'){
    if (+setTempInput.innerText > 18){
      setTempInput.innerText = +setTempInput.innerText - 1;
    }
  }
});

curtainsBtmCont.addEventListener(even, (e) => {  //Переключить режимы шторы.
  curtainsBtmCont.children[+!+e.target.getAttribute('data-item') + 1].classList.remove('btn_act-green');
    curtainsBtmCont.children[+e.target.getAttribute('data-item') + 1].classList.add('btn_act-green');
});

// moreМodesИtmСontСurtains.addEventListener('touchstart', (e) => {  //Поднять опустить шторы.
//   if (e.target.getAttribute('data-item') === '1'){
//   client.publish(`/devices/wb-mr6cu_91/controls/K1/on`, 1);
//   } else if (e.target.getAttribute('data-item') === '2'){
//     client.publish(`/devices/wb-mr6cu_91/controls/K2/on`, 1);
//     }
// });

// moreМodesИtmСontСurtains.addEventListener('touchend', (e) => {  //Поднять опустить шторы 2.
//   if (e.target.getAttribute('data-item') === '1'){
//   client.publish(`/devices/wb-mr6cu_91/controls/K1/on`, 0);
//   } else if (e.target.getAttribute('data-item') === '2'){
//     client.publish(`/devices/wb-mr6cu_91/controls/K2/on`, 0);
//     }
// });

function curtainsSethtml() { //Показать  проценты шторы
  curtainsValue.innerText = curtainsSpeedInput.value + '%';
}

function curtainsSetVal() { //Установить процент шторы
  curtainsSpeedInput.style.background = `linear-gradient(to left, rgba(255, 255, 255, 0.7) ${100 - +curtainsSpeedInput.value}%,  rgba(255, 255, 255, 0) 0%)`;
}


fanCoilBtmCont.addEventListener(even, (e) => { // Установить режим работы фанкойлов on off auto
  for (let i = 1; i < 4; i++) { //Удалить класы режимов фанкойлов.
    fanCoilBtmCont.children[i].classList.remove('btn_act-green', 'btn_act-red');
  }
  if (+e.target.getAttribute('data-item') === 1){
    setOut = 1;
    fanCoilBtmCont.children[1].classList.add('btn_act-green');
  } else if (+e.target.getAttribute('data-item') === 3){
    setOut = 2;
    fanCoilBtmCont.children[3].classList.add('btn_act-red');
  } else if (+e.target.getAttribute('data-item') === 2){
    setOut = 3;
    fanCoilBtmCont.children[2].classList.add('btn_act-green');
  }
});

fanCoilActBtm.addEventListener(even, (e) => {   // Кнопки включить и выключить фанкойлы
  e.target.classList.toggle(e.target.getAttribute('data-item'));
});

function fanSpeedSet() {  // устанвить скорость фанкойлов
  fanCoilSpeedInput.style.background = `linear-gradient(to right, rgba(0, 255, 0, 0.7) ${+fanCoilSpeedInput.value}%, #403e3e 0%,  rgba(255, 255, 255, 0) 0%)`;
}

function fanSpeedSethtml() { //Показать скорость фанкойлов проценты
  fanCoilValue.innerText = fanCoilSpeedInput.value + '%';
}

ventilationBtmCont.addEventListener(even, (e) => { //Вентмашина on/off 1 2 3
  for (let i = 1; i < 5; i++) { //Удалить класы режимов вентмашины.
    ventilationBtmCont.children[i].classList.remove('btn_act-green', 'btn_act-red');
  }
  ventilationBtmCont.children[+e.target.getAttribute('data-num')].classList.add(`${ventilationBtmCont.children[+e.target.getAttribute('data-num')].getAttribute('data-info')}`);
});

moreModesOnOffCont.addEventListener(even, (e) => {   // Кнопки включить и выключить режим проветривания
  moreModesOnOffCont.children[+e.target.getAttribute('data-num') + 1].classList.remove(`${moreModesOnOffCont.children[+e.target.getAttribute('data-num') + 1].getAttribute('data-info')}`);
  moreModesOnOffCont.children[+!+e.target.getAttribute('data-num') + 1].classList.add(`${moreModesOnOffCont.children[+!+e.target.getAttribute('data-num') + 1].getAttribute('data-info')}`);
  if (+e.target.getAttribute('data-num') === 0){
    moreModesBtmContTime.classList.remove("more-modes__btm_cont-time-act");
    //client.publish(`/devices/WintDev/controls/time/on`, `1`);
  } else if (+e.target.getAttribute('data-num') === 1){
    moreModesBtmContTime.classList.add("more-modes__btm_cont-time-act");
    //client.publish(`/devices/WintDev/controls/time/on`, `300`);
  }



  // client.publish(`/devices/WintDev/controls/SetMode/on`, `${e.target.getAttribute('data-num')}`);
});

moreModesBtmContTime.addEventListener(even, (e) => {  //Добавить уменьшить время таймера

  if (e.target.innerText === '+'){
    moreModesTime.innerText = `${+moreModesTime.innerText + 5}`;
  } else if (e.target.innerText === '-'){
    moreModesTime.innerText = `${+moreModesTime.innerText - 5}`;
  }
});


