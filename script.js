const words = ["Student", "Web Developer", "Graphic Designer"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
    currentWord = words[i];
    if (isDeleting) {
        j--;
    } else {
        j++;
    }

    document.getElementById("typing").textContent = currentWord.substring(0, j);

    if (!isDeleting && j === currentWord.length) {
        setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 100 : 200);
}

document.addEventListener("DOMContentLoaded", typeEffect);

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".timeline-item");

    const checkItems = () => {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }
        });
    };

    window.addEventListener("scroll", checkItems);
    checkItems();
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    // Smooth Scroll on Click
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: "smooth"
            });
        });
    });

    // Highlight Active Section in Navbar
    window.addEventListener("scroll", function () {
        let current = "";
        const scrollPosition = window.scrollY + 200; // Increase threshold

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        // Set active class
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });
});

document.querySelector('.btn.contact').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".about-section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add("show"); // Fade in
                } else {
                    aboutSection.classList.remove("show"); // Fade out
                }
            });
        },
        { threshold: 0.2 } // Triggers when 20% of the section is visible
    );

    observer.observe(aboutSection);
});


const projects = [
    {
        title: "Movie Recommendation App",
        description: "Built using React.js, Node.js, MongoDB, Firebase, TMDB, OMDB API.",
        image: "movie.png",  // 🔥 Change this to your project image
        link: "https://movie-api-x41h.vercel.app/movies" // 🔥 Your project link here
    },
    {
        title: "Event Website",
        description: "Built a responsive website for event registration for the Women Development Cell using HTML, CSS and Javascript.",
        image: "wdc.png",
        link: "https://wdcshrishti25.vercel.app/"
    },
    {
        title: "Real Estate Chatbot",
        description: "Built using Python, Streamlit, Google Gemini API.",
        image: "real.png",
        link: "https://github.com/dharshini-mk/Real-Estate-Chatbot.git"
    },
    {
        title: "Portfolio",
        description: "Responsive in mobile and desktop devices.",
        image: "pf.png",
        link: "https://dharshini-mk.vercel.app/"
    }
];

const container = document.querySelector(".projects-container");

projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.style.backgroundImage = `url('${project.image}')`;

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const title = document.createElement("h2");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const link = document.createElement("a");
    link.href = project.link;
    link.target = "_blank";
    link.classList.add("project-icon");
    link.innerHTML = `<i class="fas fa-external-link-alt"></i>`;

    overlay.appendChild(title);
    overlay.appendChild(description);
    overlay.appendChild(link);
    card.appendChild(overlay);

    card.addEventListener("mouseenter", () => overlay.style.opacity = "1");
    card.addEventListener("mouseleave", () => overlay.style.opacity = "0");

    container.appendChild(card);
});

document.addEventListener("DOMContentLoaded", function () {
    const projectCards = document.querySelectorAll(".project-card");

    const checkProjects = () => {
        projectCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                card.classList.add("show"); // Pop-up animation
                setTimeout(() => {
                    card.classList.add("done"); // Settle to normal size
                }, 300);
            } else {
                card.classList.remove("show", "done"); // Remove on scroll out
            }
        });
    };

    window.addEventListener("scroll", checkProjects);
    checkProjects(); // Run once on load
});


document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".skills-track");
    const skills = Array.from(track.children);
    
    // Duplicate skills for smooth infinite scrolling
    skills.forEach(skill => {
        const clone = skill.cloneNode(true);
        track.appendChild(clone);
    });

    // Pause animation on hover
    track.addEventListener("mouseenter", () => {
        track.style.animationPlayState = "paused";
    });

    track.addEventListener("mouseleave", () => {
        track.style.animationPlayState = "running";
    });
});

document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const responseMsg = document.getElementById("response-msg");

    try {
        const response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        responseMsg.textContent = result.message;
        responseMsg.style.color = "lime";
    } catch (error) {
        responseMsg.textContent = "Error sending message. Try again!";
        responseMsg.style.color = "red";
    }

    e.target.reset();
});

