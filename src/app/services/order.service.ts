import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService
  ) { }

  handlerCreateProjects (form: any) {
    if (!form) {
      return { status: false, message: 'No existe objeto para crear proyecto'};
    }
    let nextRole = 'laboratorist';
    let project = JSON.parse(JSON.stringify(this.getProject(nextRole)));

    const creator = this.getUser();
    const id = String(Math.random());  
    const obj = {
      creator: creator.user,
      role: nextRole,
      id,
      startAt: new Date(),
      updateAt: new Date(),
      ...form
    }

    if (project) {
      project[id] = obj;
      this.localStorage.insert(nextRole, project);
    } else {
      this.localStorage.insert(nextRole, { [id]: obj });
    }
    // console.log('handlerCreateProjects', {form, creator});

    return { status: true, message: 'Proyecto creado con éxito'};
  }

  handlerCreateRequest (form: any) {
    if (!form) {
      return { status: false, message: 'No existe objeto para crear una solicitud'};
    }

    let nextRole = 'laboratorist';
    let project = JSON.parse(JSON.stringify(this.getProject(nextRole)));
    let requestId = String(Math.random());

    let obj = {
      requestId,
      ...form
    };

    console.log('handlerCreateRequest', project[form.id], form);
    if (!project[form?.id]?.request) {
      project[form.id]['request'] = [obj]
    } else {
      project[form.id]['request'].push(obj)
    }
    
    this.localStorage.update(nextRole, project);
    return { status: true, message: 'Solicitud creada con éxito'};
  }

  getProjectsByRoleUser () {
    const role = this.getUser().role;
    let dataRole = JSON.parse(JSON.stringify(this.localStorage.select(role)));

    return dataRole ? { status: true, dataRole } : { status: false, dataRole: undefined };
  }

  getUser () {
    return this.sessionStorage.select(environment.keySession);
  }

  getProject (key: string) {
    return this.localStorage.select(key);
  }

}
