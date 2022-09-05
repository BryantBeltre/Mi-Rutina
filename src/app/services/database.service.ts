/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private obejectSource = new BehaviorSubject<any>({});
  $getobjeto = this.obejectSource.asObservable();

  constructor(private myfirestore: AngularFirestore) { }


  async create(colleccion, data){
    try{
    return await this.myfirestore.collection(colleccion).add(data);
  }catch(error){
    console.log('error en: crear ');
  }
}



  async listar(colleccion){
    try{
    return await this.myfirestore.collection(colleccion).snapshotChanges();
  }catch(error){
    console.log('error en: obtener ');
  }
}

async listarId(colleccion, id){
  try{
  return await this.myfirestore.collection(colleccion).doc(id).get();
}catch(error){
  console.log('error en: obtener por id ');
}
}

async eliminar(colleccion, id){
  try{
  return await this.myfirestore.collection(colleccion).doc(id).delete();
}catch(error){
  console.log('error en: eliminar ');
}
}

async actualizar(colleccion, id, data){
  try{
    return await this.myfirestore.collection(colleccion).doc(id).set(data);
  }catch(error){
    console.log('error en: actualizar ');
  }
}

sendobjeto(data: any){
  this.obejectSource.next(data);
}

}
