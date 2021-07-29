import { Component, OnInit } from '@angular/core';
import Vditor from 'vditor';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {


  constructor() {
  }

  vditor: Vditor;

  // File:[];
  ngOnInit(): void {
    this.vditor = new Vditor('vditor', {
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
      },
      upload: {
        url: 'http://shop.test01.com/api/imgUpload',
        linkToImgUrl: 'http://shop.test01.com/api/imgUpload',
        fieldName: 'file[]',
        max: 1048576,
        format: (File, msg) => {
          // console.log("============格式化拿到的数据信息File============");
          const customObj = {};
          const dealData = JSON.parse(msg)['data'];
          for (let i = 0; i < File.length; i++) {
            // console.log(File[i]['name']);
            customObj[File[i]['name']] = dealData[i];
          }
          const cusObj = {
            'msg': '',
            'code': 0,
            'data': {
              // "errFiles": ['filename', 'filename2'],
              'succMap': customObj
            }
          };
          return JSON.stringify(cusObj);
        },
        error: (res) => {
          // console.log("============上传失败返回的数据信息============");
          // console.log(res);
        },
        linkToImgCallback: (responseText) => {
          // console.log("============图片地址上传的回调数据============");
          // console.log(responseText);
        }
      }
    });

  }

  getEditorValue() {
    console.log('============获取编辑器内容============');
    console.log(this.vditor.getValue());
    console.log('============获取编辑器Html内容============');
    console.log(this.vditor.getHTML());
  }

}
