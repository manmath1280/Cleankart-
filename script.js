// ===== LOGIN & REGISTER MODAL =====
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("openLogin");
  const loginModal = document.getElementById("loginModal");
  const closeLogin = document.getElementById("closeLogin");

  const registerBtn = document.getElementById("openRegister");
  const registerModal = document.getElementById("registerModal");
  const closeRegister = document.getElementById("closeRegister");

  // Login success message display करायचं का ते बघ
const params = new URLSearchParams(window.location.search);
if (params.get("login") === "success") {
  const msg = document.getElementById("message");
  msg.style.display = "block";

  // 5 सेकंदांनी hide कर
  setTimeout(() => {
    msg.style.display = "none";
  }, 5000);
}

  // Open modals
  loginBtn?.addEventListener("click", () => {
    loginModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  registerBtn?.addEventListener("click", () => {
    registerModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  // Close modals
  closeLogin?.addEventListener("click", () => {
    loginModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  closeRegister?.addEventListener("click", () => {
    registerModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (e.target === registerModal) {
      registerModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

// ===== BOOKING MODAL FUNCTIONALITY =====
const modal = document.getElementById("bookingModal");
const openBtn = document.querySelector(".hero-button");
const closeBtn = document.querySelector(".close-button");
const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const services = document.querySelectorAll(".service");
const serviceType = document.getElementById("serviceType");
const totalAmount = document.getElementById("totalAmount");
const paymentMethod = document.getElementById("paymentMethod");
const codCharges = document.getElementById("codCharges");

let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.style.display = i === index ? "block" : "none";
  });
}

openBtn?.addEventListener("click", () => {
  modal.style.display = "flex";
  showStep(currentStep);
  document.body.style.overflow = "hidden";
});

closeBtn?.addEventListener("click", () => {
  modal.style.display = "none";
  currentStep = 0;
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    currentStep = 0;
    document.body.style.overflow = "auto";
  }
});

function calculateTotal() {
  let total = 0;
  services.forEach(service => {
    if (service.checked) {
      total += parseInt(service.dataset.price);
    }
  });
  if (serviceType.value === "premium") {
    total += 300;
  }
  totalAmount.innerText = `Total: ₹${total}`;
  return total;
}

services.forEach(item => item.addEventListener("change", calculateTotal));
serviceType.addEventListener("change", calculateTotal);

paymentMethod.addEventListener("change", () => {
  codCharges.style.display = "block";
  if (paymentMethod.value === "cod") {
    codCharges.innerText = "Note: ₹100 booking charge is required for Cash on Delivery.";
  } else {
    codCharges.innerText = "Note: Please pay ₹100 in advance to confirm your slot.";
  }
});

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Validate Step 1 (User Details)
    if (currentStep === 0) {
      const name = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const location = document.getElementById("location").value.trim();
      if (!name || !phone || !email || !location) {
        showCustomAlert("Please fill in all required fields.");
        return;
      }
    }

    // Validate Step 2 (Service Selection)
    if (currentStep === 1) {
      const selected = Array.from(services).some(s => s.checked);
      if (!selected) {
        showCustomAlert("Please select at least one service.");
        return;
      }
    }

    // Validate Step 3 (Service Type)
    if (currentStep === 2 && !serviceType.value) {
      showCustomAlert("Please select a service type.");
      return;
    }

    currentStep++;
    showStep(currentStep);
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

document.getElementById("bookingForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;
  const altPhone = document.getElementById("altPhone").value;
  const payment = paymentMethod.value;
  const total = calculateTotal();

  if (!payment) {
    showCustomAlert("Please select a payment method.");
    return;
  }

  let msg = `Thank you ${name}, your booking is confirmed.\n\n`;
  msg += `Phone: ${phone}, Email: ${email}\nLocation: ${location}\nAlternate Number: ${altPhone}\n`;
  msg += `Total Payable: ₹${total}`;
  msg += payment === "cod"
    ? `\nNote: ₹100 booking charge is required for Cash on Delivery.`
    : `\nNote: Please proceed to pay ₹100 in advance using the payment link.`;

  showCustomAlert(msg);

  setTimeout(() => {
    modal.style.display = "none";
    currentStep = 0;
    document.body.style.overflow = "auto";

    if (payment !== "cod") {
      window.open("https://imjo.in/Fg5Hfm", "_blank");
    }
  }, 500);
});

calculateTotal();

// ===== SMOOTH SCROLL FOR ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// ===== CUSTOM ALERT POPUP =====
function showCustomAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.innerText = message;
  alertBox.style.display = "flex";
}

function closeCustomAlert() {
  const alertBox = document.getElementById("customAlert");
  alertBox.style.display = "none";
}