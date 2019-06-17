
Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

let date = new Date(),
MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
eventList = {},
calendar__eventList = document.querySelector('.calendar__event-list'),
calendar__days = document.querySelector('.calendar__days'),
calendar__weeks = document.querySelector('.calendar__weeks'),
calendar__arrowPrev = document.getElementById('calendar__arrow-prev'),
calendar__arrowNext = document.getElementById('calendar__arrow-next'),
calendar__date = document.querySelector('.calendar__date'),
calendar__eventListBox = document.querySelector('.calendar__event-list-box'),
eventId = 0,
selectedDate,
isEmpty = (obj) =>{

    for (var key in obj) {

        return false;

    }

    return true;

},
calendarEventRemove = (id) =>{

    delete eventList[selectedDate][id];

    if(isEmpty(eventList[selectedDate])){

        delete eventList[selectedDate];

    }

    calendar__eventListBox.innerHTML = '';

    for (key in eventList[selectedDate]) {
        
        calendar__eventListBox.innerHTML += getCalendarItem(eventList[selectedDate][key], key);

    }

},
calendarEventInput = (id, e, t) =>{

    e.srcElement.attributes.value.value = t.value;

    eventList[selectedDate][id] = e.srcElement.attributes.value.value;

},
getCalendarItem = (text, id) =>{

    return `<div>
                <input data-calendar-event-id="` + id + `" oninput="calendarEventInput('` + id + `', event, this)" class="calendar__event-list-text" value="` + text + `">
                <button class="calendar__event-list-remove" onclick="calendarEventRemove('` + id + `')">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>`;

},
getEvents = (d) =>{

    selectedDate = d;

    calendar__weeks.style.display = 'none';
    calendar__days.style.display = 'none';
    calendar__arrowPrev.style.display = 'none';
    calendar__arrowNext.style.display = 'none';
    calendar__eventList.style.display = 'block';
    calendar__date.style.display = 'block';

    calendar__date.innerHTML = d.split(" ")[2];
    calendar__eventListBox.innerHTML = '';

    if(eventList[d]){

        for (key in eventList[d]) {

            calendar__eventListBox.innerHTML += getCalendarItem(eventList[d][key], key);

        }

    }

    document.querySelector('.calendar__event-list-prev').onclick = () =>{

        calendar__weeks.style.display = 'block';
        calendar__days.style.display = 'block';
        calendar__arrowPrev.style.display = 'block';
        calendar__arrowNext.style.display = 'block';
        calendar__eventList.style.display = 'none';
        calendar__date.style.display = 'none';

        calndarDays(date.getFullYear(), date.getMonth());

    }

},
calndarDays = (year, month) =>{

    let temporaryDate = new Date();

    temporaryDate.setFullYear(year);
    temporaryDate.setMonth(month);
    temporaryDate.setDate(1);

    document.querySelector('.calendar__days').innerHTML = '';

    let dynamicDate = new Date();

    for(let i = 0; i < temporaryDate.daysInMonth() + temporaryDate.getDay(); i++){

        dynamicDate.setFullYear(year);
        dynamicDate.setMonth(month);
        dynamicDate.setDate(i - temporaryDate.getDay() + 1);

        let isEvent = '',
        fullDate =  dynamicDate.getFullYear() + ' ' + 
                        dynamicDate.getMonth() + ' ' + 
                        dynamicDate.getDate();

        isEvent = eventList[fullDate] ? ' calendar__days-item_event' : '';

        document.querySelector('.calendar__days').innerHTML += `
            <div    class="calendar__days-item` + 
                    (temporaryDate.getMonth() == dynamicDate.getMonth() ? ' calendar__days-item_this-month' : '') + 
                    isEvent + `"
                    data-year='` + dynamicDate.getFullYear() + `'
                    data-month='` + dynamicDate.getMonth() + `'>` + dynamicDate.getDate() + `</div>`;
        
        dynamicDate.setDate(1);

    }

    let calendar__daysItems = document.querySelectorAll('.calendar__days-item');

    for(let i = 0; i < calendar__daysItems.length; i ++){

        calendar__daysItems[i].onclick = () =>{
            
            getEvents(calendar__daysItems[i].dataset.year + ' ' + calendar__daysItems[i].dataset.month + ' ' + calendar__daysItems[i].innerHTML);
        
        }

    }

    document.querySelector('.calendar__title').innerHTML = MONTH[temporaryDate.getMonth()] + ' ' + temporaryDate.getFullYear();

}

calndarDays(date.getFullYear(), date.getMonth());

let calendarStartPoint = date.getMonth();

document.querySelector('.calendar__event-list-add').onclick = () =>{

    eventId++;

    let searchResult = false;

    if(!eventList[selectedDate]){

        eventList[selectedDate] = [];
        
    }

    eventList[selectedDate][eventId] = 'Your event';

    calendar__eventListBox.innerHTML += getCalendarItem(eventList[selectedDate][eventId], eventId);

}

document.getElementById('calendar__arrow-next').onclick = () =>{

    if(date.getMonth() == 11){

        date.setFullYear(date.getFullYear() + 1);
        date.setMonth(0);

        calendarStartPoint = 0;

    }else{

        calendarStartPoint += 1;

    }

    date.setMonth(calendarStartPoint);

    calndarDays(date.getFullYear(), date.getMonth());

}

document.getElementById('calendar__arrow-prev').onclick = () =>{

    if(date.getMonth() == 0){

        date.setFullYear(date.getFullYear() - 1);
        date.setMonth(11);

        calendarStartPoint = 11;

    }else{

        calendarStartPoint -= 1;

    }

    date.setMonth(calendarStartPoint);

    calndarDays(date.getFullYear(), date.getMonth());

}