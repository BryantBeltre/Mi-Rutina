import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: '𝐌𝐢 𝐃𝐢𝐚', url: '/mi-dia', icon: 'pencil' },
    { title: '𝐍𝐚𝐫𝐫𝐚𝐥𝐨', url: '/voice', icon: 'mic' },
    { title: '𝐂𝐚𝐥𝐞𝐧𝐝𝐚𝐫𝐢𝐨', url: '/calendario', icon: 'calendar' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
