import { Injectable } from '@angular/core';
declare var toastr: any;

@Injectable()
export class ToastService {

  constructor() { 
    this.Setting();
  }

  Success(title: string, msg?: string){
    toastr.success(title, msg);
  }

  Warnning(title: string, msg?: string){
    toastr.warnning(title, msg);
  }

  Info(title: string, msg?: string){
    toastr.info(title, msg);
  }

  Error(title: string, msg?: string){
    toastr.error(title, msg);
  }

  Setting(){
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-full-width",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
}
