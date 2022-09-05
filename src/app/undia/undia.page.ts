import { Component, OnInit } from '@angular/core';
import { ModalController,  LoadingController } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-undia',
  templateUrl: './undia.page.html',
  styleUrls: ['./undia.page.scss'],
})


export class UndiaPage implements OnInit {
  rutina= {
    titulo: '',
    descripcion: '',
    imagen: '',
    voice:  ''

  };
  list= [];
  constructor(public modal: ModalController, public cargandoCtrl: LoadingController, private bd: DatabaseService) { }

  ngOnInit() {
    this.bd.$getobjeto.subscribe(data=> this.list.push(data)).unsubscribe();
  }

  modificar(unid){
    this.bd.actualizar('rutina', unid, this.list).then(res =>{
      alert('Se modifico el usuario');
    }).catch(err =>{
      console.log('error al modificar:', err);
    });
  }


  cerrarP(){
    this.modal.dismiss();
  }


}
