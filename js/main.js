/* ==================================================
   HEADER
================================================== */

const header = document.querySelector('.header');
const menuButton = document.querySelector('header .menu-btn');
const gnb = document.querySelector('header .gnb');

let previousY = getScrollY();
let pending = false;


// 현재 스크롤 위치
function getScrollY() {

    return Math.max(
        0,
        Math.min(
            window.scrollY,
            document.documentElement.scrollHeight - window.innerHeight
        )
    );

}


// 헤더 보이기 / 숨기기
function updateHeader() {

    const y = getScrollY();

    header.classList.toggle('is-scrolled', y > 0);


    // 모바일 메뉴가 열려 있으면
    // 헤더를 숨기지 않음
    if (gnb.classList.contains('open')) {

        header.classList.remove('is-hidden');
        header.classList.add('is-scrolled');

        previousY = y;
        pending = false;

        return;
    }


    // 화면 최상단
    if (y <= header.offsetHeight) {

        header.classList.remove('is-hidden');

        previousY = y;

    } else if (Math.abs(y - previousY) >= 5) {

        // 아래로 스크롤하면 숨기기
        // 위로 스크롤하면 보이기
        header.classList.toggle(
            'is-hidden',
            y > previousY
        );

        previousY = y;
    }


    pending = false;

}


// 스크롤
window.addEventListener('scroll', function () {

    if (!pending) {

        pending = true;

        requestAnimationFrame(updateHeader);

    }

}, { passive: true });


// 키보드로 헤더 안에 접근했을 때
header.addEventListener('focusin', function () {

    header.classList.remove('is-hidden');

});


// 처음 실행
updateHeader();



/* ==================================================
   MOBILE MENU
================================================== */

menuButton.addEventListener('click', function () {

    menuButton.classList.toggle('open');
    gnb.classList.toggle('open');


    // 메뉴 열림
    if (gnb.classList.contains('open')) {

        header.classList.remove('is-hidden');
        header.classList.add('h100');

    } else {

        // 메뉴 닫힘
        previousY = getScrollY();

        header.classList.remove('h100');

    }

});


// 모바일 메뉴 링크
const mobileNavLinks =
    document.querySelectorAll('header .gnb a');


mobileNavLinks.forEach(function (link) {

    link.addEventListener('click', function () {

        menuButton.classList.remove('open');

        gnb.classList.remove('open');

        header.classList.remove('h100');

    });

});



/* ==================================================
   HERO SLIDER
================================================== */

const visual = document.querySelector('.visual');

const track =
    visual.querySelector('.slide-list');

const currentText =
    visual.querySelector('.slide-current');

const totalText =
    visual.querySelector('.slide-total');

const progressBar =
    visual.querySelector('.slide-progress-bar');

const prevButton =
    visual.querySelector('.slide-prev');

const nextButton =
    visual.querySelector('.slide-next');

const pauseButton =
    visual.querySelector('.slide-pause');


// HTML template
const hairTemplate =
    document.querySelector('#slide-hair');

const restaurantTemplate =
    document.querySelector('#slide-restaurant');


// Hair 슬라이드 추가
if (hairTemplate) {

    track.append(
        hairTemplate.content.cloneNode(true)
    );

}


// Restaurant 슬라이드 추가
if (restaurantTemplate) {

    track.append(
        restaurantTemplate.content.cloneNode(true)
    );

}


// 만들어진 전체 슬라이드
const slides =
    document.querySelectorAll('.visual .slide');


let currentIndex = 0;

let timer;

let paused = false;



// 숫자를 01 / 02 / 03 형태로 변경
function makeNumber(number) {

    return String(number).padStart(2, '0');

}



// 슬라이드 보여주기
function showSlide(index) {

    currentIndex = index;


    // 슬라이드 이동
    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;


    // 현재 슬라이드 상태 변경
    slides.forEach(function (slide, slideIndex) {

        if (slideIndex === currentIndex) {

            slide.classList.add('active');

            slide.inert = false;

            slide.setAttribute(
                'aria-hidden',
                'false'
            );

        } else {

            slide.classList.remove('active');

            slide.inert = true;

            slide.setAttribute(
                'aria-hidden',
                'true'
            );

        }

    });


    // 현재 번호
    currentText.textContent =
        makeNumber(currentIndex + 1);


    // 전체 슬라이드 수
    totalText.textContent =
        makeNumber(slides.length);


    // 진행바
    // const progress =
    //     ((currentIndex + 1) / slides.length) * 100;

    // progressBar.style.width =
    //     progress + '%';
    // 타이머 진행바 처음부터 시작
    progressBar.style.animation = 'none';

    // 브라우저에 변경사항 적용
    void progressBar.offsetWidth;

    // 3초 동안 진행바 채우기
    progressBar.style.animation = 'slideTimer 3s linear forwards';

    // 일시정지 상태라면 진행바도 정지
    if (paused) {
        progressBar.style.animationPlayState = 'paused';
    }

}



