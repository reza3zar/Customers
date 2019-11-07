import { City } from "../Common/city";
import { Country } from "../Common/country";
import { Gender } from "../Common/Gender";
import * as moment from 'jalali-moment';

export class PersonalDetails{


public  firstName : string ;


public  lastName : string;



public  gender : Gender ;


public  birthDate : string ;
public  persianBirthBirthDate : string ;


 
// private _birthDate: string  ;
// get birthDate(): string {
//     return this._birthDate;
// }
// set birthDate(value: string) {
//     this._birthDate = value;
// }

// private _persianBirthDate: string  ;
// get persianBirthBirthDate(): string {
//     return this._persianBirthDate;
// }
// set persianBirthBirthDate(value: string) {
//     this._persianBirthDate = value;
// }


public  fatherName : string ;



public  identificationNumber : string ;


public  registerCity : City ;


public  nationality : Country;


public  serial : string ;

public  nationalCode : string ;

public letterSeries:string;

public digitalSeries:string;


}
