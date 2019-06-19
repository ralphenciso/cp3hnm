const add = document.querySelectorAll('.addinstrument');
const submit = document.querySelector('#submit')
const videomodals = document.querySelectorAll(".videomodal");
const thumbnails = document.querySelectorAll(".vidthumbnail");




add.forEach(addb => {
    addb.addEventListener('click', () => {
        let input = addb.parentNode.parentNode.querySelector('.instrumentinput');

        let newinput = input.cloneNode(true);
        newinput.removeChild(newinput.lastElementChild);
        let delb = document.createElement('i');
        delb.classList = "material-icons ml-auto deleteinstrument";
        delb.innerHTML = "delete";
        newinput.appendChild(delb);
        input.parentNode.appendChild(newinput);
    
        dellistener();
    })
})




function dellistener(){
    let del = document.querySelectorAll('.deleteinstrument');
    del.forEach(delb => {
        delb.addEventListener('click', () => {
            delb.parentNode.remove();
        })
    })
}

videomodals.forEach(m => {
    $(`#${m.id}`).on('hidden.bs.modal', function (e) {
        let ci = m.querySelectorAll('.carousel-item')
        ci.forEach(v => v.innerHTML = `<img src="/images/vidthumb.png" class="vidthumbnail">`);
        loadvidlistener();
      })
})

function loadvidlistener(){
    thumbnails.forEach(t => {
        t.addEventListener('click', ()=>{
            let vid = `
                <iframe width="770" height="450" src='${t.parentNode.dataset.url}?autoplay=1&modestbranding=1&autohide=1&showinfo=0' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
            `
            t.parentNode.innerHTML = vid;
        })
    })
}


dellistener();
loadvidlistener();

