// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form Submission with Formspree
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  const form = e.target;
  const formData = new FormData(form);
  const messageDiv = document.getElementById('form-message');

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Display success message
      messageDiv.textContent = 'Message sent successfully!';
      messageDiv.style.color = 'green';
      form.reset(); // Clear the form
    } else {
      // Display error message
      messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
      messageDiv.style.color = 'red';
    }
  })
  .catch(error => {
    // Display error message
    messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
    messageDiv.style.color = 'red';
  });
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  const form = e.target;
  const formData = new FormData(form);
  const messageDiv = document.getElementById('form-message');
  const submitButton = form.querySelector('button[type="submit"]');

  // Disable the submit button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Display success message
      messageDiv.textContent = 'Message sent successfully!';
      messageDiv.style.color = 'green';
      form.reset(); // Clear the form
    } else {
      // Display error message
      messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
      messageDiv.style.color = 'red';
    }
  })
  .catch(error => {
    // Display error message
    messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
    messageDiv.style.color = 'red';
  })
  .finally(() => {
    // Re-enable the submit button and reset its text
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-buttons button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    // Update active button state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});
