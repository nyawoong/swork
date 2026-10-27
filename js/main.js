const header = document.querySelector('header');
const logo = document.querySelector('.logo a');
const navList = document.querySelectorAll('header nav ul li a');

const slideList = document.querySelector('.slide-list');
const pagBtn = document.querySelectorAll('.pag-btn button');

const menuBtn = document.querySelector('.menu-btn');
const menuBtnImg = document.querySelector('.menu-btn img');
const nav = document.querySelector('header nav');

// header motion
window.addEventListener('scroll', function() {
    if (window.scrollY >= 100) {
        header.classList.add('blur');
        logo.classList.add('color');
        navList.forEach(item => {
            item.classList.add('color');
        });
        nav.classList.add('bg-color');
        header.style.background = 'transparent';
        menuBtnImg.src = './assets/img/luxe/mobile_menu_bk.png';
    } else {
        header.classList.remove('blur');
        logo.classList.remove('color');
        navList.forEach(item => {
            item.classList.remove('color');
        });
        nav.classList.remove('bg-color');
        header.style.background = 'rgba(0, 0, 0, 0.8)'
        menuBtnImg.src = './assets/img/luxe/mobile_menu_w.png';
    }
});

// 현재 스크롤 위치에 따라 상단 메뉴 활성화
const sectionNavLinks = [...navList].filter(link => link.hash && document.querySelector(link.hash));

