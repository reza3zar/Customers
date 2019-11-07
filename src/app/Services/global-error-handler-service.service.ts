import { Injectable, ErrorHandler, Inject, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { RedirectToLogin } from "../CommonModule/redirectToLogin.service";


@Injectable()
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }
  private get redirecToLoginHeloer(): RedirectToLogin {
    return this.injector.get(RedirectToLogin);
  }

  handleError(error: any) {

    // const routerService = this.injector.get(Router);
    // const ngZone = this.injector.get(NgZone);
    // ngZone.run(() => {
    //   routerService.navigate(['home'], { skipLocationChange: true });
    // });


    if (error instanceof HttpErrorResponse) {

      if (error.status === 405){
        // this.router.navigate(['home']);
        this.redirecToLoginHeloer.redirectToLoginPage();
      }
      else

      {
        // this.showError(error.message)
      console.error("An error occurred Reza Says:", error.message);

      }

    } else {
      //A client-side or network error occurred.
      console.error("An error occurred:", error);
    }
  }





    // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
    // private get toastrService(): ToastrService {
    //   return this.injector.get(ToastrService);
    // }

    // public handleError(error: any): void {
    //   this.toastrService.error(
    //     "An unexpected error has occurred.",
    //     "Error",
    //     {
    //       closeButton: true,
    //       timeOut: 5000,
    //       onActivateTick: true
    //     }
    //   );

    //   super.handleError(error);
    // }


}