// 다음 슬라이드
function nextSlide() {

    let nextIndex = currentIndex + 1;


    // 마지막 슬라이드 다음은 첫 번째
    if (nextIndex >= slides.length) {

        nextIndex = 0;

    }


    showSlide(nextIndex);

}



// 이전 슬라이드
function prevSlide() {

    let prevIndex = currentIndex - 1;


    // 첫 번째 슬라이드 이전은 마지막
    if (prevIndex < 0) {

        prevIndex = slides.length - 1;

    }


    showSlide(prevIndex);

}



// 자동재생 시작
function startSlider() {

    clearInterval(timer);


    // 사용자가 정지시킨 경우
    if (paused) {

        return;

    }


    timer = setInterval(function () {

        nextSlide();

    }, 3000);

}



// 자동재생 멈춤
function stopSlider() {

    clearInterval(timer);

}



// 이전 버튼
prevButton.addEventListener('click', function () {

    prevSlide();

    startSlider();

});



// 다음 버튼
nextButton.addEventListener('click', function () {

    nextSlide();

    startSlider();

});



// 재생 / 정지 버튼
pauseButton.addEventListener('click', function () {

    paused = !paused;


    // 정지 상태
    if (paused) {

        stopSlider();

        pauseButton.textContent = '▶';

        pauseButton.setAttribute(
            'aria-label',
            '자동 재생 시작'
        );


    // 재생 상태
    } else {

        pauseButton.textContent = '❚❚';

        pauseButton.setAttribute(
            'aria-label',
            '자동 재생 정지'
        );

        startSlider();

    }

});



// 접근성을 위한 슬라이드 번호
slides.forEach(function (slide, index) {

    slide.setAttribute(
        'aria-label',
        '배너 ' + (index + 1) + ' / ' + slides.length
    );

});



// 처음 화면
showSlide(0);


// 자동재생 시작
startSlider();



/* ==================================================
   WORKS FILTER
================================================== */

const works = document.querySelector('.works');

const projectCards =
    document.querySelectorAll(
        '.works [data-project-id]'
    );

const filterButtons =
    document.querySelectorAll(
        '.works [data-filter]'
    );

const placeholders =
    document.querySelectorAll(
        '.works .work-placeholder'
    );

const worksStatus =
    document.querySelector('.works-status');



// 필터별 프로젝트 개수 구하기
function getProjectCount(category) {

    let count = 0;


    projectCards.forEach(function (card) {

        const categories =
            card.dataset.category.split(' ');


        if (
            category === 'all' ||
            categories.includes(category)
        ) {

            count++;

        }

    });


    return count;

}



// 필터 숫자 만들기
filterButtons.forEach(function (button) {

    const category =
        button.dataset.filter;

    const count =
        getProjectCount(category);


    const badge =
        document.createElement('span');


    badge.classList.add('filter-count');

    badge.textContent = count;

    badge.setAttribute(
        'aria-hidden',
        'true'
    );


    button.append(badge);


    const label =
        button.childNodes[0].textContent.trim();


    button.setAttribute(
        'aria-label',
        label + ', 프로젝트 ' + count + '개'
    );

});



// 필터 클릭
filterButtons.forEach(function (button) {

    button.addEventListener('click', function () {

        const category =
            button.dataset.filter;


        // 프로젝트 보여주기 / 숨기기
        projectCards.forEach(function (card) {

            const categories =
                card.dataset.category.split(' ');


            if (
                category === 'all' ||
                categories.includes(category)
            ) {

                card.hidden = false;

            } else {

                card.hidden = true;

            }

        });


        // placeholder
        placeholders.forEach(function (card) {

            if (category === 'all') {

                card.hidden = false;

            } else {

                card.hidden = true;

            }

        });


        // 버튼 active
        filterButtons.forEach(function (filterButton) {

            if (filterButton === button) {

                filterButton.classList.add('active');

                filterButton.setAttribute(
                    'aria-pressed',
                    'true'
                );

            } else {

                filterButton.classList.remove('active');

                filterButton.setAttribute(
                    'aria-pressed',
                    'false'
                );

            }

        });


        // 스크린리더 안내
        if (worksStatus) {

            const label =
                button.childNodes[0].textContent.trim();

            const count =
                getProjectCount(category);


            worksStatus.textContent =
                label +
                ' 프로젝트 ' +
                count +
                '개 표시';

        }

    });

});



/* ==================================================
   SCROLL ANIMATION
================================================== */

const posUp =
    document.querySelectorAll('.posUp');


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add('active');

                } else {

                    entry.target.classList.remove('active');

                }

            });

        },
        {
            threshold: 0,
            rootMargin: '0px 0px -20% 0px'
        }
    );



posUp.forEach(function (item) {

    observer.observe(item);

});



// 버튼 이벤트(컨텍트 창 오픈)
const contactBtn = document.querySelector('.contact-btn');
const contactBottomSheet = document.querySelector('.contact-bottom-sheet');
const dim = document.querySelector('.dim');
const closeBtn = contactBottomSheet.querySelector('.close-btn');


