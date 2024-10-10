const DATA = [
  {
    body: "cruiser",
    power: "150cc",
    seater: "7 seater",
  },
  {
    body: "retro",
    power: "200cc",
    seater: "5 seater",
  },
  {
    body: "retro",
    power: "150cc",
    seater: "2 seater",
  },
  {
    body: "cruiser",
    power: "150cc",
    seater: "2 seater",
  },
  {
    body: "cruiser",
    power: "300cc",
    seater: "3 seater",
  },
  {
    body: "sports",
    power: "150cc",
    seater: "5 seater",
  },
  {
    body: "retro",
    power: "300cc",
    seater: "3 seater",
  },
  {
    body: "classic",
    power: "200cc",
    seater: "3 seater",
  },
];

let FilterdData = []

const GroupOneSelector = new Set([...DATA.map(obj => obj.body)])
const GroupTwoSelector = new Set([...DATA.map(obj => obj.power)])
const GroupThreeSelector = new Set([...DATA.map(obj => obj.seater)])

let selectedValues = {
  'body': [],
  'power': [],
  'seater': []
}

function getOptionString({body, power, seater}) {
  return `
    <div class="option">
      ${body}
      <br>
      ${power}
      <br>
      ${seater}
    </div>
    `
}

function renderOptions(options) {
  let optionsDiv = document.getElementById("options")

  let innerHTML = ""
  options.map(opt => {
    innerHTML += getOptionString(opt)
  })  

  optionsDiv.innerHTML = innerHTML
}

function getSelectorString(name, id) {
  return `
  <button class="selector" id="${id}-${name}" onClick="handleSelectorToggle('${name}', '${id}')">${name}</button>
  `
}

function renderSelectorByGroup(group, groupId) {
  let groupDiv = document.getElementById(groupId)
  let innerHTML = ""
  group.forEach(grp => {
    innerHTML += getSelectorString(grp, groupId)
  })
  
  groupDiv.innerHTML += innerHTML
}

function checkSelectorsEmpty() {
  return (selectedValues["body"].length < 1 && 
  selectedValues["power"].length < 1 &&
  selectedValues["seater"].length < 1)
}

function updateOptions() {
  if(checkSelectorsEmpty()){
    FilterdData = DATA
    return;
  }
  FilterdData = DATA.filter((datum) => {
    return (
      (selectedValues["body"].length < 1 || selectedValues["body"].includes(datum.body)) &&
      (selectedValues["power"].length < 1 || selectedValues["power"].includes(datum.power))&&
      (selectedValues["seater"].length < 1 || selectedValues["seater"].includes(datum.seater)))
  })

}

function handleSelectorToggle(name, id) {
  console.log(name, id);
  let updatedSelections = selectedValues[id]
  if(updatedSelections.includes(name)){
    updatedSelections = updatedSelections.filter(n => n != name)
    document.getElementById(`${id}-${name}`).classList.remove('selector-active')
  } else {
    updatedSelections.push(name)
    document.getElementById(`${id}-${name}`).classList.add('selector-active')
  }
  selectedValues[id] = updatedSelections
  updateOptions()
  renderOptions(FilterdData)
}

function initializeGroupDivs(){
  allSelectorsDiv = document.getElementById('selectors')
  let innerHTML = ""
  Object.keys(DATA[0]).forEach(key=> {
    innerHTML += `<div class="group" id="${key}"></div>`
  })
allSelectorsDiv.innerHTML = innerHTML
}

// Add div for each key in Data object
initializeGroupDivs()

// Initially render all data
renderOptions(DATA)
// Add selet button for each group
renderSelectorByGroup(GroupOneSelector, 'body')
renderSelectorByGroup(GroupTwoSelector, 'power')
renderSelectorByGroup(GroupThreeSelector, 'seater')