import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource,Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FirestorageService } from '../services/firestorage.service';
import { DatabaseService } from '../services/database.service';
import { CameraOptions } from '@awesome-cordova-plugins/camera';
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';

const IMAGE_DIR = 'stored-imges';
interface LocalFile{
  nombre: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-agregardia',
  templateUrl: './agregardia.page.html',
  styleUrls: ['./agregardia.page.scss'],
})
export class AgregardiaPage implements OnInit {
  recording = false;
  storedFileName =[];


  imagenes: LocalFile[]=[];
  rutina= {
    titulo: '',
    descripcion: '',
    imagen: '',
    voice:  ''

  };

  newImage='';

  myimagen= [];
  foto: string;

  // eslint-disable-next-line max-len
  constructor(private modal: ModalController, private plataforma: Platform, private cargandoCtrl: LoadingController, private bd: DatabaseService, public fire: FirestorageService) { }

  cerrarM(){
    //this.rutina.imagen= this.myimagen.path;
    this.modal.dismiss();
   }

   guardar(){
    this.bd.create('rutina', this.rutina).then(resp => {
      console.log(resp);
      alert('Rutina guardada');
    }).catch(error =>{
      console.log('Error al crear');
    });
    console.log('prueba',this.myimagen);
   }

   async newImg(event: any){

    const path = 'Imagen';
    const nombre = this.rutina.titulo;
    const file = event.target.files[0];
    const respuesta = await this.fire.uploadImage(file, path, nombre);
    console.log('enlace de la imagen', respuesta);
    this.rutina.imagen= respuesta;
    alert('Su imagen se agrego corectamente');


   }

  async ngOnInit(){
    //this.cargararchivo();

  }



  async seleccionarImg(){
    const imagen = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    if(imagen){
      this.guardarImg(imagen);

    }

  }

  async guardarImg(img: Photo){
    const mibase64 = await this.leebase(img);
    const archivo = new Date().getTime() + '.jpeg';
    const guardaraArchivo =await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${archivo}`,
      data: mibase64
    });
  }

 async leebase(img: Photo){
    if(this.plataforma.is('hybrid')){
      const archivo = await Filesystem.readFile({
        path: img.path
      });

      return archivo.data;

    }else{
      const resp = await fetch(img.webPath);
      const blob = await resp.blob();

      return await this.convertirBlob(blob) as string;
    }
  }

  convertirBlob =(blob: Blob) =>  new Promise((resolve, reject)=>{
    // eslint-disable-next-line new-parens
    const lectura = new FileReader;
    lectura.onerror = reject;
    lectura.onload = () =>{
    resolve(lectura.result);
    };

    lectura.readAsDataURL(blob);
  });





}
