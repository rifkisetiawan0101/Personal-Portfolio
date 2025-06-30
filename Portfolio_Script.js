document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // <!-- Animasi fade in hero section -->
    const heroTitle = document.querySelector('.hero_section h1');
    const heroImage = document.querySelector('.profile_image');

    heroTitle.style.opacity = '0';
    heroImage.style.opacity = '0';

    setTimeout(() => {
        heroTitle.style.transition = 'opacity 3s';
        heroImage.style.transition = 'opacity 3s';
        heroTitle.style.opacity = '1';
        heroImage.style.opacity = '1';
    }, 500);

    // <!-- COntact Me Form -->
    const contactForm = document.querySelector('#contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const message = document.querySelector('#message').value.trim();

        // Validasi
        if (!name || !email || !message) {
            alert('Isi semua data dan pesanmu.');
        } else {
            alert('Pesanmu Terkirim!!.');
            contactForm.reset();
            clear_canvas();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // <!-- Modal Portfolio -->
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');
    const portfolioItems = document.querySelectorAll('.portfolio_box');
    let currentIndex = 0;

    // Open modal saat klik portfolio
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // Ambil elemen <a> di dalam .portfolio_box
            const link = item.querySelector('a.portfolio_image');
            if (link) {
                const imgSrc = link.getAttribute('href');
                openModal(imgSrc, index);
            }
        });
    });

    // Close modal saat klik close
    closeBtn.addEventListener('click', closeModal);

    // Navigation button
    prevBtn.addEventListener('click', function(e) {
        showPrevImage();
    });
    
    nextBtn.addEventListener('click', function(e) {
        showNextImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.style.display || modal.style.display === 'none') return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    function openModal(imgSrc, index) {
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        currentIndex = index;
        updateNavButtons();
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        modalImg.src = portfolioItems[currentIndex].getAttribute('href');
        updateNavButtons();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        modalImg.src = portfolioItems[currentIndex].getAttribute('href');
        updateNavButtons();
    }

    function updateNavButtons() {
        prevBtn.style.display = portfolioItems.length > 1 ? 'block' : 'none';
        nextBtn.style.display = portfolioItems.length > 1 ? 'block' : 'none';
    }
});

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    // Set canvas size explicitly
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let start_background_color = "white";
    context.fillStyle = start_background_color;
    context.fillRect(0, 0, canvas.width, canvas.height);

    let draw_color = "black";
    let draw_width = "1";
    let is_drawing = false;

    let restore_array = [];
    let index = -1;

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        if (evt.touches) { // Touch event
            return {
                x: (evt.touches[0].clientX - rect.left) * scaleX,
                y: (evt.touches[0].clientY - rect.top) * scaleY
            };
        }
        return { // Mouse event
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        };
    }

    function start(event) {
        is_drawing = true;
        context.beginPath();
        const pos = getMousePos(canvas, event);
        context.moveTo(pos.x, pos.y);
        event.preventDefault();
    }

    function draw(event) {
        if (is_drawing) {
            const pos = getMousePos(canvas, event);
            context.lineTo(pos.x, pos.y);
            context.strokeStyle = draw_color;
            context.lineWidth = draw_width;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
        }
        event.preventDefault();
    }

    function stopDraw(event) {
        if (is_drawing) {
            context.stroke();
            context.closePath();
            is_drawing = false;
        }
        event.preventDefault();

        if (event.type !== 'mouseout') {
            restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
            index += 1;
        }
    }

    // Event listeners
    canvas.addEventListener("touchstart", start, false);
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("mousemove", draw, false);

    canvas.addEventListener("touchend", stopDraw, false);
    canvas.addEventListener("mouseup", stopDraw, false);
    canvas.addEventListener("mouseout", stopDraw, false);

    function clear_canvas() {
        context.fillStyle = start_background_color;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, canvas.width, canvas.height);

        restore_array = [];
        index = -1;
    }

    function undo_last() {
        if (index <= 0) {
            clear_canvas();
        } else {
            index -= 1;
            restore_array.pop();
            context.putImageData(restore_array[index], 0, 0);
        }
    }

// Handle window resize
window.addEventListener('resize', function() {
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context.putImageData(imgData, 0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
    // Function to animate number counters
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observer for animation trigger when scrolling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.skill_summary');
                counters.forEach(counter => {
                    // Get the target value from content
                    const target = parseFloat(counter.innerText);
                    // Start animation from 0 to target
                    animateValue(counter, 0, target, 2000);
                });
                // Disconnect after triggering
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    // Observe the skill summary section
    const skillSection = document.querySelector('.skill_summary');
    if (skillSection) {
        observer.observe(skillSection.parentElement.parentElement);
    }
});


// Google Maps
function InitializeMap() {
    var ourLocation = { lat: -6.238362, lng: -253.008127 };
    var contentString = '<h2 style="color: #17181C;">Come Here</h2>';

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: ourLocation
    });

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        position: ourLocation
    });

    var marker = new google.maps.Marker({
        position: ourLocation,
        map: map,
        animation: google.maps.Animation.BOUNCE
    });

    infowindow.open(map, marker);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

document.addEventListener('DOMContentLoaded', InitializeMap);