const instructors = document.querySelector('#instructorselect');
const lesson = document.querySelector('#lessonselect');
const timeselect = document.querySelector('#timeselect');
const timeselectinput = document.querySelector('#timeselectinput');
const programs = document.querySelector('#programs');
const schedconflict = document.querySelector('#schedconflict');
let startdate = document.querySelector("[name='startdate']");
let enddate = document.querySelector("[name='enddate']");
let submit = document.querySelector('#submitform');
let form = document.querySelector('#enrollmentform');
let error = document.querySelector('#error');
let duration = 0;
let conflict = false;
let calendarAM;
let calendarPM;
let AMschedule;
let PMschedule;


function FDW(date) {
    return new Date(date.setDate(date.getDate() - date.getDay()))
}
function FMW(date) {
    return new Date(date.setDate(date.getDate() - date.getDay() + 1 ))
}

function checkbooked(date, time){
    return (
        date >= new Date(startdate.value).addDays(-1) && date <= new Date(enddate.value) &&
        date.getDay() !== 0 && date.getDay() !== 6 &&
        timeselect.value === time )
}


lesson.addEventListener('change', () => {
    updateinstructors();
    updateprograms();
});

function updateinstructors(){
    let string = '<option selected>Choose...</option>';
    let obj = data.filter(item => item.instrument === lesson.value)
    obj[0].instructors.forEach(instructor => {
        string += `<option value="${instructor}" >${instructor}</option>`
    })
    
    instructors.innerHTML = string;

    // reset calendar
    displayCalendar()
}

function updateprograms(){
    let string = `
    <div class="custom-control custom-radio">
        <input type="radio" name="program" id="pall" class="custom-control-input" value="all" checked>
        <label class="custom-control-label" for="pall">All</label>
    </div>`

    let obj = data.filter(item => item.instrument === lesson.value);

    obj[0].programs.forEach((program,i) => {
        string += 
            `<div class="custom-control custom-radio">
                <input type="radio" name="program" id="p${i}" class="custom-control-input" value="${program.name}" data-duration="${program.duration}">
                <label class="custom-control-label" for="p${i}">${program.name} - ${program.duration} Weeks</label>
            </div>`
    })
    programs.innerHTML = string;
    setradiolisteners()
    schedconflict.classList.add('d-none');

}

instructors.addEventListener('change', displayCalendar)

function displayCalendar(){
    document.querySelector("#calendarAM").innerHTML = '';
    document.querySelector("#calendarPM").innerHTML = '';

    if(instructors.value === 'Choose...'){ return };
    
    calendarAM = jsCalendar.new('#calendarAM');
    calendarPM = jsCalendar.new('#calendarPM');

    calendarAM.min("now");
    calendarPM.min("now");
    let nextYear =  Date.today().addYears(1);
    calendarAM.max(nextYear);
    calendarPM.max(nextYear);

    let ischedule = schedule.filter(v => { return v.instructor === instructors.value})
    AMschedule = ischedule[0].instschedule.filter(s => s.time === "AM");
    PMschedule = ischedule[0].instschedule.filter(s => s.time === "PM");
    
    calendarAM.onDateRender(function(date, element, info) {
        if ( FDW(date) <= new Date()) {
            element.parentNode.classList.add('priordate');
            element.title = "can't book prior date";
            element.dataset.status = 'prior';
        } else if(checksched(FDW(date), AMschedule)){
            element.parentNode.classList.remove('priordate');
            element.parentNode.classList.add('datena');
            element.title = "not available";;
            element.dataset.status = 'na'
        } else {
            element.parentNode.classList = '';
            element.title = "available";
            element.dataset.status = 'available';
        }
    });

    calendarPM.onDateRender(function(date, element, info) {
        if ( FDW(date) <= new Date()) {
            element.parentNode.classList.add('priordate');
            element.title = "can't book prior date";
            element.dataset.status = 'prior';
        } else if(checksched(FDW(date), PMschedule)){
            element.parentNode.classList.add('datena');
            element.title = 'not available';
            element.dataset.status = 'na'
        } else {
            element.parentNode.classList = '';
            element.title = "available";
            element.dataset.status = 'available';
        }

    });

    calendarAM.refresh()
    calendarPM.refresh()
    
    calendarAM.onDateClick((event, date) => {
        if(event.target.dataset.status === 'na' || event.target.dataset.status === 'prior') {
            return
        };
        
        startdate.value = FMW(date).toString('yyyy-MM-dd');    
        updateEndDate()
        timeselect.selectedIndex = 0;

        conflict = false;
        calendarAM.onDateRender(function(date, element, info) {
              if (checkbooked(date, "AM")) {
                  if(element.dataset.status === "na" || element.dataset.status === "conflict" ) {
                      element.classList = 'bgred';
                      element.title = "conflict";
                      element.dataset.status = 'conflict';
                      conflict = true;
                    } else {
                      element.classList = 'bggreen';
                      element.title = "selected";
                      element.dataset.status = 'selected';
                  }
              }


              if(conflict){
                  schedconflict.classList.remove('d-none')
                } else {
                    schedconflict.classList.add('d-none')
              } 
        })
        calendarAM.refresh()
        calendarPM.refresh()
    })

    calendarPM.onDateClick((event, date) => {
        if(event.target.dataset.status === 'na' || event.target.dataset.status === 'prior') {
            return
        };
        
        startdate.value = FMW(date).toString('yyyy-MM-dd');    
        updateEndDate()
        timeselect.selectedIndex = 1;

        conflict = false;
        calendarPM.onDateRender(function(date, element, info) {
              if (checkbooked(date, "PM")) {
                  if(element.dataset.status === "na" || element.dataset.status === "conflict") {
                      element.style.background = 'red';
                      element.title = "conflict";
                      element.dataset.status = 'conflict';
                      conflict = true;
                  } else {
                      element.style.background = 'green';
                      element.title = "selected";
                      element.dataset.status = 'selected';
                  }
              }
              if(conflict){
                  schedconflict.classList.remove('d-none')
                } else {
                    schedconflict.classList.add('d-none')
              } 
        })
        calendarAM.refresh()
        calendarPM.refresh()
    })





}








