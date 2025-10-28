function generateMsg() {

    const selectedOption = document.querySelector('input[name="option"]:checked');
    
    if (!selectedOption) {
        alert("Please select an option");
        return;
    }

    // Retrieve user input values
    const clientName = document.getElementById("clientName").value;
    const orderNumber = document.getElementById("orderNumber").value;
    const missingItem = document.getElementById("missingItem").value;
    const quantityOfItems = document.getElementById("quantityOfItems").value;
    const commentBox = document.getElementById("commentBox").value;

    // Select the checked radio button

    // Initialize an empty message string
    let finalMsg = "";

    // Use a switch statement for cleaner conditional logic
    switch (selectedOption?.id) {
        case "option1":
            finalMsg += `Der Artikel ${missingItem} (${quantityOfItems} Stück) ist aktuell nicht auf Lager. Dieser ist bereits beim Hersteller nachbestellt und sollte in den nächsten Tagen eintreffen. Bei manchen Herstellern beträgt die Lieferzeit jedoch mehrere Wochen. Wenn Du deine Lieferung dringend benötigst, schreib uns gerne eine Email.`;
            break;
        case "option2":
            finalMsg += `Der Artikel ${missingItem} (${quantityOfItems} Stück) ist aktuell nicht auf Lager. Dieser wird in den nächsten Tagen beim Hersteller nachbestellt.`;

            const extraOption1 = document.getElementById("extraOption1");
            const extraOption2 = document.getElementById("extraOption2");

            // Mensajes predefinidos en lugar del texto de la etiqueta
            if (extraOption1.checked) {
                finalMsg += `\nMöchtest Du den lieferbaren Rest deines Auftrages zugeschickt bekommen (Teillieferung)? Alternativ kannst Du dir einen anderen Artikel aus unserem Sortiment aussuchen oder den fehlenden Artikel stornieren. Bitte schreibe uns dazu eine Email.`;
            }
            if (extraOption2.checked) {
                finalMsg += `\nMöchtest Du dir einen anderen Artikel aus unserem Sortiment aussuchen oder den fehlenden Artikel stornieren? Bitte schreibe uns dazu eine Email.`;
            }
            break;
        case "option3":
            finalMsg += `Der Artikel ${missingItem} (${quantityOfItems} Stück) ist leider nicht auf Lager. Dieser wird beim Hersteller nicht mehr nachproduziert oder wird bei uns in Zukunft nicht mehr lagernd sein. Daher werden wir den Artikel nicht nachbestellen bzw. nicht nachbestellen können. Bitte suche dir einen anderen Artikel aus unserem Sortiment aus, alternativ kannst Du den Artikel stornieren.`;
            break;
        case "option4":
            finalMsg += `Aktuell fehlt uns der Straßenname / die Hausnummer, um dein Paket versenden zu können. Bitte schreibe uns eine Mail (Du kannst auf diese Mail antworten) mit der Adresse, an die dein Paket versendet werden soll.`;
            break;
        case "option5":
            finalMsg += "Deine Packstation-Nummer ist nicht korrekt. Bitte überprüfe und sende uns ggf. die korrigierte Packstation, falls Du dich verschrieben hast.";
            break;
        case "option6":
            finalMsg += `Laut DHL ist deine Postnummer nicht registriert. Bitte überprüfe, ob die Postnummer wirklich zur Packstation gehört, und ob Du den letzten Schritt der Registrierung abgeschlossen hast. Sende uns ggf. die korrigierte Postnummer, falls Du dich verschrieben hast.`;
            break;
        case "option7":
            finalMsg += `Dein Paket wird wie gewünscht zum ___ versendet. Das Label ist schon gedruckt, daher hast Du bereits eine Sendungsverfolgungs-Nr. und die Versand-Email erhalten. Wir legen dein Paket aber erst zum gewünschten Datum auf den Versandwagen.`;
            break;
        default:
            finalMsg += "Status: No valid option selected.";
            break;
    }

    // Display the final message in the designated box
    const msgReady = document.getElementById("msgReady");
    const messageBox = document.getElementById("messageBox");

    if (finalMsg) {
        msgReady.innerHTML = finalMsg; // Insert the generated message
        messageBox.style.display = "block"; // Show the message box
    } else {
        messageBox.style.display = "none"; // Hide the box if no message exists
    }
}

// Function to handle the display of extra options
function handleExtraOptionsDisplay() {
    const extraOptions = document.getElementById("extraOptions");
    const selectedOption = document.querySelector('input[name="option"]:checked');

    // Verifica si se ha seleccionado una opción antes de acceder a su ID
    if (selectedOption && selectedOption.id === "option2") {
        extraOptions.style.display = "block";
    } else {
        extraOptions.style.display = "none";

        // Si ocultamos las opciones, también deseleccionamos las checkbox
        document.querySelectorAll('input[name="extraOption"]').forEach(extraOption => {
            extraOption.checked = false;
        });
    }
}

// Function to ensure only one checkbox can be selected at a time
function handleCheckboxSelection(event) {
    if (event.target.checked) {
        document.querySelectorAll('input[name="extraOption"]').forEach(extraOption => {
            if (extraOption !== event.target) {
                extraOption.checked = false;
            }
        });
    }
}

// Add event listener to show/hide extra options based on selected option
document.querySelectorAll('input[name="option"]').forEach(option => {
    option.addEventListener("change", handleExtraOptionsDisplay);
});

// Add event listeners to ensure only one checkbox can be selected at a time
document.querySelectorAll('input[name="extraOption"]').forEach(extraOption => {
    extraOption.addEventListener("change", handleCheckboxSelection);
});

// Add a click event listener for the "Copy" button
document.querySelector(".copy").addEventListener("click", () => {
    const msgReady = document.getElementById("msgReady");
    const textToCopy = msgReady.textContent
        .replace(/\s+/g, " ") // Remove excess whitespace
        .trim(); // Remove leading/trailing whitespace

    navigator.clipboard.writeText(textToCopy).then(() => {
        const copyButton = document.querySelector(".copy");
        const label = copyButton.querySelector(".copy-label");
        const originalText = label.textContent;

        copyButton.disabled = true; // Disable the button temporarily
        label.textContent = "Copied!"; // Indicate success

        setTimeout(() => {
            copyButton.disabled = false; // Re-enable the button
            label.textContent = originalText; // Reset the label text
        }, 1000); // Delay before resetting
    });
});

document.querySelector('form').addEventListener('reset', function() {
    document.getElementById("messageBox").style.display = "none";
    document.getElementById("msgReady").innerHTML = "";
});