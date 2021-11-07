let strxml = `<recordSet>
<recordSetData>
<company>FaithLife Financial</company>
<product>Term 10 [NT]</product>
<pClass>HealthMatch Ultra</pClass>
<risk>Super Preferred</risk>
<paymentMode>Annual</paymentMode>
<premiumText>$570.00</premiumText>
<premium>570.00</premium>
<waiverOfPremiumText>$0.00</waiverOfPremiumText>
<waiverOfPremium>0.00</waiverOfPremium>
<legend>QA n/a</legend>
</recordSetData>
<recordSetData>
<company>Insurtech Financial</company>
<product>Term 10 [NT]</product>
<pClass>HealthMatch Ultra</pClass>
<risk>Super Preferred</risk>
<paymentMode>Annual</paymentMode>
<premiumText>$500.00</premiumText>
<premium>500.00</premium>
<waiverOfPremiumText>$0.00</waiverOfPremiumText>
<waiverOfPremium>0.00</waiverOfPremium>
<legend>QA n/a</legend>
</recordSetData>
</recordSet>`;



function xml2json(srcDOM) {
  let children = [...srcDOM.children];
  
  // base case for recursion. 
  if (!children.length) {
    return srcDOM.innerHTML
  }
  
  // initializing object to be returned. 
  let jsonResult = {};
  
  for (let child of children) {
    
    // checking is child has siblings of same name. 
    let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

    // if child is array, save the values as array, else as strings. 
    if (childIsArray) {
      if (jsonResult[child.nodeName] === undefined) {
        jsonResult[child.nodeName] = [xml2json(child)];
      } else {
        jsonResult[child.nodeName].push(xml2json(child));
      }
    } else {
      jsonResult[child.nodeName] = xml2json(child);
    }
  }
  
  return jsonResult;
}

const parser = new DOMParser();  // initialize dom parser
const srcDOM = parser.parseFromString(strxml, "application/xml");
console.log(srcDOM)
// console.log(xml2json(srcDOM));
displayDetails(xml2json(srcDOM))



//display it on the DOM function//
function displayDetails(x) {
  //accessing the array that we need//
  let jsonResults=x ["recordSet"]["recordSetData"];
  console.log(jsonResults)

  let results=document.getElementById("results")


  for (let i=0; i<jsonResults.length; i++) {
    // console.log(jsonResults)

    let generalDiv=document.createElement("div")
    generalDiv.id="insurance_results"

    let pClass=document.createElement("p");
    pClass.textContent = jsonResults[i]["pClass"];

    let companyName=document.createElement("p");
    companyName.textContent = jsonResults[i]["company"]


    let paymentMode=document.createElement("p");
    paymentMode.textContent = jsonResults[i]["paymentMode"];

    let premiumText=document.createElement("p");
    premiumText.textContent = jsonResults[i]["premiumText"];

    let btn=document.createElement("button");
    btn.classList="btn";
    btn.textContent="SELECT"


    generalDiv.append(companyName,pClass,paymentMode,premiumText,btn
      )

    results.append(generalDiv)
    console.log(results)
    
  }

 
}