
let usersList = document.querySelector(".users-list")
let postList = document.querySelector(".post-list")
let commentList = document.querySelector(".comment-list")

let elForm = document.querySelector(".submit-form")

let elModalWrapper =document.querySelector(".modal-wrapper")
let elModal =document.querySelector(".modal")

const getData = async(URL)=>{
  const res =await fetch(URL)
  const data =await res.json()
  return data
}


usersList.innerHTML="Loading..."

getData("https://jsonplaceholder.typicode.com/users").then(res=>{
   getUsers(res,usersList)
})

function getUsers(arr,list){
  list.innerHTML=""
  arr.map(item=>{
    let elItem =document.createElement("li")
    elItem.className=`bg-orange-400 p-3 rounded-[20px]  `
    elItem.innerHTML=`
    <p>
       <span class="font-bold">ID</span>: ${item.id}
    </p>
    <p>
       <span class="font-bold">Name</span>: ${item.name}
    </p>
    <p>
       <span class="font-bold">Username</span>: ${item.username}
    </p>
    <p>
       <span class="font-bold">Phone</span>: ${item.phone.split(" ")[0]}
    </p>
    <p>
       <span class="font-bold">Email</span>: ${item.email}
    </p>
    <div class="mt-3">
       <button onclick="userBtnClick(${item.id})" class="w-[100px] p-2 rounded-[10px] bg-teal-500 text-white ">Show Post</button>
       <button onclick="submitUser(${item.id})" class="w-[100px] p-2 rounded-[10px] bg-red-500 text-white ">Submit</button>
    </div>
    `
    list.appendChild(elItem)
  })
}

// Telegram API 

const CHAT_ID ="-1002090591792"
const TOKEN = "7103130825:AAERUbzNr1ab8XF6eNeCmMg7hr4nTAYKHYk"
const URL = `https://api.telegram.org/bot${ TOKEN }/sendMessage`


function submitUser(id){
   elModalWrapper.classList.add("open-modal")

   getData(`https://jsonplaceholder.typicode.com/users/${id}`) 
   .then(res=>{
      elModal.innerHTML=`
         <form class="flex flex-col gap-5 submit-form">
              <label class="flex w-[80%] mx-auto flex-col font-bold">
                   <span>User name</span>
                   <input value="${res.name}" class="   p-2 rounded-[10px]" placeholder="User name" name="userName" required autocomplete="off" type="text"/>
              </label>
              <label class="flex w-[80%] mx-auto flex-col font-bold">
              <span>User Phone</span>
                   <input value="${res.phone}" class="   p-2 rounded-[10px]" placeholder="User Phone" name="userPhone" required autocomplete="off" outline-none  type="tel"/>
              </label>
              <button type="submit" class="bg-teal-500 mt-5 p-3 rounded-[10px] font-bold text-white w-[50%] mx-auto">Submit</button>
         </form>
         `
         let elForm = document.querySelector(".submit-form")  
           elForm.addEventListener("submit", function(e){
            e.preventDefault()
            let message =`<b>Order Site:</b>`
            message +=` <b> ID: ${id}</b>`
            message +=` <b> User Name: ${e.target.userName.value}</b>`
            message +=` <b> User Phone: ${e.target.userPhone.value}</b>`
        console.log(message);

            axios.post(URL,{
               chat_id :CHAT_ID,
               parse_mode:"html",
               text:message
              
            })
            .then(res=> {
               elModalWrapper.classList.remove("open-modal")
            })
           })
   })
      

}



// elForm.addEventListener("submit",function(evt){
//    evt.preventDefault()

//    let message =`<b>Order Site</b>/n`
//    message +=` <b> User Name: ${evt.target.nameUser.value}</b>/n`
//    message +=` <b> User Phone: ${evt.target.namephone.valuee}</b>/n`

  
//    axios.post(URL,{
//       chat_id :CHAT_ID,
//       parse_mode:"html",
//       text:message
 
//    })
  
//    .then(res=> {
//       elModalWrapper.classList.remove("open-modal")
//       console.log(res);
//    })
// })








function userBtnClick(id){
   getData(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(res=>{
      getPosts(res,postList)
   })
}





function getPosts(arr,list){
   list.innerHTML=""
   arr.map(item=>{
     let elItem =document.createElement("li")
     elItem.className=`bg-orange-400 p-3 rounded-[20px]  `
     elItem.innerHTML=`
     <p>
        <span class="font-bold">ID</span>: ${item.id}
     </p>
     <p>
        <span class="font-bold">User ID</span>: ${item.userId}
     </p>
     <p>
        <span class="font-bold">Title</span>: ${item.title}
     </p>
     <p>
        <span class="font-bold">Body</span>: ${item.body}
     </p>
     <div class="mt-3">
        <button onclick="postBtnClick(${item.id})" class="w-[150px] p-2 rounded-[10px] bg-teal-500 text-white text-[14px] ">Show Comment</button>
     </div>
     `
     list.appendChild(elItem)
   })
 }


//  comment start 

function postBtnClick(id){
   getData(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(res=>{
      getComment(res,commentList)
   })
}

function getComment(arr,list){
   list.innerHTML=""
   arr.map(item=>{
     let elItem =document.createElement("li")
     elItem.className=`bg-orange-400 p-3 rounded-[20px]  `
     elItem.innerHTML=`
     <p>
        <span class="font-bold">ID</span>: ${item.id}
     </p>
     <p>
        <span class="font-bold">Post ID</span>: ${item.postId}
     </p>
     <p>
        <span class="font-bold">Name</span>: ${item.name}
     </p>
     <p>
        <span class="font-bold">Email</span>: ${item.email}
     </p>
     <p>
        <span class="font-bold">Body</span>: ${item.body}
     </p>
     `
     list.appendChild(elItem)
   })
 }
//  comment end

elModalWrapper.addEventListener("click",function(e){
   if(e.target.id == "modal-wrapper"){
      elModalWrapper.classList.remove("open-modal")
   }
})

