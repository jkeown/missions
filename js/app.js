const missionsList = {
  'one': { name: 'San Diego de Alcalá', year: 1769 },
  'two': { name: 'San Carlos Borromeo de Carmelo', year: 1770 },
  'three': { name: 'San Antonio de Padua', year: 1771 },
  'four': { name: 'San Gabriel Arcángel', year: 1771 },
  'five': { name: 'San Luis Obispo de Tolosa', year: 1772 },
  'six': { name: 'San Francisco de Asís', year: 1776 },
  'seven': { name: 'San Juan Capistrano', year: 1776 },
  'eight': { name: 'Santa Clara de Asís', year: 1777 },
  'nine': { name: 'San Buenaventura', year: 1782 },
  'ten': { name: 'Santa Bárbara', year: 1786 },
  'eleven': { name: 'La Purísima Concepción', year: 1787 },
  'twelve': { name: 'Santa Cruz', year: 1791 },
  'thirteen': { name: 'Nuestra Señora de la Soledad', year: 1791 },
  'fourteen': { name: 'San José', year: 1797 },
  'fifteen': { name: 'San Juan Bautista', year: 1797 },
  'sixteen': { name: 'San Miguel Arcángel', year: 1797 },
  'seventeen': { name: 'San Fernando Rey de España', year: 1797 },
  'eighteen': { name: 'San Luis Rey de Francia', year: 1798 },
  'nineteen': { name: 'Santa Inés', year: 1804 },
  'twenty': { name: 'San Rafael Arcángel', year: 1817 },
  'twenty1': { name: 'San Francisco Solano', year: 1823 }
}

let missionsKeys = Object.keys(missionsList).sort().reverse();

const wordBank = document.getElementById('wordbank');

// Create wordbank
missionsKeys.forEach(function (mission) {
  let div = document.createElement('div');
  let yearInput = document.createElement('input');
  div.setAttribute('class', 'mission-name');
  div.setAttribute('draggable', 'true');
  yearInput.setAttribute('id', `for-${mission}`);
  yearInput.setAttribute('name', mission);
  yearInput.setAttribute('class', 'year');
  yearInput.setAttribute('type', 'number');
  yearInput.setAttribute('min', '1760');
  yearInput.setAttribute('max', '1830');
  div.textContent = missionsList[mission].name;
  div.appendChild(yearInput);
  wordBank.appendChild(div);
})

const missionNames = document.querySelectorAll('.mission-name');
const missions = document.querySelectorAll('.mission');

// Add event listeners
missionNames.forEach(mission => {
  mission.addEventListener('dragstart', dragStart);
  mission.addEventListener('dragend', dragEnd);
  mission.addEventListener('dragover', dragOver);
  mission.addEventListener('dragenter', dragHover);
  mission.addEventListener('dragleave', dragLeave);
  mission.addEventListener('drop', dragPlace);
});

missions.forEach(mission => {
  mission.addEventListener('dragstart', dragStart);
  mission.addEventListener('dragend', dragEnd);
  mission.addEventListener('dragover', dragOver);
  mission.addEventListener('dragenter', dragHover);
  mission.addEventListener('dragleave', dragLeave);
  mission.addEventListener('drop', dragPlace);
});

document.querySelector('.buttons').addEventListener('click', function (e) {
  if (e.target.classList.contains('blue')) {
    checkAnswers();
  }
  if (e.target.classList.contains('red')) {
    resetMap();
  }

})

// Drag functions
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.textContent);

  if (e.target.className === 'mission') {
    setTimeout(() => (this.textContent = " "), 0);
  }
}
function dragEnd(e) {
  if (e.dataTransfer.dropEffect === "none") {

  }
}
function dragOver(e) {
  e.preventDefault(); // dragDrop will not fire off with default enabled
}
function dragHover(e) {
  e.preventDefault();
  if (e.target.classList.contains('mission')){
    this.classList.add('hovered');
  }
}
function dragLeave(e) {
  this.classList.remove('hovered');
}
function dragPlace(e) {
  e.preventDefault();
  let data = e.dataTransfer.getData("text/plain");
  if (e.target.className === 'mission-name') {
    data = e.target.textContent;
  }
  e.target.textContent = data;
  this.classList.remove('hovered');
}

// Check answers
const correctSection = document.getElementById('correct');

function checkAnswers() {
  let missionsNodelist = document.querySelectorAll('.mission');
  let yearNodelist = document.querySelectorAll('.year');

  let missions = Array.from(missionsNodelist);
  let years = Array.from(yearNodelist);

  if (missions.every(mission => mission.textContent === missionsList[mission.id].name)) {
    correctSection.className = '';
    missionsNodelist.forEach(mission => mission.classList.remove('wrong'));
  }
  else {
    missions.forEach(mission => mission.textContent !== missionsList[mission.id].name ?
      mission.classList.add('wrong') : mission.classList.remove('wrong'));
  }
  
  years.forEach(function(year){
    if (year.value == missionsList[year.name].year){
      year.classList.add('correct');
      year.classList.remove('wrong');
    }
    else{
      year.classList.add('wrong');
      year.classList.remove('correct');
    }
  });
}

// Reset map
function resetMap() {
  let missionsNodelist = document.querySelectorAll('.mission');
  let yearNodelist = document.querySelectorAll('.year');

  missionsNodelist.forEach(mission => mission.textContent = '');
  missionsNodelist.forEach(mission => mission.classList.remove('wrong'));
  yearNodelist.forEach(year => year.value = '');
  yearNodelist.forEach(year => year.classList = 'year');


  correctSection.className = 'hidden';


}