import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public storage: AngularFireStorage) { }

  uploadImage(file: any, path: string, nombre: string): Promise<string>{
    return new Promise(resolve =>{

      const filePath = path + '/' + nombre;
      const refe = this.storage.ref(filePath);
      const task = refe.put(file);
      task.snapshotChanges().pipe(
        finalize(()=>{
          refe.getDownloadURL().subscribe(res => {
            const dowloadURL = res;
            resolve(dowloadURL);
            return;
        });
      })
      ).subscribe();
    });
  }

}
