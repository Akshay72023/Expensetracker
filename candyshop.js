const myForm = document.querySelector('#my-form');
myForm.addEventListener('submit', onSubmit);
    function onSubmit(e) {
        e.preventDefault();
        const candyname=e.target.Candyname.value;
        const desc=e.target.Description.value;
        const price=e.target.Price.value;
        const quanity=e.target.Quantity.value;
        let myobject={
            candyname,
            desc,
            price,
            quanity
        };
        axios
        .post('https://crudcrud.com/api/43c851235b9648b8b9cfb07c66717b76/candyshop',myobject)
        .then((response)=>{
            showUserDetails(response.data);
        })
        .catch(err=>{
            document.body.innerHTML=document.body.innerHTML + "<h4 style='text-align: center;'> Something went wrong </h4>"
            console.log(err);
        })
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/43c851235b9648b8b9cfb07c66717b76/candyshop")
          .then((response)=>{
                for(var i=0;i<response.data.length;i++){
                  showUserDetails(response.data[i])
                }
          })
          .catch((err)=>{
            console.log(err);
          })
})


 function showUserDetails(user){
    const parentEle=document.querySelector('.items');
    const childEle=`<li id=${user._id}> ${user.candyname}-${user.desc}-${user.price}-${user.quanity}
    <button onclick=buy1('${user._id}','${user.candyname}','${user.desc}','${user.price}','${user.quanity}')>Buy1</button>
    <button onclick=buy2('${user._id}','${user.candyname}','${user.desc}','${user.price}','${user.quanity}')>Buy2</button>
    <button onclick=buy3('${user._id}','${user.candyname}','${user.desc}','${user.price}','${user.quanity}')>Buy3</button>
    </li>`
    parentEle.innerHTML= parentEle.innerHTML+childEle;
}

function deleteUser(userid){
    axios.delete(`https://crudcrud.com/api/43c851235b9648b8b9cfb07c66717b76/candyshop/${userid}`)
    .then(response=>{
      removeUserFromScreen(userid)
    })
    .catch(err=>console.log(err))
}

function removeUserFromScreen(userid){
    const parentNode=document.querySelector('.items')
    const childNodeToBeDeleted=document.getElementById(userid)
    if(childNodeToBeDeleted){
      parentNode.removeChild(childNodeToBeDeleted)
    }
}


 function buy1(id,c,d,p,q){
    if(q<=0){
        document.body.innerHTML=document.body.innerHTML + "<h4 class='a' style='text-align: center;'>Sorry no candies</h4>";
        var addedElement = document.querySelector('.a');
        setTimeout(function() {
            if (addedElement) {
                addedElement.remove();
            }
        }, 2000);
        deleteUser(id);
    }
    else{
        document.getElementById('Candyname').value=c;
        document.getElementById('Description').value=d;
        document.getElementById('Price').value=p;
        document.getElementById('Quantity').value=q-1;
        deleteUser(id);
    }
        
 }

 function buy2(id,c,d,p,q){
    if(q<2){
        document.body.innerHTML=document.body.innerHTML + "<h4 class='a' style='text-align: center;'> Only 1 candy left</h4>"
        var addedElement = document.querySelector('.a');
        setTimeout(function() {
            if (addedElement) {
                addedElement.remove();
            }
        }, 2000);
    }
    else{
    document.getElementById('Candyname').value=c;
    document.getElementById('Description').value=d;
    document.getElementById('Price').value=p;
    document.getElementById('Quantity').value=q-2;
    deleteUser(id);
    }
 }

 function buy3(id,c,d,p,q){
    if(q<3){
        document.body.innerHTML=document.body.innerHTML + "<h4 class='a'style='text-align: center;'> Only 2 candies left</h4>"
        var addedElement = document.querySelector('.a');
        setTimeout(function() {
            if (addedElement) {
                addedElement.remove();
            }
        }, 2000);
    }
    else{
    document.getElementById('Candyname').value=c;
    document.getElementById('Description').value=d;
    document.getElementById('Price').value=p;
    document.getElementById('Quantity').value=q-3;
    deleteUser(id);
    }
    
 }

 