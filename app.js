const curl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const amount = document.querySelector("#amount");
const fsel = document.querySelector(".from select");
const tsel = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
  }
  select.append(newOption);
}

select.addEventListener("change", (evt) => {
changeFlag(evt.target);
});
}

async function convert(){
  let amountvalue = amount.value;
  if(amountvalue=="" || amountvalue < 1){
    amountvalue = 1;
    amount.value = "1";
  }
  const url = `${curl}/${fsel.value.toLowerCase()}/${tsel.value.toLowerCase()}.json`;
  const res = await fetch(url);
  const data = await res.json();

  const rate = data[tsel.value.toLowerCase()];

  const finalamount = amountvalue * rate;
  
  let n = finalamount.toFixed(3);
  msg.innerHTML = `${amountvalue} ${fsel.value} = ${n} ${tsel.value}`
}

btn.addEventListener("click",(e)=>{
  e.preventDefault();
  convert();
})

function changeFlag(evt){
  let code = evt.value;
  let countrycode = countryList[code] ;
  let imgurl = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let flagimg = evt.parentElement.querySelector("img")
  flagimg.src = imgurl;
};