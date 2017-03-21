let returntoDashboard = document.querySelector(".go-back"); // should use a more specific class

returntoDashboard.addEventListener('click', function(e) {
  window.location.href = `/dashboard`;
})
