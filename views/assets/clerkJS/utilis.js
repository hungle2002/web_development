function fillTableInfo(tableData) {
   let tableName = document.getElementById('tableName');
   let group = document.getElementById('group');
   let dinein = document.getElementById('dinein');
   let state = document.getElementById('state');

   tableName.innerHTML = 'Table ' + tableData.num;

   let groupNum = document.createElement('span')
   groupNum.innerHTML = tableData.group;
   group.appendChild(groupNum)

   dinein.innerHTML = "Dine in | " + tableData.dineIn;

   state.innerHTML = tableData.state;
   state.parentNode.classList.add(tableData.state);
}

function numberWithDot(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}