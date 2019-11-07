 

// let basUrl='https://sso.ime.co.ir/';
//  export const AppUrl = {

//     'logIn':basUrl+'api/Account/Login',
//     'logOut':basUrl+'api/Account/Logout',
//     'captchaKey':basUrl+'api/captcha-key?',
//     'captchaImg':basUrl+'api/captcha-data?key=',
// };

//  let basUrl='http://172.16.56.77:10100/api';
let basUrl='http://172.16.2.89:10100/api';

export const AppUrl = {
  'products': '/api/products',
  'reviews': '/api/reviews',
  'thumbnails': '/api/thumbnails',
  'categories': basUrl+'/ComponentModel',
  'wishlist': '/api/wishlist',
  'shoppingCart': '/api/shoppingCart',
  'states': '/api/states',
  'taxes': '/api/taxes',
  'users': '/api/users',
  'usersInfo': '/api/usersInfo',
  'productsCompare': '/api/productsCompare',
  'brands':'/api/brands',
  'customers':basUrl+'/common/customer',
  'credit':basUrl+'/credit',
  'broker':basUrl+'/common/broker',
  'categoryCredit':basUrl+'/credit-category',


  'bank':basUrl+'/common/banks',
  'bankAccountTypes':basUrl+'/common/bankAccountTypes',
  'Cities': basUrl+'/common/Cities',
  'Countries': basUrl+'/common/Countries',
  'Educations': basUrl+'/common/Educationdegrees',
  'States': basUrl+'/common/States',
  'Genders': basUrl+'/common/Genders',
  'login':basUrl+'/account',
   'customerType':basUrl+'/common/customerTypes',
   'addressType':basUrl+'/common/addressTypes',
   'brokerRequests':basUrl+'/broker/requests',
   'identityType':basUrl+'/common/identityTypes',
    'inquiryTaxpaer':basUrl+'/Inquiries/TaxPayerInfo/meta/',
    'inquirylegalInfo':basUrl+'/inquiries/legalPersoninfo/meta/',
    'inquiryDepository':basUrl+'/inquiries/depositoryinfo/meta/',
    'inquiryfidaLegalPerson':basUrl+'/Inquiries/ForeignersInfo/LegalPerson/meta/',
    'inquiryfidanaturalPerson':basUrl+'/Inquiries/ForeignersInfo/NaturalPerson/meta/',
    'verifyCellInfoIndividualPerson':basUrl+'/Inquiries/VerifyCellInfo/IndividualPerson/meta/',
    'verifyCellInfoLegalPerson':basUrl+'/Inquiries/VerifyCellInfo/LegalPerson/meta/',
     'legalTypes':basUrl+'/common/FirmTypes',
     'directorateAuthoritiesTypes':basUrl+'/common/DirectorateAuthorities',
     'freeZones':basUrl+'/common/FreeZones',
     'measurementUnits':basUrl+'/common/MeasurementUnits',
     'positions':basUrl+'/common/Positions',
     'zonesOfActivity':basUrl+'/common/ZoneOfActivities',
    'chekIsExistExternalId':basUrl+'/exchange/customers/exists',
    'inquiryDepositoryByNationalID':basUrl+'/Inquiries/Warehouseinfo/meta/',
    'behinyabinfo':basUrl+'/Inquiries/behinyabinfo/meta/',
    'customerInfo':basUrl+'/Inquiries/tsetmc/customerinfo/meta/',
    'requestsOfBrokers':basUrl+'/exchange/Requests/Theirs/brief',
    'acceptRequest':basUrl+'/exchange/Requests/Theirs/accept/',
    'rejectRequest':basUrl+'/exchange/Requests/Theirs/reject/',
    'supervisorRequests':basUrl+'/exchange/Responses/Theirs/brief',
    'supervisorAcceptRequest':basUrl+'/exchange/Responses/Theirs/finalize/',
    'supervisorRejectRequest':basUrl+'/exchange/Responses/Theirs/delete/',
    'historyOfrejectRequest':basUrl+'/exchange/Reports/History/RejectResponses/'



};

