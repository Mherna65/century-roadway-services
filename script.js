(function () {
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");
  var navToggle = document.getElementById("nav-toggle");
  var QUOTE_EMAIL = "jerrald@century-rs.com";

  if (navToggle) {
    document.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.checked = false;
      });
    });
  }

  if (!form || !status) return;

  function fieldValue(name) {
    var el = form.elements[name];
    if (!el) return "";
    return (el.value || "").trim();
  }

  function selectedEquipment() {
    var boxes = form.querySelectorAll('input[name="equipment"]:checked');
    var labels = [];
    boxes.forEach(function (box) {
      var wrap = box.closest("label");
      labels.push(wrap ? wrap.textContent.replace(/\s+/g, " ").trim() : box.value);
    });
    return labels;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var name = fieldValue("name");
    var company = fieldValue("company");
    var phone = fieldValue("phone");
    var email = fieldValue("email");
    var location = fieldValue("location");
    var startDate = fieldValue("start-date");
    var details = fieldValue("details");
    var equipment = selectedEquipment();

    var lines = [
      "Quote request from the Century Roadway Services website",
      "",
      "Name: " + name,
      "Company: " + (company || "(not provided)"),
      "Phone: " + phone,
      "Email: " + email,
      "Job location / city: " + (location || "(not provided)"),
      "Needed date: " + (startDate || "(not provided)"),
      "Equipment needed: " + (equipment.length ? equipment.join("; ") : "(not specified)"),
      "",
      "Job details:",
      details || "(none)"
    ];

    var subject = "Quote request from " + name;
    var mailto =
      "mailto:" +
      QUOTE_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));

    window.location.href = mailto;

    status.hidden = false;
    status.textContent =
      "Your email app should open with the request addressed to " +
      QUOTE_EMAIL +
      ". Please send that message to complete your request. If it does not open, email us directly at " +
      QUOTE_EMAIL +
      ".";
  });
})();
