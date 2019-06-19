const Lesson = require("./models/lesson"),
      User = require("./models/user"),
      Instructor = require("./models/instructor"),
      Enrollment = require("./models/enrollment"),
      Review = require("./models/review");



async function seedDB(){
    await Enrollment.deleteMany({});
    await Review.deleteMany({});

    await Lesson.deleteMany({}, async (err) => {
        if(err){
            console.log(err)
        }
        await Lesson.insertMany(
            [
                {instrument: 'piano', image: '/images/lessons/piano.jpg', programs: [{name:'Beginner', duration:6}, {name:'Intermediate', duration: 4}, {name:'Advanced', duration: 2}]},
                {instrument: 'guitar', image: '/images/lessons/guitar.jpg', programs: [{name:'Beginner', duration:4}, {name:'Intermediate', duration: 4}, {name:'Advanced', duration: 2}]},
                {instrument: 'drums', image: '/images/lessons/drums.jpg', programs: [{name:'Beginner', duration:6}, {name:'Intermediate', duration: 4}, {name:'Advanced', duration: 1}]},
                {instrument: 'violin', image: '/images/lessons/violin.jpg', programs: [{name:'Beginner', duration:8}, {name:'Intermediate', duration: 4}, {name:'Advanced', duration: 4}]},
                {instrument: 'flute', image: '/images/lessons/flute.jpg', programs: [{name:'Beginner', duration:4}, {name:'Intermediate', duration: 2}, {name:'Advanced', duration: 2}]},
                {instrument: 'saxophone', image: '/images/lessons/saxophone.jpg', programs: [{name:'Beginner', duration:4}, {name:'Intermediate', duration: 2}, {name:'Advanced', duration: 1}]},
                {instrument: 'voice', image: '/images/lessons/voice.jpg', programs: [{name:'Beginner', duration:4}, {name:'Intermediate', duration: 2}, {name:'Advanced', duration: 1}]}
            ],
            (err) => {
                if(err){
                    console.log(err)
                }
            }
        )
    })

    await User.deleteMany({}, async (err) => {
        if(err){
            console.log(err)
        }
        await User.register(new User({username: 'admin', email: 'admin@hnm.com', firstname: 'admin', lastname: 'admin', role: 'admin'}), 'admin123')
        await User.register(new User({username: 'renciso', email: 'renciso@hnm.com', firstname: 'Ralph', lastname: 'Enciso', role: 'instructor'}), 'renciso123')
        await User.register(new User({username: 'user', email: 'user@hnm.com', firstname: 'test', lastname: 'user', role: 'student'}), 'user123')
    })


    await Instructor.deleteMany({}, async (err) => {
        if(err){
            console.log(err)
        }
        await Instructor.insertMany(
            [
                {name: 'Taylor Swift', image: '/images/instructors/tswift.jpg', instruments: ['guitar', 'voice'], videos: ['https://www.youtube.com/embed/WrrjdPYsZwU', 'https://www.youtube.com/embed/2obMo7y-rvA', 'https://www.youtube.com/embed/W5q9lEEN0w8'], profile: "Taylor Alison Swift is an American singer-songwriter. She is known for narrative songs about her personal life, which have received widespread media coverage." },
                {name: 'Lee Ru-ma(Yiruma)', image: '/images/instructors/yiruma.jpg', instruments: ['piano'],videos: ['https://www.youtube.com/embed/7maJOI3QMu0', 'https://www.youtube.com/embed/6hPvb_DQ690', 'https://www.youtube.com/embed/YF7rqCi7q04'] , profile: "Lee Ru-ma, better known by his stage name Yiruma, is a South Korean-British pianist and composer. Yiruma frequently performs throughout Asia, Europe and North America." },
                {name: 'Hilary Hahn', image: '/images/instructors/hhahn.jpg', instruments: ['violin'], videos: ['https://www.youtube.com/embed/iEBX_ouEw1I', 'https://www.youtube.com/embed/gpnIrE7_1YA', 'https://www.youtube.com/embed/o1dBg__wsuo'], profile: "Hilary Hahn is an American violinist. In her career, she has performed throughout the world both as a soloist with leading orchestras and conductors and as a recitalist." },
                {name: 'Eric Clapton', image: '/images/instructors/eclapton.jpg', instruments: ['guitar'],videos: ['https://www.youtube.com/embed/vUSzL2leaFM', 'https://www.youtube.com/embed/fX5USg8_1gA', 'https://www.youtube.com/embed/JxPj3GAYYZ0'], profile: "Eric Patrick Clapton, is an English rock and blues guitarist, singer, and songwriter. He is the only three-time inductee to the Rock and Roll Hall of Fame."},
                {name: 'Kenny G', image: '/images/instructors/kennyg.jpg', instruments: ['flute'], videos: ['https://www.youtube.com/embed/447yaU_4DF8', 'https://www.youtube.com/embed/icuP8KLABXA', 'https://www.youtube.com/embed/l9KLAltIol4'], profile: "Kenneth Bruce Gorelick, better known by his stage name Kenny G, is an American saxophonist. He is one of the best-selling artists of all time, with global sales totaling more than 75 million records." },
                {name: 'Adele Adkins', image: '/images/instructors/adele.jpg', instruments: ['voice'], videos: ['https://www.youtube.com/embed/DDWKuo3gXMQ', 'https://www.youtube.com/embed/Ri7-vnrJD3k', '<iframe width="560" height="315" src="https://www.youtube.com/embed/IRXoLDPddkU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'], profile: "Adele Laurie Blue Adkins MBE is an English singer-songwriter. In 2007, she received the Brit Awards Critics' Choice award and won the BBC Sound of 2008 poll."},
                {name: 'Ralph Enciso', image: '/images/instructors/renciso.jpg', instruments: ['piano', 'drums'], videos: ['https://www.youtube.com/embed/ufUVi4_IBV0', 'https://www.youtube.com/embed/5WTCxopllWo', 'https://www.youtube.com/embed/_bOQdA1U10A'], profile: "One of our best instructors you will be a rockstar or the next mozart in no time." },
                {name: 'Lilibeth Fabregas', image: '/images/instructors/bfabregas.jpg', instruments: ['violin', 'saxophone'], videos: ['', '', ''], profile: "One of our best instructors you will be a rockstar or the next mozart in no time." },
                {name: 'Karlo Lustre', image: '/images/instructors/klustre.jpg', instruments: ['guitar', 'drums'], videos: ['', '', ''], profile: "One of our best instructors you will be a rockstar or the next mozart in no time." }
            ],
            (err) => {
                if(err){
                    console.log(err)
                }
            }
        )
    })

    console.log('db seeded');
    
}





module.exports = seedDB