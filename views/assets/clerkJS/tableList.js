const tabledata = [
   {
      num: 1,
      group: 2,
      dineIn: "4:05pm",
      state: 'paid'
   },
   {
      num: 3,
      group: 4,
      dineIn: "4:15pm",
      state: 'ordered'
   },
   {
      num: 4,
      group: 4,
      dineIn: "4:30pm",
      state: 'unorder'
   }
]

let tableList = document.getElementById('table-list');
let tableSample = document.getElementById('sample')
let typebar = document.getElementById('state-type');
let typeall = document.getElementById('all');

typeall.addEventListener('click', onClickTypeState);
tabledata.forEach((table, idx) => {
   createTableTag(table, idx)
   createStateFilter(table.state);
})


/****** function ********/

function createTableTag(table, idx) {
   let tableTag = tableSample.cloneNode(true);

   tableTag.id = idx;
   tableTag.classList.add(table.state);
   tableTag.getElementsByClassName('table-name')[0].innerHTML = 'Table' + table.num;
   tableTag.getElementsByClassName('group')[0].innerHTML = table.group;
   tableTag.getElementsByClassName('dineIn')[0].innerHTML = table.dineIn;
   tableTag.getElementsByClassName('statestr')[0].innerHTML = table.state;
   tableTag.getElementsByClassName('state')[0].classList.add(table.state);

   tableTag.style.display = 'flex';
   tableList.appendChild(tableTag);
}

// filter table
function createStateFilter(state) {
   let li = document.createElement('li');
   li.id = state;
   li.innerHTML = state;
   li.classList.add('m_title');
   li.addEventListener('click', onClickTypeState);

   typebar.appendChild(li);
}

function onClickTypeState(event) {
   // filter
   let type = event.target.id;
   let tableTags = tableList.children

   for (let j = 0; j < tableTags.length; j++) {
      if (tableTags[j].id == 'sample') continue;

      if (type == 'all') {
         tableTags[j].style.display = 'flex';
      }
      else if (!tableTags[j].classList.contains(type)) {
         tableTags[j].style.display = 'none';
      }
      else {
         tableTags[j].style.display = 'flex';
      }
   }

   // active
   var current = typebar.getElementsByClassName("active");
   current[0].className = current[0].className.replace("active", "");
   this.className += " active";
}