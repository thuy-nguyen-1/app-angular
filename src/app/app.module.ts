import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { UserState } from './profile/user-state/state/user.state';
import { loadRemoteModule } from './utils/federation-utils';
import { DOMAIN } from 'src/constants';

export function initializeApp(): () => void {
  return () => {
    loadRemoteModule({
      remoteEntry: `${DOMAIN}/remoteEntry.js`,
      remoteName: 'app_react',
      exposedModule: './listUser',
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
