let returntoDashboard = document.querySelector(".go-back");

returntoDashboard.addEventListener('click', function(e) {
  console.log('return to dashboard button was clicked');
  window.location.href = `/dashboard`;
})
