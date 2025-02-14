const words = ["Web Developer", "Designer", "Freelancer"];
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


const projects = [
    {
        title: "Movie Recommendation App",
        description: "An AI-powered movie suggestion app.",
        image: "movie.png",  // 🔥 Change this to your project image
        link: "https://movie-api-x41h.vercel.app/movies" // 🔥 Your project link here
    },
    {
        title: "Frontend Development",
        description: "Building interactive web interfaces with React.",
        image: "wdc.png",
        link: "https://wdcshrishti25.vercel.app/"
    },
    {
        title: "Backend Development",
        description: "Developing REST APIs for scalable applications.",
        image: "real.png",
        link: "https://github.com/dharshini-mk/Real-Estate-Chatbot.git"
    },
    {
        title: "Testing Automation",
        description: "Implementing automated testing strategies.",
        image: "https://yourimageurl.com/testing.jpg",
        link: "https://yourtestingproject.com"
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
