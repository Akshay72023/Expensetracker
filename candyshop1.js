const myForm = document.querySelector('#my-form');
myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    const candyname = e.target.Candyname.value;
    const desc = e.target.Description.value;
    const price = e.target.Price.value;
    const quantity = e.target.Quantity.value;
    let myobject = {
        candyname,
        desc,
        price,
        quantity
    };
    try {
        const response = await axios.post('https://crudcrud.com/api/0ffca2e1ab674d91a8335e9ce864a4ad/candyshop', myobject);
        showUserDetails(response.data);
    } catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<h4 style='text-align: center;'> Something went wrong </h4>"
        console.error(err);
    }
}

function showUserDetails(user) {
    const parentEle = document.querySelector('.items');
    const childEle = `<li id=${user._id}> ${user.candyname}-${user.desc}-${user.price}-${user.quantity}
    <button onclick=buy1('${user._id}','${user.candyname}','${user.desc}','${user.price}','${user.quantity}')>Buy1</button>
    <button onclick=buy2('${user._id}','${user.candyname}','${user.desc}','${user.price}','${user.quantity}')>Buy2</button>
    <button onclick=buy3('${user._id}','${user.candyname}','${user.desc}','${user.price}','${user.quantity}')>Buy3</button>
    </li>`;
    parentEle.innerHTML = parentEle.innerHTML + childEle;
}

async function deleteUser(userid) {
    try {
        await axios.delete(`https://crudcrud.com/api/0ffca2e1ab674d91a8335e9ce864a4ad/candyshop/${userid}`);
        removeUserFromScreen(userid);
    } catch (err) {
        console.error(err);
    }
}

function removeUserFromScreen(userid) {
    const parentNode = document.querySelector('.items');
    const childNodeToBeDeleted = document.getElementById(userid);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}

async function buy1(id, c, d, p, q) {
    if (q <= 0) {
        document.body.innerHTML = document.body.innerHTML + "<h4 class='a' style='text-align: center;'>Sorry no candies</h4>";
        var addedElement = document.querySelector('.a');
        setTimeout(function () {
            if (addedElement) {
                addedElement.remove();
            }
        }, 2000);
       deleteUser(id);
    } else {
        // document.getElementById('Candyname').value = c;
        // document.getElementById('Description').value = d;
        // document.getElementById('Price').value = p;
        // document.getElementById('Quantity').value = q - 1;
        // deleteUser(id);
        const updatedData = {candyname:c,desc:d,price:p,quantity: q - 1};
        removeUserFromScreen(id);
        await updateQuantity(id, updatedData);
    }
}


async function buy2(id, c, d, p, q) {
    if(q<=0){
        
            document.body.innerHTML = document.body.innerHTML + "<h4 class='a' style='text-align: center;'>Sorry no candies</h4>";
            var addedElement = document.querySelector('.a');
            setTimeout(function () {
                if (addedElement) {
                    addedElement.remove();
                }
            }, 2000);
            deleteUser(id);
    }
    else if (q < 2) {
        document.body.innerHTML = document.body.innerHTML + "<h4 class='a' style='text-align: center;'> Only 1 candy left</h4>"
        var addedElement = document.querySelector('.a');
        setTimeout(function () {
            if (addedElement) {
                addedElement.remove();
            }
        }, 2000);
    } else {
        // document.getElementById('Candyname').value = c;
        // document.getElementById('Description').value = d;
        // document.getElementById('Price').value = p;
        // document.getElementById('Quantity').value = q - 2;
        // deleteUser(id);
        const updatedData = {candyname:c,desc:d,price:p,quantity: q - 2};
        removeUserFromScreen(id);
        await updateQuantity(id, updatedData);
    }
}

async function buy3(id, c, d, p, q) {
    if (q <= 0) {
        document.body.innerHTML = document.body.innerHTML + "<h4 class='a' style='text-align: center;'>Sorry no candies</h4>";
        var addedElement = document.querySelector('.a');
        setTimeout(function () {
            if (addedElement) {
                addedElement.remove();
            }
        }, 2000);
        deleteUser(id);
    }
    else if (q < 3 && q==2) {
        document.body.innerHTML = document.body.innerHTML + "<h4 class='a'style='text-align: center;'> Only 2 candies left</h4>"
        var addedElement = document.querySelector('.a');
        setTimeout(function () {
            if (addedElement) {
                addedElement.remove();
            }
        }, 2000);
    }
    else if(q<2 && q==1) {
        document.body.innerHTML = document.body.innerHTML + "<h4 class='a'style='text-align: center;'> Only 1 candies left</h4>"
        var addedElement = document.querySelector('.a');
        setTimeout(function () {
            if (addedElement) {
                addedElement.remove();
            }
        }, 2000);  
    }else {
        // document.getElementById('Candyname').value = c;
        // document.getElementById('Description').value = d;
        // document.getElementById('Price').value = p;
        // document.getElementById('Quantity').value = q - 3;
        // deleteUser(id);
        const updatedData = {candyname:c,desc:d,price:p,quantity: q - 3};
        removeUserFromScreen(id);
        await updateQuantity(id, updatedData);
    }
}


async function updateQuantity(id, updatedData) {
    try {
      await axios.put(`https://crudcrud.com/api/0ffca2e1ab674d91a8335e9ce864a4ad/candyshop/${id}`, updatedData);
      const response= await axios.get(`https://crudcrud.com/api/0ffca2e1ab674d91a8335e9ce864a4ad/candyshop/${id}`);
      showUserDetails(response.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }


  window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("https://crudcrud.com/api/0ffca2e1ab674d91a8335e9ce864a4ad/candyshop");
        response.data.forEach(user => showUserDetails(user));
    } catch (err) {
        console.error(err);
    }
});