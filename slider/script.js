let slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let images = document.querySelectorAll(".image");
    let links = document.querySelectorAll(".city-link");
    let dots = document.querySelectorAll(".slider_dots__item ")
    if (n > images.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = images.length
    }
    for (i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    for (i = 0; i < links.length; i++) {
        links[i].className = links[i].className.replace(" active", "");
        dots[i].className = dots[i].className.replace(" active", "");
    }
    images[slideIndex - 1].style.display = "block";
    links[slideIndex - 1].className += " active";
    dots[slideIndex - 1].className += " active";
}


dots.forEach(dot => {
    dot.addEventListener('click', function() {
      dots.forEach(elem => elem.classList.remove('active'));
      this.classList.add('active');
    });
  })