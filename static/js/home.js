// Wait for the DOM to load before executing functions
document.getElementById("field-shape").addEventListener("change", function (e) {
    if (e.target.value === "round") {
        const label = document.querySelector('label[for="size-small"]');
        label.textContent += " Test";
    }
});