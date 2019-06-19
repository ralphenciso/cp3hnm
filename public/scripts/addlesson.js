const input = document.querySelector('.programinput');
const add = document.querySelector('#addprogram');
const submit = document.querySelector('#submit')


add.addEventListener('click', () => {
    console.log(input)
    let newinput = input.cloneNode(true);

    newinput.removeChild(newinput.lastElementChild);
    let delb = document.createElement('i');
    delb.classList = "material-icons ml-auto deleteprogram";
    delb.innerHTML = "delete";
    newinput.appendChild(delb);
    console.log(submit);
    input.parentNode.insertBefore(newinput, submit);

    dellistener();
})



function dellistener(){
    let del = document.querySelectorAll('.deleteprogram');
    del.forEach(delb => {
        delb.addEventListener('click', () => {
            delb.parentNode.remove();
        })
    })
}