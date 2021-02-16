const stageBuCom = 'https://bu-com.stg.liaisoncas.com/applicant-ux/#/login';
const integrationBuCom = 'https://bu-com.int.liaisoncas.com/applicant-ux/#/login';
const ecoSystemBuCom = 'https://bu-com.applicant-EcoName.litest.io/applicant-ux/#/login';
var CASURLToLoad, EcoURL;


function getURL(CAS_ENV, CASName, EcoSystemName) {
     const URL = CAS_ENV+CASName
     if(CAS_ENV == 'ecoSystem')
     EcoURL = ecoSystemBuCom.replace('EcoName',EcoSystemName)
     console.log("URL is which to be passed "+URL)

    switch(URL){
        case "stageBuCom":
            console.log(stageBuCom)    
        return stageBuCom;
        break;
        case "integrationBuCom":
            console.log(integrationBuCom)    
        return integrationBuCom;
        break;
        case "ecoSystemBuCom":
            console.log(EcoURL)    
        return EcoURL;
        break;
        
    }
    
}

module.exports = { getURL};