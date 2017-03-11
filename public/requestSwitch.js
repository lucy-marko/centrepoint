let requests = document.getElementsByClassName("request");

for(i = 0; i < requests.length; i++){
  let requestSwitch = requests[i].firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
  let active = requests[i].firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.checked;
  let id = requests[i].lastElementChild.lastElementChild.firstElementChild.getAttribute('data-value');
  requestSwitch.addEventListener('click', function(e) {
    window.location.href = `/status?id=${id}&active=${active?false:true}`;
  });
}
