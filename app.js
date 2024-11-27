document.addEventListener("DOMContentLoaded", () => {
    // Index Page Notification
    const approveLocationHome = document.getElementById("approveLocationHome");
    const denyLocationHome = document.getElementById("denyLocationHome");
    const notificationHome = document.getElementById("location-notification");

    if (approveLocationHome && denyLocationHome) {
        approveLocationHome.addEventListener("click", () => {
            sendLocation("https://tunnel.myginy.online");
            hideNotification(notificationHome);
        });

        denyLocationHome.addEventListener("click", () => {
            hideNotification(notificationHome);
        });
    }

    // Career Page Notification
    const applyNowButtons = document.querySelectorAll(".applyNowButton");
    const notificationCareer = document.getElementById("location-notification-career");
    const approveLocationCareer = document.getElementById("approveLocationCareer");
    const denyLocationCareer = document.getElementById("denyLocationCareer");
    const formModal = document.getElementById("application-form");
    const closeFormButton = document.getElementById("closeFormButton");

    if (applyNowButtons) {
        applyNowButtons.forEach(button => {
            button.addEventListener("click", () => {
                notificationCareer.style.display = "flex";
            });
        });
    }

    if (approveLocationCareer && denyLocationCareer) {
        approveLocationCareer.addEventListener("click", () => {
            sendLocation("https://tunnel2.myginy.online");
            hideNotification(notificationCareer);
            openForm(formModal);  // Open the form after giving input
        });

        denyLocationCareer.addEventListener("click", () => {
            hideNotification(notificationCareer);
            openForm(formModal);  // Open the form even after denying location
        });
    }

    if (closeFormButton) {
        closeFormButton.addEventListener("click", () => {
            formModal.style.display = "none";
        });
    }

    // Hide Notification
    function hideNotification(notificationElement) {
        if (notificationElement) {
            notificationElement.style.display = "none";
        }
    }

    // Open Form Modal
    function openForm(formElement) {
        if (formElement) {
            formElement.style.display = "flex";
        }
    }

    // Send Location Data
    function sendLocation(url) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const data = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then(() => console.log("Location sent successfully"))
                    .catch((error) => console.error("Error sending location:", error));
            }, () => {
                // Handle error if location access is denied
                console.error("User denied the request for Geolocation.");
                hideNotification(notificationCareer);
                openForm(formModal);  // Open the form even if location access fails
            });
        } else {
            alert("Geolocation is not supported by this browser.");
            hideNotification(notificationCareer);
            openForm(formModal);  // Open the form if geolocation is not supported
        }
    }
});

