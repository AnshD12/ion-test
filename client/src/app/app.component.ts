// app.component.ts

import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3001/readFile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'file' });
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      console.log(file);
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
  }
}