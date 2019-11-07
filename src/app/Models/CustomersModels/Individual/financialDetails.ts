import Market from "../Common/market";

export class FinancialDetails{


public   ownerShipValue  : number  

public  averageSalaryPerMonth : number ;


public  markets : Array<Market> ;


public  isSpotMarket : boolean =false ;

public  isFutureMarket : boolean=false ;




public  predictContractValueINAuctionMarket : number ;


public  predictContractValueINFutureMarket : number ;


}
