let newAdmin = document.querySelector(".new-admin");

// i don't think you need to use javascript to do this – can't you just use <a href='/new-admin'>?
newAdmin.addEventListener('click', function(e) {
    window.location.href = `/new-admin`;
});
