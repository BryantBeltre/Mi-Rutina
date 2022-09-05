import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'mi-dia',
    loadChildren: () => import('./mi-dia/mi-dia.module').then( m => m.MiDiaPageModule)
  },
  {
    path: 'agregardia',
    loadChildren: () => import('./agregardia/agregardia.module').then( m => m.AgregardiaPageModule)
  },
  {
    path: 'undia',
    loadChildren: () => import('./undia/undia.module').then( m => m.UndiaPageModule)
  },
  {
    path: 'voice',
    loadChildren: () => import('./voice/voice.module').then( m => m.VoicePageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