// 컨텐츠 바깥 클릭 정의 함수
function closeSheet() {
    contactBottomSheet.classList.remove('is-open');
    dim.classList.remove('is-open');
};


// 컨텍트 버튼 클릭
contactBtn.addEventListener('click', function(){
    contactBottomSheet.classList.add('is-open');
    dim.classList.add('is-open');
});

// 컨텍트 바깥 클릭
document.addEventListener('click', function(e) {
    const isInside = contactBottomSheet.contains(e.target);
    const isButton = contactBtn.contains(e.target);

    if (!privacyModal.hidden || !resultModal.hidden) {
        return;
    }

    if (!isInside && !isButton) {
        closeSheet();
    }

});

// 바텀시트 X버튼 클릭
closeBtn.addEventListener('click', closeSheet);


// 정보동의 모달팝업
const privacyBtn = document.querySelector('.agreement-btn');
const privacyModal = document.querySelector('#privacyModal');
const privacyClose = document.querySelector('.privacy-close');

privacyBtn.addEventListener('click', function() {
    privacyModal.hidden = false;
    privacyClose.focus();
});

privacyClose.addEventListener('click', function(e) {
    e.stopPropagation();

    privacyModal.hidden = true;
    privacyBtn.focus();
});


const resultModal = document.querySelector('#resultModal');
const resultTitle = document.querySelector('#resultTitle');
const resultMessage = document.querySelector('#resultMessage');
const resultIcon = document.querySelector('.result-icon');
const resultClose = document.querySelector('.result-close');

function showResult(success) {
    if (success) {
        resultTitle.textContent = '문의가 접수되었습니다!';
        resultMessage.textContent =
            'NYAWOONG STUDIO에 문의해 주셔서 감사합니다. 내용 확인 후 이메일로 답변드리겠습니다.';
        resultIcon.textContent = '✓';
    } else {
        resultTitle.textContent = '문의 전송에 실패했습니다.';
        resultMessage.textContent =
            '잠시 후 다시 시도해 주세요. 입력하신 내용은 유지됩니다.';
        resultIcon.textContent = '!';
    }

    resultModal.hidden = false;
    resultClose.focus();
}

resultClose.addEventListener('click', function(e) {
    e.stopPropagation();
    resultModal.hidden = true;
});


// 바텀시트 form 검사
const contactForm = document.querySelector('#contactForm');

// 오류 문구 표시 함수
function showError(id, message) {
    const error = document.querySelector(id);

    error.textContent = message;
    error.classList.toggle('is-show', message !== '');
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const service = contactForm.querySelector(
        'input[name="service"]:checked'
    );
    const name = contactForm.querySelector(
        'input[name="customerName"]'
    );
    const email = contactForm.querySelector(
        'input[name="email"]'
    );
    const message = contactForm.querySelector(
        'textarea[name="message"]'
    );
    const agreement = contactForm.querySelector('#agreement');

    let isValid = true;

    // 서비스 선택
    if (!service) {
        showError('#serviceError', '서비스 항목을 선택해 주세요.');
        isValid = false;
    } else {
        showError('#serviceError', '');
    }

    // 성함 또는 업체명
    if (!name.value.trim()) {
        showError('#nameError', '성함 또는 업체명을 입력해 주세요.');
        isValid = false;
    } else {
        showError('#nameError', '');
    }

    // 이메일
    if (!email.value.trim()) {
        showError('#emailError', '이메일을 입력해 주세요.');
        isValid = false;
    } else if (!email.validity.valid) {
        showError('#emailError', '올바른 이메일 주소를 입력해 주세요.');
        isValid = false;
    } else {
        showError('#emailError', '');
    }

    // 프로젝트 내용
    if (!message.value.trim()) {
        showError('#messageError', '프로젝트 내용을 입력해 주세요.');
        isValid = false;
    } else {
        showError('#messageError', '');
    }

    // 개인정보 동의
    if (!agreement.checked) {
        showError('#agreementError', '개인정보 수집·이용에 동의해 주세요.');
        isValid = false;
    } else {
        showError('#agreementError', '');
    }

    // 하나라도 오류가 있으면 제출 중단
    
    if (!isValid) {
        return;
    }

    // 여기부터 실제 메일 전송
    const submitBtn = contactForm.querySelector('[type="submit"]');

    async function sendContact() {
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';

        try {
            const response = await fetch('https://formspree.io/f/xpppwwgb', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('전송 실패');
            }

            // alert('문의가 정상적으로 접수되었습니다.');

            // 전송 성공
            contactForm.reset();

            contactForm.querySelectorAll('.error-msg').forEach(function(error) {
                error.classList.remove('is-show');
            });

            closeSheet();
            showResult(true);

        } catch (error) {
            console.error(error);
            showResult(false);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '문의 보내기';
        }
    }

    sendContact();


    // 다음 단계: 실제 메일 전송 기능 연결
});


