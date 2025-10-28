document.addEventListener('DOMContentLoaded', function () {
    // --- PRELOADER ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // --- SLIDER (Existing Code) ---
    const slides = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    let duration = 4000;
    let timer;

    function fade(element, targetOpacity, callback) {
        const animationSpeed = 20;
        let currentOpacity = parseFloat(window.getComputedStyle(element).opacity);
        const step = targetOpacity > currentOpacity ? 0.1 : -0.1;

        if (targetOpacity > currentOpacity) {
            element.style.display = 'flex';
        }

        const interval = setInterval(() => {
            currentOpacity += step;
            element.style.opacity = currentOpacity;

            if ((step > 0 && currentOpacity >= targetOpacity) || (step < 0 && currentOpacity <= targetOpacity)) {
                clearInterval(interval);
                element.style.opacity = targetOpacity;
                if (targetOpacity === 0) {
                    element.style.display = 'none';
                }
                if (callback) {
                    callback();
                }
            }
        }, animationSpeed);
    }

    function showSlide(index) {
        const activeSlide = document.querySelector(".card.active");
        if (activeSlide) {
            fade(activeSlide, 0, () => {
                activeSlide.classList.remove("active");
                slides[index].classList.add("active");
                fade(slides[index], 1);
            });
        } else {
            slides[index].classList.add("active");
            fade(slides[index], 1);
        }

        dots.forEach(dot => {
            dot.classList.remove("active");
            dot.innerHTML = "";
        });

        let progress = document.createElement("div");
        progress.classList.add("progress");
        dots[index].classList.add("active");
        dots[index].appendChild(progress);

        setTimeout(() => {
            progress.style.height = "100%";
        }, 50);

        resetTimer();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(nextSlide, duration);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });
    
    // --- SCROLL & SVG ANIMATIONS ---
    const sections = document.querySelectorAll('.homeScreen, .aboutUs, .ourWork, .servicesProvided, .contactUs');
    const svgs = document.querySelectorAll('.svgCrest');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If the intersecting section is the homeScreen, animate the SVGs
                if (entry.target.classList.contains('homeScreen')) {
                    svgs.forEach((svg, index) => {
                        setTimeout(() => {
                            svg.classList.add('animate');
                        }, index * 200); // Stagger the animation
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // --- INITIALIZE SLIDER ---
    showSlide(currentIndex);
});


