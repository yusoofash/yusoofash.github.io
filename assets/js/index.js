document.querySelector('form').reset();

// handle typeit
new TypeIt("#heading-intro", {
    strings: "Full Stack Developer and Tech Enthusiast.",
    speed: 100,
    waitUntilVisible: true,
}).go();

// handle particlesJS
function generateParticles(isMobile) {
    const particles = {
        "fullScreen": {
            enable: false,
            zIndex: 1,
        },
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#0b3d91"
            },
            "shape": {
                "type": "triangle",
                "stroke": {
                    "width": 0.8,
                    "color": "#000000",
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#1658c9",
                "opacity": 0.8,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 4,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": !isMobile,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    tsParticles.load("home", particles);
}

generateParticles(isMobile());

window.addEventListener('resize', function () {
    generateParticles(isMobile());
});

// handle see more
const seeMore = document.querySelector("#see-more");
const bouncingDuration = 500;
anime({
    targets: seeMore,
    translateY: [14, 0],
    easing: "easeInCubic",
    duration: bouncingDuration,
    loop: true,
    direction: "alternate"
});

seeMore.addEventListener('click', function (e) {
    e.preventDefault();
    doScrolling(document.querySelector('#work-section'));
});

function doScrolling(elementY) {
    elementY.scrollIntoView({
        behavior: 'smooth'
    });
}

// handle skills
const skills = document.querySelectorAll('#skill-section .card');
const animation = anime({
    targets: skills,
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    delay: function (el, i) {
        return i * 100;
    },
    duration: 1000
});

let animationDone = false;

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            animation.play();

            skills.forEach(function (box) {
                observer.unobserve(box);
            });
        }
    });
});

skills.forEach(function (box) {
    observer.observe(box);
});


// handle menu click
document.querySelector('.my-nav').addEventListener('click', function (e) {
    const header = document.querySelector('.my-nav');

    if (isMobile()) {
        if (e.target.tagName === 'A' || (e.target.parentElement.tagName === 'A' && e.target.tagName === 'I')) {
            header.classList.remove('open-nav');
        }
    }

    if (e.target.tagName === 'BUTTON' || (e.target.parentElement.tagName === 'BUTTON' && e.target.tagName === 'I')) {
        if (header.classList.contains('open-nav')) {
            header.classList.remove('open-nav');
        } else {
            header.classList.add('open-nav');
        }
    }
});

// scroll to top
const btn = document.createElement("BUTTON");
btn.innerHTML = "⬆️";
btn.style.display = "none";
btn.style.backgroundColor = "transparent";
btn.style.fontSize = '2rem';
btn.style.border = "none";
btn.style.outline = "none";
btn.style.cursor = "pointer";
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.right = "20px";
btn.style.zIndex = "100";
document.body.appendChild(btn);

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Scroll to the top of the page when the button is clicked
btn.addEventListener("click", function () {
    doScrolling(document.getElementById('home'));
});

// handle nav link click
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const targetOffsetTop = targetSection.offsetTop;

        const navHeight = document.querySelector('.my-nav nav').getBoundingClientRect().height;

        window.scrollTo({
            top: targetOffsetTop + (isMobile() ? 0 : -navHeight),
            behavior: 'smooth'
        });
    });
});

// utils
function isMobile() {
    return window.innerWidth < 600;
}
