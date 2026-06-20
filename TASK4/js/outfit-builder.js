const topLayer = document.getElementById("topLayer");

uploadInput.addEventListener("change", (event) => {

    const files = event.target.files;

    for (let file of files) {

        const imageURL = URL.createObjectURL(file);

        const card = document.createElement("div");

        card.classList.add("clothing-card");

        card.innerHTML = `
            <img src="${imageURL}">
            <p>${file.name}</p>
        `;

        card.addEventListener("click", () => {

            topLayer.src = imageURL;
            topLayer.style.display = "block";

        });

        clothesContainer.appendChild(card);
    }

});