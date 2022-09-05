/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ModalController,  LoadingController, Platform } from '@ionic/angular';
import { AgregardiaPage } from '../agregardia/agregardia.page';
import { DatabaseService } from '../services/database.service';
import { UndiaPage } from '../undia/undia.page';



@Component({
  selector: 'app-mi-dia',
  templateUrl: './mi-dia.page.html',
  styleUrls: ['./mi-dia.page.scss'],
})
export class MiDiaPage implements OnInit {
  listarutina = [];
  // eslint-disable-next-line max-len
  constructor(private modal: ModalController, private bd: DatabaseService ) { }

  async abrirM(){
    const mimodal = await this.modal.create({
      component: AgregardiaPage
    });
    await mimodal.present();
  }

  async abrirP(id){
    this.bd.listarId('rutina', id).then(respu =>{
      respu.subscribe(docRef =>{
        const rutina = docRef.data();
        rutina['id'] = docRef.id;
        this.bd.sendobjeto(rutina);
      });
    });

    const mimodal2 = await this.modal.create({
      component: UndiaPage
    });
    await mimodal2.present();
  }

  ngOnInit(){
    this.bd.listar('rutina').then(resp =>{
      resp.subscribe(listarutinaref =>{
        this.listarutina = listarutinaref.map(listarutinaref =>{
          const rutina= listarutinaref.payload.doc.data();
          rutina['id']= listarutinaref.payload.doc.id;
          return rutina;
        });
        console.log(this.listarutina);
      });
    });
  }

  eliminar(id){
    this.bd.eliminar('rutina', id).then(resp =>{
      alert('Se elimino el registro');
    }).catch(err =>{
      console.log('Error al eliminar');
    });
  }

}
