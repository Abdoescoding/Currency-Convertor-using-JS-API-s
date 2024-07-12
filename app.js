let BASE_URL = `https://v6.exchangerate-api.com/v6/${myApiCode}/latest/`;

const fetchData = async (URL , toCountry)=>{

   let response = await fetch(URL);
   let a = await response.json();
   console.log(a.conversion_rates[toCountry]);
   let b = a.conversion_rates[toCountry]
   return b;
}

let textbox = document.querySelector("#textbox");

let myCLists = document.querySelectorAll(".selector");

let exchangeRateButton = document.querySelector(".gERate");

let fromCountryCode = "USD";
let toCountryCode = "PKR";

let toPath = document.querySelector(".to").querySelector("select");
let fromPath = document.querySelector(".from").querySelector("select");



const updateFlag = (element)=>{
   let curCountry = element.value;
   let countryCode = countryList[curCountry];
   let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   element.parentElement.querySelector("img").src = newsrc;
}

myCLists.forEach(select => {
   
   for (const countryCode in countryList) {
      let myElement = document.createElement("option");
      myElement.value= countryCode;
      myElement.innerText= countryCode;
         select.append(myElement);

         if(select.parentElement.parentElement.className=="from" && countryCode == "PKR"){
            myElement.selected = countryCode;
         }

         if(select.parentElement.parentElement.className=="to" && countryCode == "INR"){
            myElement.selected = countryCode;
         }
  
      select.addEventListener("change" , (evt)=>{

         updateFlag(evt.target);
      })
  
  }


});

exchangeRateButton.addEventListener("click" , (evt)=>{
   evt.preventDefault();
  updateExchangeRate();


});

const updateExchangeRate = async ()=>{

   let amount = textbox.value;
   if(amount === "" || amount <=0)
   {
      textbox.value="1";
      amount = 1;
   }
   finder();

   let updatedURL = `${BASE_URL}${fromCountryCode}`
   let response = await fetch(updatedURL);
   let a = await response.json();
   let exRate = a.conversion_rates[toCountryCode];
   
   let finalRate =  amount * exRate;
   
   document.querySelector(".submit p").innerText= `${amount} ${fromCountryCode} = ${finalRate.toFixed(2)} ${toCountryCode}`;
   


}

const finder = ()=>{
   
   fromCountryCode = fromPath.value;


   toCountryCode = toPath.value;
   
}

window.addEventListener("load" , ()=>{
   updateExchangeRate();
})

document.querySelector("#switch").addEventListener("click" , ()=>{
   temp = fromPath.value;
   fromPath.value = toPath.value;
   toPath.value = temp;
   updateFlag(document.querySelector(".from select"));
   updateFlag(document.querySelector(".to select"));
   updateExchangeRate();
})
