// Message templates in both languages
const messageTemplates = {
    de: {
        option1: "Der Artikel ${missingItem} (${quantityOfItems} Stück) ist aktuell nicht auf Lager. Dieser ist bereits beim Hersteller nachbestellt und sollte in den nächsten Tagen eintreffen. Bei manchen Herstellern beträgt die Lieferzeit jedoch mehrere Wochen. Wenn Du deine Lieferung dringend benötigst, schreib uns gerne eine Email.",
        option2: "Der Artikel ${missingItem} (${quantityOfItems} Stück) ist aktuell nicht auf Lager. Dieser wird in den nächsten Tagen beim Hersteller nachbestellt.",
        option2_extra1: "\nMöchtest Du den lieferbaren Rest deines Auftrages zugeschickt bekommen (Teillieferung)? Alternativ kannst Du dir einen anderen Artikel aus unserem Sortiment aussuchen oder den fehlenden Artikel stornieren. Bitte schreibe uns dazu eine Email.",
        option2_extra2: "\nMöchtest Du dir einen anderen Artikel aus unserem Sortiment aussuchen oder den fehlenden Artikel stornieren? Bitte schreibe uns dazu eine Email.",
        option3: "Der Artikel ${missingItem} (${quantityOfItems} Stück) ist leider nicht auf Lager. Dieser wird beim Hersteller nicht mehr nachproduziert oder wird bei uns in Zukunft nicht mehr lagernd sein. Daher werden wir den Artikel nicht nachbestellen bzw. nicht nachbestellen können. Bitte suche dir einen anderen Artikel aus unserem Sortiment aus, alternativ kannst Du den Artikel stornieren.",
        option4: "Aktuell fehlt uns der Straßenname / die Hausnummer, um dein Paket versenden zu können. Bitte schreibe uns eine Mail (Du kannst auf diese Mail antworten) mit der Adresse, an die dein Paket versendet werden soll.",
        option5: "Deine Packstation-Nummer ist nicht korrekt. Bitte überprüfe und sende uns ggf. die korrigierte Packstation, falls Du dich verschrieben hast.",
        option6: "Laut DHL ist deine Postnummer nicht registriert. Bitte überprüfe, ob die Postnummer wirklich zur Packstation gehört, und ob Du den letzten Schritt der Registrierung abgeschlossen hast. Sende uns ggf. die korrigierte Postnummer, falls Du dich verschrieben hast.",
        option7: "Dein Paket wird wie gewünscht zum ___ versendet. Das Label ist schon gedruckt, daher hast Du bereits eine Sendungsverfolgungs-Nr. und die Versand-Email erhalten. Wir legen dein Paket aber erst zum gewünschten Datum auf den Versandwagen."
    },
    en: {
        option1: "The item ${missingItem} (${quantityOfItems} pieces) is currently out of stock. It has already been reordered from the manufacturer and should arrive in the next few days. However, with some manufacturers the delivery time can be several weeks. If you need your delivery urgently, please feel free to write us an email.",
        option2: "The item ${missingItem} (${quantityOfItems} pieces) is currently not in stock. It will be reordered from the manufacturer in the next few days.",
        option2_extra1: "\nWould you like to receive the available remainder of your order (partial delivery)? Alternatively, you can choose another item from our range or cancel the missing item. Please write us an email about this.",
        option2_extra2: "\nWould you like to choose another item from our range or cancel the missing item? Please write us an email about this.",
        option3: "The item ${missingItem} (${quantityOfItems} pieces) is unfortunately not in stock. This item is no longer being produced by the manufacturer or will no longer be in stock with us in the future. Therefore, we will not or cannot reorder this item. Please choose another item from our range, alternatively you can cancel the item.",
        option4: "We are currently missing the street name / house number to be able to ship your package. Please write us an email (you can reply to this email) with the address where your package should be sent.",
        option5: "Your Packstation number is not correct. Please check and send us the corrected Packstation if you made a typo.",
        option6: "According to DHL, your post number is not registered. Please check whether the post number really belongs to the Packstation and whether you have completed the last step of registration. If necessary, send us the corrected post number if you made a typo.",
        option7: "Your package will be sent on ___ as requested. The label has already been printed, so you have already received a tracking number and the shipping email. However, we will only put your package on the shipping cart on the requested date."
    }
};

// Function to show toast notification
function showToast(message) {
    const toastElement = document.getElementById('alertToast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
}

function generateMsg() {

    const selectedOption = document.querySelector('input[name="option"]:checked');
    
    if (!selectedOption) {
        showToast("Please select an option");
        return;
    }

    // Get selected message language
    const msgLang = document.querySelector('input[name="msgLang"]:checked').value;

    // Retrieve user input values
    const clientName = document.getElementById("clientName").value;
    const orderNumber = document.getElementById("orderNumber").value;
    const missingItem = document.getElementById("missingItem").value;
    const quantityOfItems = document.getElementById("quantityOfItems").value;
    const commentBox = document.getElementById("commentBox").value;

    // Initialize an empty message string
    let finalMsg = "";

    // Get template for selected option and language
    const optionId = selectedOption.id;
    let template = messageTemplates[msgLang][optionId];

    // Interpolate variables into template
    if (template) {
        finalMsg = template
            .replace('${missingItem}', missingItem)
            .replace('${quantityOfItems}', quantityOfItems);
    }

    // Handle option2 special case with extra checkboxes
    if (optionId === "option2") {
        const extraOption1 = document.getElementById("extraOption1");
        const extraOption2 = document.getElementById("extraOption2");

        if (extraOption1.checked) {
            finalMsg += messageTemplates[msgLang]['option2_extra1'];
        }
        if (extraOption2.checked) {
            finalMsg += messageTemplates[msgLang]['option2_extra2'];
        }
    }

    // Display the final message in the designated box
    const msgReady = document.getElementById("msgReady");
    const messageBox = document.getElementById("messageBox");

    if (finalMsg) {
        msgReady.textContent = finalMsg;
        messageBox.style.display = "block"; // Show the message box
    } else {
        messageBox.style.display = "none"; // Hide the box if no message exists
    }
}

// Function to handle the display of extra options
function handleExtraOptionsDisplay() {
    const extraOptions = document.getElementById("extraOptions");
    const selectedOption = document.querySelector('input[name="option"]:checked');

    // Check if an option has been selected before accessing its ID
    if (selectedOption && selectedOption.id === "option2") {
        extraOptions.style.display = "block";
    } else {
        extraOptions.style.display = "none";

        // If we hide the options, also deselect the checkboxes
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
document.getElementById("copyButton").addEventListener("click", () => {
    const msgReady = document.getElementById("msgReady");
    const textToCopy = msgReady.textContent.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
        const copyButton = document.getElementById("copyButton");
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

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;
const darkIcon = document.getElementById('darkIcon');
const lightIcon = document.getElementById('lightIcon');

// Check localStorage for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
html.setAttribute('data-bs-theme', savedTheme);
updateIcons(savedTheme);

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcons(newTheme);
});

function updateIcons(theme) {
    if (theme === 'dark') {
        darkIcon.classList.add('d-none');
        lightIcon.classList.remove('d-none');
    } else {
        darkIcon.classList.remove('d-none');
        lightIcon.classList.add('d-none');
    }
}
