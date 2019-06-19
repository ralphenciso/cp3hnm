let calendar = document.querySelector("#schedcalendar");


calendar = jsCalendar.new('#schedcalendar');


calendar.onDateRender(function(date, element, info) {
        
  

    if ( checksched(date, data)) {
        element.style.backgroundColor = '#ff9a23';
    }
});





function checksched(date, array){
    let booked = false;

    if(array){
        array.forEach(v => {
            if(date >= new Date(v.startdate) && date <= new Date(v.enddate) && date.getDay() !== 0 && date.getDay() !== 6){
                booked = true;
            }
        })
    }

    return booked
}
