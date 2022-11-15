const tableData = {
   num: 4,
   group: 4,
   dineIn: "4:05pm",
   state: 'unorder'
}

fillTableInfo(tableData);
const imgPath = "../assets/images/dishes/";
const fooddata = [
   {
      id: 1,
      name: "Nem rán Hà Nội",
      cost: 99000,
      type: "monga",
      typeName: "Món gà",
      img: imgPath + 'f5.png'
   },
   {
      id: 2,
      name: "Bao tử cá",
      cost: 129000,
      type: "monga",
      typeName: "Món gà",
      img: imgPath + 'f6.png'
   },
   {
      id: 3,
      name: "Cá lăng thêm",
      cost: 259000,
      type: "monga",
      typeName: "Món gà",
      img: imgPath + 'f7.jpg'
   },
   {
      id: 4,
      name: "Chả cá đế vương 1",
      cost: 129000,
      type: "montrau",
      typeName: "Món trâu",
      img: imgPath + 'f8.jpg'
   },
   {
      id: 5,
      name: "Chả cá đế vương 2",
      cost: 179000,
      type: "montrau",
      typeName: "Món trâu",
      img: imgPath + 'f9.png'
   },
   {
      id: 6,
      name: "Chảo cá nhỏ",
      cost: 89000,
      type: "calang",
      typeName: "Cá lăng",
      img: imgPath + 'f10.png'
   },
   {
      id: 7,
      name: "Chè bưởi",
      cost: 99000,
      type: "calang",
      typeName: "Cá lăng",
      img: imgPath + 'f11.jpg'
   },
   {
      id: 8,
      name: "Chè đế vương",
      cost: 29000,
      type: "monche",
      typeName: "món chè",
      img: imgPath + 'f12.jpg'
   },
   {
      id: 9,
      name: "Dưa xào lòng cá",
      cost: 69000,
      type: "monche",
      typeName: "món chè",
      img: imgPath + 'f13.jpg'
   },
   {
      id: 10,
      name: "Khoai tây lắc",
      cost: 99000,
      type: "monche",
      typeName: "món chè",
      img: imgPath + 'f14.png'
   }
];

let orderList = [];
let totalcost = 0;

/*********** Menu and navbar ************/
let menu = document.getElementById("menu");
let btnContainer = document.getElementById("navbar");

fooddata.forEach((food, idx) => {
   createFoodTag(food, idx);
   createTypeNav(food.type, food.typeName);
})

/******* Food tag  ********/
function createFoodTag(food, idx) {
   let sample = document.getElementById('sample');
   let foodTag = sample.cloneNode(true);
   foodTag.style.display = 'flex';

   foodTag.id = idx;
   foodTag.classList.add(food.type)
   foodTag.getElementsByTagName('img')[0].src = food.img;
   foodTag.getElementsByClassName('name')[0].innerHTML = food.name;
   foodTag.getElementsByClassName('cost')[0].innerHTML = "đ " + numberWithDot(food.cost);

   let plusbtn = foodTag.getElementsByClassName('plus-food')[0];
   let minusbtn = foodTag.getElementsByClassName('minus-food')[0];
   let foodNum = foodTag.getElementsByClassName('ordernum')[0];
   foodNum.innerHTML = 0;

   plusbtn.addEventListener('click', () => {
      plusOnclick(foodNum, minusbtn, idx);
   })

   minusbtn.addEventListener('click', () => {
      minusOnclick(foodNum, minusbtn, idx);
   });

   menu.appendChild(foodTag)
}

/********* navbar **********/
let allnav = document.getElementById('all');
allnav.addEventListener('click', onClickTypeNav);

/************  Modal ************/
// Get the modal
var cartmodal = document.getElementById("cartModal");
let cartmain = document.getElementById('cartmain');
var penmodal = document.getElementById("penModal");
let alertmodal = document.getElementById("alert");

// Get the button that opens the modal
var cartbtn = document.getElementById("cartBtn");
let penbtn = document.getElementById("penBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")


// When the user clicks on the button, open the modal
cartbtn.onclick = function () {
   let chooselist = document.getElementById("choose-list")
   if (chooselist) chooselist.remove();
   chooselist = document.createElement('div');
   chooselist.id = 'choose-list'

   orderList.forEach(order => {
      if (order.sl > 0) {
         food = fooddata[order.id];
         food.sl = order.sl;
         createFoodModal(chooselist, food, order.id)
      }
   })

   cartmain.appendChild(chooselist)
   cartmodal.style.display = "block";
}

function createFoodModal(chooselist, food, idx) {
   let sample = document.getElementById('samplemodal');
   let foodTag = sample.cloneNode(true);
   foodTag.style.display = 'flex';

   foodTag.classList.add(food.type)
   foodTag.getElementsByTagName('img')[0].src = food.img;
   foodTag.getElementsByClassName('name')[0].innerHTML = food.name;
   foodTag.getElementsByClassName('cost')[0].innerHTML = "đ " + numberWithDot(food.cost);

   let plusbtn = foodTag.getElementsByClassName('plus-food')[0];
   let minusbtn = foodTag.getElementsByClassName('minus-food')[0];
   let foodNum = foodTag.getElementsByClassName('ordernum')[0];
   foodNum.innerHTML = food.sl;

   plusbtn.addEventListener('click', () => {
      plusOnclick(foodNum, minusbtn, idx);
      updateOrderList(idx, foodNum.innerHTML);
   })

   minusbtn.addEventListener('click', () => {
      minusOnclick(foodNum, minusbtn, idx);
      updateOrderList(idx, foodNum.innerHTML);
   });

   chooselist.appendChild(foodTag)
}