function updateActiveNav() {
    const position = window.scrollY + header.offsetHeight + 100;
    let activeId = '';

    sectionNavLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (section.offsetTop <= position) activeId = section.id;
    });

    // 첫 섹션보다 위에 있으면 선택 표시 제거
    sectionNavLinks.forEach(link => {
        const isActive = link.hash === `#${activeId}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav);
updateActiveNav();

// slide move motion
pagBtn.forEach(function(item, index) {

    item.addEventListener('click', function() {

        pagBtn.forEach(function(btn) {
            btn.classList.remove('on');
        });

        item.classList.add('on');

        currentIndex = index;

        slideList.style.transform =
            `translateX(${index * -100}%)`;
    });
});


// slide button effect
let currentIndex = 0;

setInterval(function() {

    currentIndex = currentIndex + 1;

    if (currentIndex >= pagBtn.length) {
        currentIndex = 0;
    }

    pagBtn.forEach(function(btn) {
        btn.classList.remove('on');
    });

    pagBtn[currentIndex].classList.add('on');

    slideList.style.transform =
        `translateX(${currentIndex * -100}%)`;

}, 3000);


// style button
const styles = [
    {
        id: 'layered',
        num: '01',
        title: 'LAYERED CUT',
        image: './assets/img/luxe/st_default01.png',
        description: '자연스럽게 흐르는 레이어와 가벼운 볼륨으로 얼굴선을 부드럽게 살려주는 스타일입니다.',
        length: 'Medium · Long',
        recommend: '#볼륨 #레이어드 #내추럴'
    },
    {
        id: 'hippie',
        num: '02',
        title: 'HIPPIE PERM',
        image: './assets/img/luxe/st_default02.png',
        description: '풍성하고 자연스러운 웨이브로 자유롭고 사랑스러운 분위기를 연출하는 스타일입니다.',
        length: 'Medium · Long',
        recommend: '#웨이브 #볼륨 #러블리'
    },
    {
        id: 'build',
        num: '03',
        title: 'BUILD PERM',
        image: './assets/img/luxe/st_default03.png',
        description: '부드러운 컬과 자연스러운 볼륨을 연결해 세련되고 여성스러운 분위기를 연출하는 스타일입니다.',
        length: 'Medium · Long',
        recommend: '#볼륨 #내추럴 #여성스러움'
    },
    {
        id: 'ccurl',
        num: '04',
        title: 'C-CURL PERM',
        image: './assets/img/luxe/st_default04.png',
        description: '모발 끝에 자연스러운 C컬을 더해 단정하면서도 부드러운 실루엣을 만들어주는 스타일입니다.',
        length: 'Short · Medium',
        recommend: '#단발 #C컬 #깔끔'
    },
    {
        id: 'ash',
        num: '05',
        title: 'ASH BROWN COLOR',
        image: './assets/img/luxe/st_default05.png',
        description: '차분한 브라운에 애쉬 톤을 더해 부드럽고 세련된 분위기를 연출하는 컬러 스타일입니다.',
        length: 'All Length',
        recommend: '#애쉬브라운 #톤다운 #세련됨'
    }
];

const styleBtns = document.querySelectorAll('.style-box');
const styleMainImg = document.querySelector('.style .img-layer img');
const styleInfoTitle = document.querySelector('.style .style-info .cut .tit');
const styleInfoNum = document.querySelector('.style .style-info .num');
const styleInfoDes = document.querySelector('.style .style-info .cut-name .txt');
const styleInfoLength = document.querySelector('.style .style-info .cut-length .txt');
const styleInfoRe = document.querySelector('.style .style-info .cut-recommend .txt');

styleBtns.forEach(function(item) {

    item.addEventListener('click', function() {

        const selectedStyle = styles.find(function(style) {
            return style.id === item.dataset.style;
        });

        styleMainImg.src = selectedStyle.image; // 이미지
        styleInfoTitle.textContent = selectedStyle.title // 타이틀
        styleInfoNum.textContent = selectedStyle.num; // 넘버링
        styleInfoDes.textContent = selectedStyle.description; // 설명
        styleInfoLength.textContent = selectedStyle.length; // 길이
        styleInfoRe.textContent = selectedStyle.recommend; // 추천

        styleBtns.forEach(function(btn) {
            btn.classList.remove('active');
        });

        item.classList.add('active');        
        
    });
});


const designers = document.querySelectorAll('.designer');

const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

designers.forEach(function(item) {
    observer.observe(item);
});

// price option
const priced = [
    {
        style: 'cut',
        num: '01',
        list: [
            { name: '여성 커트', pay: '35,000' },
            { name: '남성 커트', pay: '30,000' },
            { name: '앞머리 커트', pay: '10,000' }
        ]
    },
    {
        style: 'perm',
        num: '02',
        list: [
            { name: '베이직 펌', pay: '80,000' },
            { name: '디지털 펌', pay: '120,000' },
            { name: '셋팅 펌', pay: '130,000' },
        ]
    },
    {
        style: 'color',
        num: '03',
        list: [
            { name: '베이직 컬러', pay: '70,000' },
            { name: '프리미엄 컬러', pay: '100,000' },
            { name: '탈색', pay: '80,000' }
        ]
    },
    {
        style: 'clinic',
        num: '04',
        list: [
            { name: '베이직 클리닉', pay: '50,000' },
            { name: '프리미엄 클리닉', pay: '90,000' },
            { name: '스페셜 클리닉', pay: '120,000' }
        ]
    }
];

const priceMenu = document.querySelectorAll('.price-menu');
const priceNum = document.querySelector('.price-area .info .number');
const priceSt = document.querySelector('.price-area .info-detail .tit');
// const priceNames = document.querySelectorAll('.price-area .detail-list .name');
// const pricePays = document.querySelectorAll('.price-area .detail-list .pay');
const detailList = document.querySelector('.price-area .detail-list');

priceMenu.forEach(function(item) {

    item.addEventListener('click', function() {

        priceMenu.forEach(function(item) {
            item.classList.remove('active')
        });

        item.classList.add('active')

        const selectPrice = priced.find(function(price) {
            return price.style === item.dataset.price;
        });
        
        priceNum.textContent = selectPrice.num;
        priceSt.textContent = selectPrice.style;

        detailList.innerHTML = '';

        selectPrice.list.forEach(function(price) {
            const word = document.createElement('li');
            const name = document.createElement('span');
            const pay = document.createElement('span');

            word.classList.add('word');
            name.classList.add('name');
            pay.classList.add('pay');

            name.textContent = price.name;
            pay.textContent = price.pay;

            word.appendChild(name);
            word.appendChild(pay);

            detailList.appendChild(word);
        });
    });
});


// reservation designer option 
const reservationThumb = document.querySelectorAll('.reservation .thumb');
const reservationName = document.querySelector('.reservation .card-head .name');
const reservationJob = document.querySelector('.reservation .card-head .job');

const reservation = [
    {
        name: 'jin',
        job: 'creative director',
    },
    {
        name: 'haeun',
        job: 'senior designer',
    },
    {
        name: 'min',
        job: 'designer',
    },
    {
        name: 'siwon',
        job: 'designer',
    },
]

reservationThumb.forEach(function(item) {

    item.addEventListener('click', function() {

        reservationThumb.forEach(function(btn){
            btn.classList.remove('active');
        });

        item.classList.add('active');

        const currentThumb = reservation.find(function(thumb) {
            return thumb.name === item.dataset.designer;
        });

        reservationName.textContent = currentThumb.name;
        reservationJob.textContent = currentThumb.job;


    });
});


// reservation style option 
const styleAnswer = document.querySelector('.layer01 .answer-line');
const styleOptions = document.querySelector('.style-options');
const styleOptionBtns = document.querySelectorAll('.style-options button');
const reservationStyle = document.querySelector('.reservation-card .depth01');

styleAnswer.addEventListener('click', function() {
    
    styleOptions.classList.toggle('open');

});

styleOptionBtns.forEach(function(item) {

    item.addEventListener('click', function() {

        styleAnswer.textContent = item.dataset.value;
        reservationStyle.textContent = item.dataset.value;

        styleOptions.classList.remove('open');
    });
});


// reservation date option 
const dateAnswer = document.querySelector('.layer02 .answer-line');
const dateOptions = document.querySelector('.date-options');
const dateOptionBtns = document.querySelectorAll('.reservation .calendar-cont button');
const reservationDate = document.querySelector('.reservation .card-cont .depth02');

dateAnswer.addEventListener('click', function() {

    dateOptions.classList.toggle('open');    
});

dateOptionBtns.forEach(function(item) {

    item.addEventListener('click', function() {
        dateAnswer.textContent = item.dataset.date;
        reservationDate.textContent = item.dataset.date;

        dateOptions.classList.remove('open');
    });
});


// reservation time option 
const timeAnswer = document.querySelector('.layer03 .answer-line');
const timeOptions = document.querySelector('.time-options');
const timeOptionBtns = document.querySelectorAll('.reservation .times .time-list button');
const reservationTime = document.querySelector('.reservation .card-cont .depth03')

timeAnswer.addEventListener('click', function() {
    
    timeOptions.classList.toggle('open');
});

timeOptionBtns.forEach(function(item) {

    item.addEventListener('click', function() {
        timeAnswer.textContent = item.dataset.time;       
        reservationTime.textContent = item.dataset.time;

        timeOptions.classList.remove('open');
    });
});


// reservation reset
const resetBtn = document.querySelector('.reservation .reset-btn');

resetBtn.addEventListener('click', function() {

    reservationThumb.forEach(function(item) {
        item.classList.remove('active');
    });
    reservationThumb[0].classList.add('active');

    reservationName.textContent = reservation[0].name;
    reservationJob.textContent = reservation[0].job;

    styleAnswer.textContent = styleOptionBtns[2].dataset.value;
    reservationStyle.textContent = styleOptionBtns[2].dataset.value;

    dateAnswer.textContent = dateOptionBtns[0].dataset.date;
    reservationDate.textContent = dateOptionBtns[0].dataset.date;

    timeAnswer.textContent = timeOptionBtns[7].dataset.time;       
    reservationTime.textContent = timeOptionBtns[7].dataset.time;

});

// modal popup motion
const confirmBtn = document.querySelector('.reservation .confirm-btn');
const reservationModal =  document.querySelector('.reservation-modal');
const modalClose = document.querySelector('.modal-close');
const modalConfirm = document.querySelector('.modal-confirm')
const modalDesigner = document.querySelector('.modal-designer');
const modalStyle = document.querySelector('.modal-style');
const modalDate = document.querySelector('.modal-date');
const modalTime = document.querySelector('.modal-time');

confirmBtn.addEventListener('click', function() {

    reservationModal.classList.add('open');

    modalDesigner.textContent = reservationName.textContent;
    modalStyle.textContent = reservationStyle.textContent;
    modalDate.textContent = reservationDate.textContent;
    modalTime.textContent = reservationTime.textContent;
});

modalClose.addEventListener('click', function() {
    reservationModal.classList.remove('open');
});

modalConfirm.addEventListener('click', function() {
    reservationModal.classList.remove('open');
});

reservationModal.addEventListener('click', function(e) {
    if (e.target === reservationModal) {
        reservationModal.classList.remove('open');
    }
});

// mobile header


menuBtn.addEventListener('click', function() {
    nav.classList.toggle('open');
});

const navMenuShowBtn = document.querySelectorAll('header nav ul li a');

navMenuShowBtn.forEach(function(item) {

    item.addEventListener('click', function() {
        nav.classList.remove('open');
    });
});







