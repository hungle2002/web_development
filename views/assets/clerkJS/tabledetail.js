const imgPath = "../assets/images/dishes/";
const data = {
   table: {
      num: 3,
      group: 4,
      dineIn: "4:15pm",
      state: 'ordered'
   },
   orderList: [
      {
         id: 1,
         name: "Nem rán Hà Nội",
         cost: 99000,
         img: imgPath + 'f5.png',
         excuted: true,
         served: false,
         cancle: false
      },
      {
         id: 1,
         name: "Nem rán Hà Nội",
         cost: 99000,
         img: imgPath + 'f5.png',
         excuted: true,
         served: false,
         cancle: false
      },
      {
         id: 2,
         name: "Bao tử cá",
         cost: 129000,
         img: imgPath + 'f6.png',
         excuted: true,
         served: false,
         cancle: false
      },
      {
         id: 4,
         name: "Chả cá đế vương 1",
         cost: 129000,
         img: imgPath + 'f8.jpg',
         excuted: false,
         served: false,
         cancle: false
      },
      {
         id: 6,
         name: "Chảo cá nhỏ",
         cost: 89000,
         img: imgPath + 'f10.png',
         excuted: true,
         served: false,
         cancle: false
      },

   ]
}

//foodlist
const foodSample = document.getElementById('sample');
const foodContainer = document.getElementById('foodlist');
//bill
const billContainer = document.getElementById('bill');
const billlist = document.getElementById('billlist');
const allTotal = document.getElementById('allTotal');
//navtag
const foodspan = document.getElementById('foodTag');
const billspan = document.getElementById('billTag');
//buttons
const confirmPaidbtn = document.getElementById('confirmPaid');
const goimonbtn = document.getElementById('goimon');
const availablebtn = document.getElementById('available');

// fill info to table header
fillTableInfo(data.table);
// create foodtab in foodlist
createFoodTab(data.orderList);

// food and bill tab onclick
foodspan.addEventListener('click', () => {
   onClickActive(foodspan);
   displayFoodOrBill('flex', 'none');
});
billspan.addEventListener('click', () => {
   onClickActive(billspan);
   displayFoodOrBill('none', 'block');
   createBill(data.orderList);
});

// buttons on click
confirmPaidbtn.addEventListener('click', () => {
   // change state
   let state = document.getElementById('state');
   let statestr = 'paid';

   data.table.state = 'paid';
   state.innerHTML = statestr;
   state.parentNode.classList.add(statestr);

   // change buttons
   confirmPaidbtn.style.display = 'none';
   goimonbtn.style.display = 'none';
   availablebtn.style.display = 'block';
})

goimonbtn.addEventListener('click', () => {

})

availablebtn.addEventListener('click', () => {

})

/****** function ******/

function onClickActive(span) {
   // active
   let types = document.getElementById('types')
   var current = types.getElementsByClassName("cam");
   current[0].className = current[0].className.replace("cam", "");
   span.className += " cam";
}

function createFoodTab(orderList) {
   orderList.forEach((order, idx) => {
      let foodTab = foodSample.cloneNode(true);
      let popuptext = foodTab.getElementsByClassName('popuptext')[0];

      foodTab.id = idx;
      foodTab.getElementsByTagName('img')[0].src = order.img;
      foodTab.getElementsByClassName('foodName')[0].innerHTML = order.name;
      foodTab.getElementsByClassName('cost')[0].innerHTML = numberWithDot(order.cost) + ' VND';
      if (order.excuted == true) {
         foodTab.getElementsByClassName('excute')[0].classList.add('done');
      }

      foodTab.getElementsByClassName('mark')[0].addEventListener('click', () => {
         if (order.excuted == false) {
            window.alert('food is not excuted')
         }
         else {
            order.served = !order.served;
            foodTab.getElementsByClassName('serve')[0].classList.toggle('done');
         }
         popuptext.classList.toggle('show');
      })

      foodTab.getElementsByClassName('cancle')[0].addEventListener('click', () => {
         if (order.excuted == true) {
            window.alert('food was excuted')
         }
         else {
            order.cancle = true;
            foodTab.style.display = 'none';
         }
         popuptext.classList.toggle('show');
      })

      foodTab.getElementsByClassName('food')[0].addEventListener('click', () => {
         popuptext.classList.toggle('show');
      })

      foodContainer.appendChild(foodTab);
   });
}

function displayFoodOrBill(fooddis, billdis) {
   foodContainer.style.display = fooddis;
   billContainer.style.display = billdis;
}

function createBill(orderList) {
   let tbody = billlist.getElementsByTagName('tbody')[0];
   if (tbody) tbody.remove();
   tbody = document.createElement('tbody');

   let th = createTrBill('th', 'Tên món', 'Giá', 'Số lượng', 'Thành tiền (VND)');
   tbody.appendChild(th);

   let totalCost = 0;
   orderList.forEach(order => {
      if (order.excuted) {
         console.log('get')
         let tr = tbody.getElementsByClassName('bill' + order.id)[0]
         if (!tr) {
            let tr = createTrBill('td', order.name, numberWithDot(order.cost), 1, numberWithDot(order.cost));
            tr.classList.add('bill' + order.id)
            tbody.appendChild(tr);
         }
         else {
            let sl = tr.getElementsByClassName('sl')[0];
            let total = tr.getElementsByClassName('total')[0];

            sl.innerHTML = parseInt(sl.innerHTML) + 1;
            total.innerHTML = numberWithDot(parseInt(sl.innerHTML) * order.cost);
         }

         totalCost += order.cost;
      }
   })

   allTotal.innerHTML = numberWithDot(totalCost) + ' VND';
   billlist.appendChild(tbody);

}

function createTrBill(tcol, name, cost, sl, total) {
   let tr = document.createElement('tr');
   let namet = document.createElement(tcol);
   let costt = document.createElement(tcol);
   let slt = document.createElement(tcol);
   let totalt = document.createElement(tcol);

   namet.innerHTML = name;
   costt.innerHTML = cost;
   slt.innerHTML = sl;
   if (tcol == 'td') slt.classList.add('sl');
   totalt.innerHTML = total;
   if (tcol == 'td') totalt.classList.add('total');

   tr.appendChild(namet);
   tr.appendChild(costt);
   tr.appendChild(slt);
   tr.appendChild(totalt);

   console.log('create')
   return tr;
}