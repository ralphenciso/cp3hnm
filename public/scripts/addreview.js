let lessonsEnrolled = document.querySelector('#lessonsEnrolled');
let instructorSelect = document.querySelector('#instructor');
let stars = document.querySelectorAll(".star");
let averating = document.querySelectorAll('.averagerating');
let reviewsBody = document.querySelectorAll(".reviewsbody");
let instructorfilter = document.querySelectorAll(".instructorfilter");
let userfilter = document.querySelectorAll(".userfilter");
let user = document.querySelector('#user');

instructor.addEventListener('change', () => {
    let instructor = instructorSelect.value;

    let lessons =  [...new Set(enrollments.filter(v => v.instructor === instructor).map(v => v.lesson))];

    let string = "";

    lessons.forEach((lesson,i) => {
        string +=  `<option value="${lesson}" ${!i ? 'selected' : ''} class="text-capitalize" >${lesson}</option>`
    })

    lessonsEnrolled.innerHTML = string;
    
})


stars.forEach(star => {
    star.addEventListener('click', () => {   
        console.log(star);
        stars.forEach(s => {
            if(Number(s.dataset.value) <= Number(star.dataset.value)) {
                s.classList.add('starcolor');
            } else {
                s.classList.remove('starcolor');
            }
        }) 
    })
})


averating.forEach(rating => {
    let averagerating =  Math.round(reviews.filter(v => v.instructor === rating.dataset.name).map(r => r.rating)
                                .reduce((total, amount, index, array) => {
                                    total += amount;
                                    if (index === array.length - 1) {
                                        return total / array.length;
                                    } else {
                                        return total;
                                    }
                                }, 0))

    let colored = '',
        nocolor = '';

    for(let i = 0; i < 10; i++){
        if(averagerating > i){
            colored += '★'
        } else {
            nocolor += '★'
        }
    }

    rating.innerHTML = colored;
    rating.parentNode.append(nocolor);

})


reviewsBody.forEach(revel => {
    let studentReviews = reviews.filter(v => v.instructor === revel.dataset.name);
    

    studentReviews.forEach(srev => {
        let rating = srev.rating;

        let colored = '',
            nocolor = '';

        for(let i = 0; i < 10; i++){
            if(rating > i){
                colored += '★'
            } else {
                nocolor += '★'
            }
        }
        let del = srev.student === user.dataset.filter ?  `
                    <form action="/reviews/${srev._id}?_method=DELETE" method="POST">
                        <button class="revdel btn btn-outline-danger p-1"><i class="material-icons">delete</i></button>    
                    </form>`
                    : '';

        

        let string = `
            <div class="col-6 review card p-3" data-filter="${srev.student}">
                <h5 class="card-title text-capitalize mb-0">${srev.student} <br>
                <span class="starcolor">${colored}</span>${nocolor}</h5>
                <p class="card-text text-capitalize">Lesson: ${srev.lesson}</p>
                <p class="card-text mb-3">${srev.review}</p>
                ${del}
            </div>
        `
        revel.innerHTML += string;
    })

})



instructorfilter.forEach(f => {
    f.addEventListener('click', (e) => {
        let filter = f.dataset.filter;
        let cards = document.querySelectorAll(".cardsreview");
    
        cards.forEach(c => {
            
            if(c.dataset.filter === filter || filter === 'all'){
                c.classList.remove('d-none');
            } else {
                c.classList.add('d-none');
            }
        })

    })
})

userfilter.forEach(f => {
    f.addEventListener('click', () => {
        let filter = f.dataset.filter;
        let revs = document.querySelectorAll(".review");

        revs.forEach(r => {
            if(r.dataset.filter === filter || filter === 'all'){
                r.classList.remove('d-none');
            } else {
                r.classList.add('d-none');
            }
        })
        
    })
})