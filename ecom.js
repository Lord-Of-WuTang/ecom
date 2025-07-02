 // Animated background particles
        function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                container.appendChild(particle);
            }
        }

        // Cart functionality
        let cartItems = [];
        let cartCount = 0;

        function addToCart(name, price) {
            cartItems.push({ name, price });
            cartCount++;
            document.getElementById('cartCount').textContent = cartCount;
            
            // Add animation effect
            const button = event.target;
            button.style.transform = 'scale(0.95)';
            button.textContent = 'Added!';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.textContent = 'Add to Cart';
            }, 500);

            // Create floating effect
            const rect = button.getBoundingClientRect();
            const float = document.createElement('div');
            float.textContent = '+1';
            float.style.position = 'fixed';
            float.style.left = rect.left + rect.width/2 + 'px';
            float.style.top = rect.top + 'px';
            float.style.color = '#ff0000';
            float.style.fontWeight = 'bold';
            float.style.pointerEvents = 'none';
            float.style.zIndex = '9999';
            float.style.animation = 'floatUp 1s ease forwards';
            document.body.appendChild(float);

            setTimeout(() => float.remove(), 1000);
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(255, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% {
                    opacity: 1;
                    transform: translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px);
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize particles when page loads
        createParticles();

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        // Observe product cards
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });