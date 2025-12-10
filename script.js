   // Carousel functionality
        const carousel = document.getElementById('carousel');
        const slides = document.querySelectorAll('.slide');
        let currentIndex = 0;

        function showSlide(index) {
            carousel.style.transform = `translateX(-${index * 100}%)`;
        }

        document.getElementById('next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        document.getElementById('prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000);

        // Countdown timer for flash sale
        function updateTimer() {
            const timerEl = document.getElementById('timer');
            let time = 9000; // 2.5 hours in seconds
            const interval = setInterval(() => {
                const hours = Math.floor(time / 3600);
                const minutes = Math.floor((time % 3600) / 60);
                const seconds = time % 60;
                timerEl.textContent = `Ends in ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                time--;
                if (time < 0) clearInterval(interval);
            }, 1000);
        }
        updateTimer();

        // Product click (simulate navigation)
        document.querySelectorAll('.product').forEach(product => {
            product.addEventListener('click', () => {
                alert('Redirecting to product page...');
            });
        });