document.querySelector('form').reset();

// handle typeit
new TypeIt("#heading-intro", {
    strings: "Full Stack Developer and Tech Enthusiast.",
    speed: 100,
    waitUntilVisible: true,
}).go();

// handle particlesJS

function generateParticles(isMobile) {
    particlesJS('home',
        {
            "particles": {
                "number": {
                    "value": isMobile ? 20 : 80,
                    "density": {
                        "enable": false,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": "#0b3d91"
                },
                "shape": {
                    "type": "triangle",
                    "stroke": {
                        "width": 0.2,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
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
                    "value": 5,
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
                    "color": "#2E2E2E",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": isMobile ? 1 : 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
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
                        "enable": true,
                        "mode": "repulse"
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
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        }

    );
}
generateParticles(window.innerWidth < 600);

window.addEventListener('resize', function () {
    generateParticles(window.innerWidth < 600);
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

    const isMobile = window.innerWidth < 600;

    if (isMobile) {
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