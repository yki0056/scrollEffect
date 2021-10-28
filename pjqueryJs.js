// fixed monitor , 각 섹션의 y위치
$('.offset1').text(parseInt($('#section1').offset().top)) + 'px'
$('.offset2').text(parseInt($('#section2').offset().top)) + 'px'
$('.offset3').text(parseInt($('#section3').offset().top)) + 'px'
$('.offset4').text(parseInt($('#section4').offset().top)) + 'px'
$('.offset5').text(parseInt($('#section5').offset().top)) + 'px'

// menu button click   scroll to section 
$(".paraNav ul li").click(function (e) {
    e.preventDefault();
    let target = $(this)
    let index = target.index(); // 인덱스 부여  
    let section = $('.content__item').eq(index); // 요소들중 ㄴ선택된인덱스넘버에 해당되는 요소를 가져옴 
    let offset = section.offset().top
    $('html, body').animate({ scrollTop: offset }, 600);
})

// section4 text setup
let text = $('#section4 .content__item__desc').text();
let split = text.split('').join("</span><span aria-hidden='true'>")
split = "<span aria-hidden='true'>" + split + "</span>"
$('#section4 .content__item__desc').html(split)

// scroll event  
let nowScroll;
let lastScrollTop = 0;
$(window).scroll(function () {
    let scrollTop = $(window).scrollTop(); // 내가 보는 화면의 윗사이드
    // ----------- 고정 매뉴에 실시간 탑값 보이게하기 ------------
    $('.paraScroll').text('scrollTop():  ' + scrollTop + 'px')
    // -----------각 섹션 ----------
    $('.content__item').each(function (index, element) { // 각각의 section들
        // console.log(element) // <section id="section1">, <setion id="section2"> 
        // console.log($('.content__item').eq(index)) // S.fn.init [section#section1], [section#section2]...
        // console.log($(this)) // S.fn.init [section#section1], [section#section2]...
        // 위에 3개다 스크롤시 모든 섹션이 같이나옴.
        // console.log(index) // 0, 1, 2, 3, 4
        // 현재 화면의 위쪽값이 각 섹션의 위쪽 위치값보다  커진다면 
        if (scrollTop >= $(this).offset().top - 500) {
            // $(this) // 경계를 넘을때마다 각섹션
            // 해당섹션 진입시 닷메뉴 하이라이트
            $('.paraNav ul li').eq(index).addClass('active').siblings().removeClass('active')
            // 섹션1 진입시 
            // .show클래스를 줘서 이미지 나오게하기 
            if($(this)[0] == $('#section1')[0]){
                $('#section1').addClass('show')
            }
            
            // 섹션2 진입시 대각선 이동
            let offset2 = scrollTop - $('#section2').offset().top;
            // console.log(offset2) // 해당섹션 진입전 -, 만나는순간 0, 만난이후 +
            $('#section2').css({ transform: `translateX(${offset2}px)` })
            // 섹션3 진입시  이질감 
            let offset3 = scrollTop - $('#section3').offset().top; 
            let offset3H2 = -offset3 * 0.10
            let offset3Img = Math.max(Math.min(offset3 * 0.5, -1), -220);
            let offset3Desc = Math.min((-offset3 * 2.5), 100)
            console.log(offset3Desc)
            $('#section3').find('h2').css({ transform: `translateY(${offset3H2}px)` })
            $('#section3').find('.content__item__img').css({ transform: `translateY(${offset3Img}px)` })
            $('#section3').find('.content__item__desc').css({ transform: `translateY(${offset3Desc}px)` })
           
            // section들 진입시 section4안에있는 요소 찾음 
            $(this).find('.content__item__desc span').each(function (index) {
                setInterval(() => {
                    $(this).addClass("show");
                }, 50 * index);
            })
            
            if($(this)[0] == $('#section5')[0]){
                $('#section5').addClass('show')
            }
            
        }
        
    })
    // ------------ 닷메뉴 없애기 ------------
    /*
    nowScroll = true;
    // t/f를 줘서 스크롤을 해도 셋인터버 안 내용이 한번만 발동되게함 / 발동시 f가되서 멈춤
    setInterval(() => { // 스크롤되는순간 1초마다 안의 내용을 콜함 
        if (nowScroll) {
            hasScroll()
            nowScroll = false;
        }
    }, 1000);
    */
})
// currentScroll값과 lastScroll값의 차이를 이용함 
function hasScroll() {
    let currentScrollTop = $(window).scrollTop(); // 100
    if (currentScrollTop > lastScrollTop) {
        $('.paraNav').addClass('hide')
    } else {
        $('.paraNav').removeClass('hide')
    }
    lastScrollTop = currentScrollTop; // 100 = 100
}