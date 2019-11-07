import { ɵConsole, Inject } from '@angular/core';
import { LoginManagerService } from './../Services/login-manager.service';
import { AppUrl } from './../Services/Url';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginInfo } from '../Models/LoginInfo';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

 
 

  captchaKeySubscriber:Subscription;
  captchaSubscriber:Subscription;
  loginSubscriber:Subscription;


  imgCaptchaIsloadedState:boolean;
  public url=AppUrl;
  constructor( private loginService:LoginManagerService,private toastrService: NbToastrService,
    private router: Router, private cookieService: CookieService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,){
  
    }
 

    setLoginInformationFromCooki(){
      if(this.cookieService.check('loginInformationRememberMe') && this.cookieService.get('loginInformationRememberMe')=='true' ){
        this.logininformation.userName= this.cookieService.get('loginInformationUserName');
        this.logininformation.password= this.cookieService.get('loginInformationPassword');
        this.logininformation.rememberMe=true;
       }
    }
  
 
    form:FormGroup;
    ngOnInit() {
      this.logininformation=new LoginInfo();
      this.setLoginInformationFromCooki();
      this.keyPressUserName();
      this.keyPressPassword();
      



    this.form=new FormGroup({    userName: new FormControl(this.logininformation.userName,Validators.required),
    password: new FormControl(this.logininformation.password,Validators.required),
    remeberState: new FormControl(this.logininformation.rememberMe),
    captchaValue: new FormControl(this.logininformation.captchaCode,Validators.required),});
    
    this.refreshChaptcha();

  }

  getChaptchaKey(randomTimeSpan){
  
 
  // this.captchaKeySubscriber=  this.loginService.getChaptchaKey(randomTimeSpan).subscribe(val=>{
  //   let captchaKey=val['Code'];
  //   this.logininformation.captchaKey=captchaKey;
  //   this.imgCaptchaIsloadedState=true;

  //     this.getCaptchaImage(captchaKey);
  //   }) 
  }

  imgCaptcha:any='';
  getCaptchaImage(keyValue:string){
  // this.captchaSubscriber=  this.loginService.getChaptchaImage(keyValue).subscribe(result=>{
  //     this.imgCaptcha=(result);
  //   })
  }

  refreshChaptcha(){
    // throw new Error('Valid token not returned');
    // 

    this.imgCaptchaIsloadedState=false;
    var datenow=new Date();
    let randomTimeSpan=Math.floor(Math.random() * 6000) + 15904644+datenow.getMilliseconds()  ;
    this.getChaptchaKey(randomTimeSpan);
  }


  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position:  NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';

    this.toastrService.show(
      body,
      ` ${titleContent}`,
      config);
  }

  public logininformation:LoginInfo;

  isSignIn:boolean;
  isSingUp:boolean;
 

signToSystem(isSignINStatus) {

    this.isSignIn=isSignINStatus;
    this.isSingUp=!isSignINStatus;
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

  loginToSystem():void{
    if (this.form.invalid)  
      return;

 try {
   
//   this.loginSubscriber= this.loginService.login(this.logininformation).subscribe(result=>{
//     this.rememberMeCookiManagement();
//     this.storage.set('userInfo',result);
//     this.cookieService.set('userInfo',JSON.stringify(result));
//    this.router.navigate(['/pages/dashboard']);
//   },error=>{
//     this.refreshChaptcha();

//     if(error!=null && error.error!=null && error.error.errors!=null && 
//       error!=undefined && error.error!=undefined && error.error.errors!=undefined && error.error.errors.​captchaCode!=null && error.error.errors.​captchaCode!=undefined )
//     {
//       this.showToast('danger', 'شرح خطا', error.error.errors.​captchaCode[0]);
//     }
      
//      if(error!=null && error.status!=null && error.status!=undefined&& error.status==401){
//       this.showToast('danger', 'شرح خطا', '! شناسه کاربری و رمز عبور اشتباه است');
//      }
 
// });
 } catch (error) {
 }
 
  }


async  rememberMeCookiManagement(){
    if(this.logininformation.rememberMe){
      let expiredDate = new Date();
      this.cookieService.set('loginInformation',JSON.stringify(this.logininformation));//,expiredDate.getDate()+7,'/',null,true,null)
      this.cookieService.set('loginInformationUserName',this.logininformation.userName);
      this.cookieService.set('loginInformationPassword',this.logininformation.password);
      this.cookieService.set('loginInformationRememberMe',this.logininformation.rememberMe==true?'true':'false');
    }
    else{
      if(this.cookieService.check('loginInformationUserName'))
          this.cookieService.delete('loginInformationUserName');
      if(this.cookieService.check('loginInformationPassword'))
          this.cookieService.delete('loginInformationPassword');
      if(this.cookieService.check('loginInformationRememberMe'))
          this.cookieService.delete('loginInformationRememberMe');
    }
  }

  usernamehasValue:boolean;
  keyPressUserName(event?: any){
  if(this.logininformation.userName.length>0)
      this.usernamehasValue=true;
      else
      {
        this.usernamehasValue=false;
      }

  }

  PasswordValue:boolean;
  keyPressPassword(event?: any){
 

    if(this.logininformation.password.length>0)
        this.PasswordValue=true;
      else
      {
        this.PasswordValue=false;
      }

  }
  async setData(key, value) {
  }

  async getData(key) {
  }

  async presentToastWithOptions() {
  }

  public showError(err?: any): void {
    //   type: 'slide', duration: 400
 
  
  }


  ngOnDestroy(): void {
    if (this.captchaKeySubscriber !== undefined) {
      this.captchaKeySubscriber.unsubscribe();
    }

    if (this.captchaSubscriber !== undefined) {
      this.captchaSubscriber.unsubscribe();
    }

    if (this.loginSubscriber !== undefined) {
      this.loginSubscriber.unsubscribe();
    }
    
  }

  tst(){
  }


  rememberMeChangeValue(){
    // console.log(this.logininformation.rememberMe)
  }

}
