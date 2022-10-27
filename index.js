let todoDOM = document.querySelector("#list")
let inputDOM = document.querySelector("#taskInput")
let buttonDOM = document.querySelector("#liveToastBtn")
let successAlertDOM = document.querySelector("#successToast")
let dangerAlertDOM = document.querySelector("#dangerToast")



buttonDOM.addEventListener('click', addItem)
todoDOM.addEventListener('click',Check)
document.addEventListener('DOMContentLoaded',GetLocalStorage)




//* Add Item to List
function addItem() {

    let isEmpty = text => text.trim().length > 0 //? Trim removing spaces
    console.log(isEmpty(inputDOM.value))

    if (isEmpty(inputDOM.value)) {

         //? save localstorage
        SaveLocalStorage(inputDOM.value)

        //? create a li element
        const todoLi = document.createElement('li')
        todoLi.innerHTML = inputDOM.value

        //? append list
        todoDOM.append(todoLi)

        //? clear input
        inputDOM.value = ''

        //? create a remove button
        const todoRemoveButton = document.createElement('i')
        todoRemoveButton.classList.add('bi', 'bi-trash3-fill', 'float-right', 'mr-4')

        //? append list
        todoLi.append(todoRemoveButton)

        //? show success alert
        ToastAlertSuccess();


    }else{

        //? show danger alert
        ToastAlertDanger();

    }

}

//* Checked Item to List
function Check(e){
    const item = e.target;
    //? If click remove button -> remove li element
    if(item.classList[0] == 'bi'){
        const el = item.parentElement;
        DeleteLocalStorage(el.innerText) 
        el.classList.add('animation')
        el.addEventListener("transitionend",function(){
            el.remove()
        })
        
    }
    
    else{
        item.classList.toggle('checked')
    }
}

//* Save Items to Storage
function SaveLocalStorage(item){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }

    items.push(item);
    localStorage.setItem('listItem',JSON.stringify(items))
}

//* Delete Items to Storage
function DeleteLocalStorage(item){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }
    items.splice(items.indexOf(item),1) //* delete item

    localStorage.setItem('listItem', JSON.stringify(items)) //* 
}

//* Get Items Storage
function GetLocalStorage(){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }

    items.forEach((item)=>{
        //? create a li element
        const todoLi = document.createElement('li')
        todoLi.innerHTML = item

        //? append list
        todoDOM.append(todoLi)

        //? clear input
        inputDOM.value = ''

        //? create a remove button
        const todoRemoveButton = document.createElement('i')
        todoRemoveButton.classList.add('bi', 'bi-trash3-fill', 'float-right', 'mr-4')

        //? append list
        todoLi.append(todoRemoveButton)
    })
}

//* Success Alerts
function ToastAlertSuccess(){
    let successToast = new bootstrap.Toast(successAlertDOM, alertOptions)
    successToast.show();
}

//* Danger Alerts
function ToastAlertDanger(){
    let dangerToast = new bootstrap.Toast(dangerAlertDOM, alertOptions)
    dangerToast.show();
}


//! alert options

let alertOptions = {
    animation: true,
    delay: 3000,
}