function setradiolisteners(){
    let programradio = document.querySelectorAll("input[name='program']");
    programradio.forEach(radio => {
        radio.addEventListener('change', () => {
            let selected =  document.querySelector('input[name="program"]:checked');
            if (selected.id === 'pall'){
                duration = 0;
                programradio.forEach(r => {
                    duration += r.dataset.duration ? Number(r.dataset.duration) : 0 
                })
            } else {
                duration = radio.dataset.duration
            }
            updateEndDate()
            checkconflict();
            calendarAM.refresh();
            calendarPM.refresh();
        })
    })
    updateDuration()
    
}

function updateDuration(){
    let programradio = document.querySelectorAll("input[name='program']");
    let selected =  document.querySelector('input[name="program"]:checked');
    if (selected.id === 'pall'){
        duration = 0;
        programradio.forEach(r => {
            duration += r.dataset.duration ? Number(r.dataset.duration) : 0 
        })
    } else {
        duration = radio.dataset.duration
    }
    updateEndDate()
    checkconflict()
    calendarAM.refresh();
    calendarPM.refresh();
}

startdate.addEventListener('change', () => {

    updateEndDate();
    checkconflict()
})

function updateEndDate(){
    enddate.value = new Date(startdate.value).addDays(duration * 7 - 3).toString("yyyy-MM-dd")  
}


function checksched(date, array){
    let notavailable = false;

    if(array){
        array.forEach(v => {
            if(date >= new Date(v.startdate) && date <= new Date(v.enddate)){
                notavailable = true;
            }
        })
    }

    return notavailable
}


function checkconflict(){
    if(instructors.value !== 'Choose') {
        if(timeselect.value === 'AM'){
            if (checksched(new Date(startdate.value), PMschedule) && 
                checksched(new Date(enddate.value), PMschedule)){
                    schedconflict.classList.remove('d-none')
                    conflict = true;
                } else {
                    schedconflict.classList.add('d-none')
                    conflict = false;
                }
        } else if (timeselect.value === 'PM'){

            if (checksched(new Date(startdate.value), AMschedule) &&
                checksched(new Date(enddate.value), AMschedule)) {
                schedconflict.classList.remove('d-none')
                conflict = true
            } else {
                schedconflict.classList.add('d-none')
                conflict = false
            }
        }
    }
}

submit.addEventListener('click', () => {
    timeselectinput.value = timeselect.value
})

startdate.min = new Date().toISOString().split("T")[0];
startdate.value = new Date().toISOString().split("T")[0];
enddate.min = new Date().toISOString().split("T")[0];
enddate.value = new Date().toISOString().split("T")[0];


form.addEventListener('submit', (e) => {
    if(instructors.value === 'Choose...'){
        e.preventDefault();
        error.innerHTML += "<br>Please select an instructor";
        error.classList.remove('d-none');
    } 
    if(conflict){
        e.preventDefault();
        error.innerHTML += "<br>Selected Schedule has conflict";
        error.classList.remove('d-none');
    }
})

form.addEventListener('change', (e) => {
    error.innerHTML = "";
    error.classList.add('d-none');
})





updateinstructors();
setradiolisteners();