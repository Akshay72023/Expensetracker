const myForm = document.querySelector('#my-form');
myForm.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    const expenseAmount= e.target.expenseAmount.value;
    const expenseDescription=e.target.expenseDescription.value;
    const expenseCategory=e.target.expenseCategory.value;
    let myobject={
        expenseAmount,
        expenseDescription,
        expenseCategory
      
    };
    let myobject_serialized=JSON.stringify(myobject);
    localStorage.setItem(myobject.expenseDescription,myobject_serialized);

    //Displaying the userdetails
    const parentEle=document.querySelector('.items');
    const childEle=document.createElement('li');
    childEle.textContent= myobject.expenseAmount + '-' + myobject.expenseDescription + '-' +myobject.expenseCategory;
    parentEle.appendChild(childEle);

    //Adding delete button and delteting from local storage
    const deleteButton=document.createElement('input')
              deleteButton.type='button'
              deleteButton.value='Delete Expense'
              childEle.appendChild(deleteButton)
              deleteButton.onclick = () =>{
                  localStorage.removeItem(myobject.expenseDescription)
                  parentEle.removeChild(childEle)
                }

    //Adding edit button and deleting from local storage and 
    const editButton=document.createElement('input')
              editButton.type='button'
              editButton.value='Edit Expense'
              childEle.appendChild(editButton)
              editButton.onclick = () =>{
                  localStorage.removeItem(myobject.expenseDescription)
                  parentEle.removeChild(childEle)
                  document.querySelector('#expenseAmount').value=myobject.expenseAmount
                  document.querySelector('#expenseDescription').value=myobject.expenseDescription
                  document.querySelector('#expenseCategory').value=myobject.expenseCategory
                  }
}