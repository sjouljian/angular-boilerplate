import { Injectable } from '@angular/core';
import { MainService }  from './main.service';
import { ToastManager } from '../components/blocks/toast/toast.manager';
import { StorageHelper }    from '../helpers/storage.helper';
// Enums
import { Endpoint }     from '../enums/endpoint.enum';
import { gretch }       from 'gretchen';

@Injectable()
export class AuthService extends MainService {

  constructor(public toastManager : ToastManager)
  {
    super(toastManager);
  }

  public async login(email : string, password : string) : Promise<boolean>
  {
    //return Promise.resolve(true);

    // StorageHelper.removeToken();

    const url  = Endpoint.AUTHENTICATE;
    const opts = this.prepareRequest({ UserName: email, Password: password }, 'POST', 'AppService : authenticate');
    const { data } = await gretch<any, any>(url, opts).json();

    if (!data)
       return Promise.resolve(false);
    else{
      
    //const userTokens = new UserTokens(data);
    StorageHelper.setItem("token", data.token);
    StorageHelper.setItem("user", data.user);
    return Promise.resolve(true);
    
    // return true;
    }
  }

  public getLoggedUser() : any
  {
    const user = StorageHelper.getItem("user");
    return user;
  }

  public logout() : void
  {
    StorageHelper.removeItem("token");
    StorageHelper.removeItem("user");
  }
}
