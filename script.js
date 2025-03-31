document.querySelector("#feedback-form").addEventListener("submit", async(e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const surname = document.querySelector("#surname").value;
    const studentClass = document.querySelector("#class").value;

    const feedback = Array.from(document.querySelectorAll(".subject")).map(subject => {
        const subjectName = subject.dataset.subject;
        const likeButton = subject.querySelector(".like");
        const dislikeButton = subject.querySelector(".dislike");
        const comment = subject.querySelector(".comment").value;

        const like = likeButton.classList.contains("selected");
        const dislike = dislikeButton.classList.contains("selected");

        return {
            name: subjectName,
            like: like ? true : (dislike ? false : null),
            comment: comment.trim()
        };
    });

    try {
        const response = await fetch("http://localhost:3000/send-feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, surname, studentClass, feedback }),
        });

        const result = await response.json();
        console.log(result);


        document.getElementById("confirmation-message").style.display = "block";

        document.querySelector("#feedback-form").reset();


        document.querySelectorAll(".subject .buttons button").forEach(button => {
            button.classList.remove("selected");
        });

    } catch (error) {
        console.error("Ошибка при отправке данных:", error);
    }
});

document.querySelectorAll(".subject .buttons button").forEach(button => {
    button.addEventListener("click", function() {
        const parent = this.closest(".subject");
        parent.querySelector(".like").classList.remove("selected");
        parent.querySelector(".dislike").classList.remove("selected");
        this.classList.add("selected");
    });
});