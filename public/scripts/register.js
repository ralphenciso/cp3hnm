let error = document.querySelector('#error');
let pass = document.querySelector('#password');
let cpass = document.querySelector('#cpassword');
let form = document.querySelector('#regform');


console.log(form)



form.addEventListener('submit', (e) => {
    if(pass.value !== cpass.value ){
        e.preventDefault();
        error.innerHTML = "Passwords doesn't match"
        error.classList.remove('d-none')
    }
})

pass.addEventListener('click', () => {
    error.classList.add('d-none')
})

cpass.addEventListener('click', () => {
    error.classList.add('d-none')
})
