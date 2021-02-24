const stagebucom = 'https://bu-com.stg.liaisoncas.com/applicant-ux/#/login';
const integrationbucom = 'https://bu-com.int.liaisoncas.com/applicant-ux/#/login';

const stageaacomas = 'https://aacomas.stg.liaisoncas.com/applicant-ux/#/login';
const integrationaacomas = 'https://aacomas.int.liaisoncas.com/applicant-ux/#/login';

const ecosystemUrl = 'https://Cas.applicant-EcoName.litest.io/applicant-ux/#/login';

var CASURLToLoad, EcoURL;


function getURL(CAS_ENV, CASName, EcoSystemName) {
     const URL = CAS_ENV+CASName
     if(CAS_ENV == 'ecosystem')
     EcoURL = ecosystemUrl.replace('EcoName',EcoSystemName).replace('Cas',CASName)
     console.log("URL is which to be passed "+URL);

    switch(URL){
        case "stagebucom":             console.log(stagebucom)    
                                       return stagebucom;
                                       break;
        case "integrationbucom":       console.log(integrationbucom)    
                                       return integrationbucom;
                                       break;
        case "ecosystembucom":         console.log(EcoURL)    
                                       return EcoURL;
                                       break;
        case "stageaacomas":           console.log(stageaacomas)    
                                       return stageaacomas;
                                       break;
        case "integrationaacomas":     console.log(integrationaacomas)    
                                       return integrationaacomas;
                                       break;
        case "ecosystemaacomas":       console.log(EcoURL)    
                                       return EcoURL;
                                       break;
        
    }
    
}

module.exports = { getURL};