// prepare button

let preparebtn = document.getElementById('prepare');
preparebtn.addEventListener('click', () => {
   // pull to server

   //
   alertmodal.getElementsByClassName('alert')[0].innerHTML = 'Prepare all sucessfully';
   cartmodal.style.display = "none";
   popUpAlert();
   deleteAllOrder();
})

// pen modal
penbtn.onclick = function () {
   penmodal.style.display = "block";
}

let addsreq = document.getElementById('addsreq');
addsreq.addEventListener('click', () => {
   // pull to server

   //
   alertmodal.getElementsByClassName('alert')[0].innerHTML = 'add requirement sucessfully';
   penmodal.getElementsByTagName('textarea')[0].value = ''
   penmodal.style.display = "none";
   popUpAlert()
})

// alert modal
function popUpAlert() {
   alertmodal.style.display = "block";
   setTimeout(() => {
      alertmodal.style.display = "none";
   }, 500)
}

// When the user clicks on <span> Cancle or OK, close the modal
for (let i = 0; i < span.length; i++) {
   span[i].onclick = function () {
      if (cartmodal.style.display == "block") {
         cartmodal.style.display = "none";
      } else if (penmodal.style.display == "block") {
         penmodal.style.display = "none";
      }
   }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
   if (event.target == cartmodal) {
      cartmodal.style.display = "none";
   } else if (event.target == penmodal) {
      penmodal.style.display = "none";
   }
}

/********* search bar **********/
let searchbar = document.getElementById('searchbar');
searchbar.onkeyup = () => {
   let filter = searchbar.value.toLowerCase();
   let foods = menu.children

   // Loop through all list items, and hide those who don't match the search query
   for (i = 0; i < foods.length; i++) {
      if (foods[i].id == 'sample') continue;
      let foodName = fooddata[foods[i].id].name;

      if (foodName.toLowerCase().indexOf(filter) > -1) {
         foods[i].style.display = "";
      } else {
         foods[i].style.display = "none";
      }
   }
};

/****** Done button ******/
let donebtn = document.getElementById('done');
donebtn.addEventListener('click', () => {

})

/********** Cart Summary **********/
let costspan = document.getElementById('totalcost');
function changeCartSummary(cost) {
   costspan.innerHTML = numberWithDot(cost);
}

/******** function *********/

function minusOnclick(foodNum, minusbtn, id) {
   for (let i = 0; i < orderList.length; i++) {
      if (orderList[i].id == id) {
         orderList[i].sl -= 1;
         foodNum.innerHTML = parseInt(foodNum.innerHTML) - 1;

         // hide minus button and so luong food
         if (orderList[i].sl == 0) {
            minusbtn.style.display = 'none';
            foodNum.style.display = 'none';
         }
         break;
      }
   }

   // change total cost
   totalcost -= fooddata[id].cost;
   changeCartSummary(totalcost);
}

function plusOnclick(foodNum, minusbtn, id) {
   let flag = true;
   for (let i = 0; i < orderList.length; i++) {
      if (orderList[i].id == id) {
         orderList[i].sl += 1;
         flag = false;
         break;
      }
   }

   // change total cost
   totalcost += fooddata[id].cost;
   changeCartSummary(totalcost);

   // display minus button and so luong food
   if (flag) orderList.push({ id: id, sl: 1 });
   foodNum.innerHTML = parseInt(foodNum.innerHTML) + 1;
   minusbtn.style.display = 'inline';
   foodNum.style.display = 'inline';
}

function updateOrderList(id, sl) {
   let foodTag = document.getElementById(id);
   let foodNum = foodTag.getElementsByClassName('ordernum')[0];
   foodNum.innerHTML = sl;

   if (sl == '0') {
      foodNum.style.display = 'none';
      foodTag.getElementsByClassName('minus-food')[0].style.display = 'none';
   }
}

function deleteAllOrder() {
   orderList.forEach(order => {
      order.sl = 0;
      updateOrderList(order.id, order.sl);
   })
   orderList = [];
}

function createTypeNav(type, typeName) {
   let typenav = document.getElementById(type);
   if (typenav) return;

   typenav = document.createElement('a');
   typenav.href = '#';
   typenav.id = type;
   typenav.innerHTML = typeName;
   typenav.classList.add('m_title')

   typenav.addEventListener("click", onClickTypeNav);

   btnContainer.appendChild(typenav);
}

function onClickTypeNav(event) {
   // filter
   let type = event.target.id;
   let foodTags = menu.children

   for (let j = 0; j < foodTags.length; j++) {
      if (type == 'all' && foodTags[j].id != 'sample') {
         foodTags[j].style.display = 'flex';
      }
      else if (!foodTags[j].classList.contains(type)) {
         foodTags[j].style.display = 'none';
      }
      else {
         foodTags[j].style.display = 'flex';
      }
   }

   // active
   var current = document.getElementsByClassName("active");
   current[0].className = current[0].className.replace("active", "");
   this.className += " active";
}