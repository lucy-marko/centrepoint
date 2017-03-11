let requests = document.getElementsByClassName("request");

for(i = 0; i < requests.length; i++){
  let requestSwitch = requests[i].querySelector('.label');
  let active = requests[i].querySelector('input').checked;
  let id = requests[i].querySelector('.requestId').getAttribute('data-value');
  requestSwitch.addEventListener('click', function(e) {
    window.location.href = `/status?id=${id}&active=${active?false:true}`;
  });
}
