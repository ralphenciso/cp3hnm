const input = document.querySelector('.instrumentinput');
const add = document.querySelector('#addinstrument');
const submit = document.querySelector('#submit')


add.addEventListener('click', () => {
    console.log(input)
    let newinput = input.cloneNode(true);

    newinput.removeChild(newinput.lastElementChild);
    let delb = document.createElement('i');
    delb.classList = "material-icons ml-auto deleteinstrument";
    delb.innerHTML = "delete";
    newinput.appendChild(delb);
    console.log(submit);
    input.parentNode.insertBefore(newinput, submit);

    dellistener();
})



function dellistener(){
    let del = document.querySelectorAll('.deleteinstrument');
    del.forEach(delb => {
        delb.addEventListener('click', () => {
            delb.parentNode.remove();
        })
    })
}