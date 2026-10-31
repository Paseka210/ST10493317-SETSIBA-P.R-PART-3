 
// ===============================
// WELCOME MESSAGE
// ===============================

function welcomeCustomer() {
    const message = document.getElementById("welcomeMessage");

    if (message) {
        message.style.display = "block";

        setTimeout(function () {
            message.style.display = "none";
        }, 4000);
    }
}


// ===============================
// PRODUCT SEARCH
// ===============================

const searchBox = document.getElementById("productSearch");

if (searchBox) {
    searchBox.addEventListener("input", function () {
        const searchText = searchBox.value.toLowerCase();
        const products = document.querySelectorAll(".product");
        let visibleProducts = 0;

        products.forEach(function (product) {
            if (product.textContent.toLowerCase().includes(searchText)) {
                product.style.display = "";
                visibleProducts++;
            } else {
                product.style.display = "none";
            }
        });

        const message = document.getElementById("searchMessage");

        if (message) {
            message.textContent = visibleProducts === 0
                ? "No products found."
                : visibleProducts + " product(s) found.";
        }
    });
}


// ===============================
// VALIDATION FUNCTIONS
// ===============================

function validBakeryName(name) {
    const pattern = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/;
    return pattern.test(name) && name.length >= 2;
}

function validBakeryEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validBakeryPhone(phone) {
    const pattern = /^[0-9+\s()-]{7,20}$/;
    const digits = phone.replace(/\D/g, "");

    return pattern.test(phone) && digits.length >= 7;
}


// Display an error underneath a field

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");

    if (!field || !error) return;

    error.textContent = message;

    field.classList.toggle("input-error", message !== "");
    field.classList.toggle("input-success", message === "");
}


// Clear all errors in a form

function clearFieldErrors(form) {
    form.querySelectorAll(".error-message").forEach(function (error) {
        error.textContent = "";
    });

    form.querySelectorAll(".input-error, .input-success").forEach(function (field) {
        field.classList.remove("input-error", "input-success");
    });
}


// ===============================
// ENQUIRY FORM
// ===============================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    const enquiryFields = [
        "enquiryName",
        "enquiryEmail",
        "enquiryPhone",
        "enquiryCategory",
        "enquirySubject",
        "enquiryQuestion"
    ];

    function validateEnquiry() {
        const name = document.getElementById("enquiryName").value.trim();
        const email = document.getElementById("enquiryEmail").value.trim();
        const phone = document.getElementById("enquiryPhone").value.trim();
        const category = document.getElementById("enquiryCategory").value;
        const subject = document.getElementById("enquirySubject").value.trim();
        const question = document.getElementById("enquiryQuestion").value.trim();

        let valid = true;

        if (!validBakeryName(name)) {
            showFieldError("enquiryName",
                "Please enter a valid name using letters only.");
            valid = false;
        } else {
            showFieldError("enquiryName", "");
        }

        if (!validBakeryEmail(email)) {
            showFieldError("enquiryEmail",
                "Please enter a valid email address.");
            valid = false;
        } else {
            showFieldError("enquiryEmail", "");
        }

        if (phone !== "" && !validBakeryPhone(phone)) {
            showFieldError("enquiryPhone",
                "Please enter a valid phone number.");
            valid = false;
        } else {
            showFieldError("enquiryPhone", "");
        }

        if (category === "") {
            showFieldError("enquiryCategory",
                "Please select an enquiry category.");
            valid = false;
        } else {
            showFieldError("enquiryCategory", "");
        }

        if (subject.length < 3) {
            showFieldError("enquirySubject",
                "Subject must contain at least 3 characters.");
            valid = false;
        } else {
            showFieldError("enquirySubject", "");
        }

        if (question.length < 10) {
            showFieldError("enquiryQuestion",
                "Your question must contain at least 10 characters.");
            valid = false;
        } else {
            showFieldError("enquiryQuestion", "");
        }

        return valid;
    }

    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const success = document.getElementById("enquirySuccess");
        success.textContent = "";

        if (!validateEnquiry()) {
            return;
        }

        success.textContent =
            "Thank you! Your enquiry has been validated successfully. Online submission still needs to be connected.";

        enquiryForm.reset();
        clearFieldErrors(enquiryForm);
    });

    // Check fields as the customer types or changes an answer.
    enquiryFields.forEach(function (fieldId) {
        const field = document.getElementById(fieldId);

        field.addEventListener("input", function () {
            validateEnquiry();
        });

        field.addEventListener("change", function () {
            validateEnquiry();
        });
    });

    enquiryForm.addEventListener("reset", function () {
        document.getElementById("enquirySuccess").textContent = "";
        clearFieldErrors(enquiryForm);
    });
}


// ===============================
// ORDER FORM
// ===============================

const orderForm = document.getElementById("orderForm");

