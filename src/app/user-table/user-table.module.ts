import { UserTableCRUDComponent } from './user-table-crud/user-table-crud.component';
import { UserTableComponent } from './user-table.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { UserTableRoutingModule } from './user-table.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 50,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 1200,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 10
  }
};



@NgModule({
  declarations: [UserTableComponent, UserTableCRUDComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    UserTableRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserTableModule { }
