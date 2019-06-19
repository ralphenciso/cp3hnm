const add = document.querySelectorAll('.addprogram');
const submit = document.querySelector('#submit')


add.forEach(addb => {
    addb.addEventListener('click', () => {
        let input = addb.parentNode.parentNode.querySelector('.programinput');

        let newinput = input.cloneNode(true);
        newinput.removeChild(newinput.lastElementChild);
        let delb = document.createElement('i');
        delb.classList = "material-icons ml-auto deleteprogram";
        delb.innerHTML = "delete";
        newinput.appendChild(delb);
        input.parentNode.appendChild(newinput);
    
        dellistener();
    })
})




function dellistener(){
    let del = document.querySelectorAll('.deleteprogram');
    del.forEach(delb => {
        delb.addEventListener('click', () => {
            delb.parentNode.remove();
        })
    })
}

dellistener();