if (orderForm) {

    const orderFields = [
        "customerName",
        "orderPhone",
        "product",
        "quantity"
    ];

    function validateOrder() {
        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("orderPhone").value.trim();
        const product = document.getElementById("product").value;
        const quantityValue = document.getElementById("quantity").value;
        const quantity = Number(quantityValue);

        let valid = true;

        if (!validBakeryName(name)) {
            showFieldError("customerName",
                "Please enter a valid name using letters only.");
            valid = false;
        } else {
            showFieldError("customerName", "");
        }

        if (!validBakeryPhone(phone)) {
            showFieldError("orderPhone",
                "Please enter a valid phone number.");
            valid = false;
        } else {
            showFieldError("orderPhone", "");
        }

        if (product === "") {
            showFieldError("product",
                "Please select a product.");
            valid = false;
        } else {
            showFieldError("product", "");
        }

        if (
            quantityValue === "" ||
            !Number.isInteger(quantity) ||
            quantity < 1 ||
            quantity > 1000
        ) {
            showFieldError("quantity",
                "Please enter a whole number between 1 and 1000.");
            valid = false;
        } else {
            showFieldError("quantity", "");
        }

        return valid;
    }

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const success = document.getElementById("orderSuccess");
        success.textContent = "";

        if (!validateOrder()) {
            return;
        }

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("orderPhone").value.trim();
        const product = document.getElementById("product").value;
        const quantity = document.getElementById("quantity").value;

        success.textContent =
            "Thank you, " + name + "! Your order for " +
            quantity + " " + product +
            " has been validated. We will contact you on " +
            phone + " to confirm your order.";

        orderForm.reset();
        clearFieldErrors(orderForm);
    });

    orderFields.forEach(function (fieldId) {
        const field = document.getElementById(fieldId);

        field.addEventListener("input", function () {
            validateOrder();
        });

        field.addEventListener("change", function () {
            validateOrder();
        });
    });

    orderForm.addEventListener("reset", function () {
        document.getElementById("orderSuccess").textContent = "";
        clearFieldErrors(orderForm);
    });
}


// ===============================
// SHOPPING CART
// ===============================

let cart = [];

try {
    cart = JSON.parse(localStorage.getItem("bakeryCart")) || [];

    if (!Array.isArray(cart)) {
        cart = [];
    }
} catch (error) {
    cart = [];
}

function addToCart(name, price) {
    cart.push({
        name: name,
        price: Number(price)
    });

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartCount || !cartTotal) {
        localStorage.setItem("bakeryCart", JSON.stringify(cart));
        return;
    }

    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach(function (item, index) {
        total += Number(item.price);

        const productLine = document.createElement("p");

        productLine.textContent =
            item.name + " - R" + Number(item.price).toFixed(2) + " ";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.type = "button";

        removeButton.addEventListener("click", function () {
            removeFromCart(index);
        });

        productLine.appendChild(removeButton);
        cartItems.appendChild(productLine);
    });

    cartCount.textContent = "Items in cart: " + cart.length;
    cartTotal.textContent = "Total: R" + total.toFixed(2);

    localStorage.setItem("bakeryCart", JSON.stringify(cart));
}

updateCart();


// ===============================
// CONTACT FORM VALIDATION
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const contactFields = [
        "contactName",
        "contactEmail",
        "contactType",
        "contactMessage"
    ];

    function validateContact() {

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const type = document.getElementById("contactType").value;
        const message = document.getElementById("contactMessage").value.trim();

        let valid = true;

        if (!validBakeryName(name)) {
            showFieldError(
                "contactName",
                "Please enter a valid full name using letters only."
            );
            valid = false;
        } else {
            showFieldError("contactName", "");
        }

        if (!validBakeryEmail(email)) {
            showFieldError(
                "contactEmail",
                "Please enter a valid email address."
            );
            valid = false;
        } else {
            showFieldError("contactEmail", "");
        }

        if (type === "") {
            showFieldError(
                "contactType",
                "Please select a message type."
            );
            valid = false;
        } else {
            showFieldError("contactType", "");
        }

        if (message.length < 10) {
            showFieldError(
                "contactMessage",
                "Your message must contain at least 10 characters."
            );
            valid = false;
        } else {
            showFieldError("contactMessage", "");
        }

        return valid;
    }

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const feedback = document.getElementById("contactFeedback");
        feedback.textContent = "";

        if (!validateContact()) {
            return;
        }

        const name = document.getElementById("contactName").value.trim();

        feedback.textContent =
            "Thank you, " + name +
            "! Your contact form has been validated successfully. Email submission still needs to be connected.";

        contactForm.reset();
        clearFieldErrors(contactForm);
    });

    contactFields.forEach(function(fieldId) {

        const field = document.getElementById(fieldId);

        field.addEventListener("input", function() {
            validateContact();
        });

        field.addEventListener("change", function() {
            validateContact();
        });

    });

    contactForm.addEventListener("reset", function() {

        document.getElementById("contactFeedback").textContent = "";

        clearFieldErrors(contactForm);

    });
}
