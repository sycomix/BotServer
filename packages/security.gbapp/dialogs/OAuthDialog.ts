/*****************************************************************************\
|                                               ( )_  _                       |
|    _ _    _ __   _ _    __    ___ ___     _ _ | ,_)(_)  ___   ___     _     |
|   ( '_`\ ( '__)/'_` ) /'_ `\/' _ ` _ `\ /'_` )| |  | |/',__)/' v `\ /'_`\   |
|   | (_) )| |  ( (_| |( (_) || ( ) ( ) |( (_| || |_ | |\__, \| (˅) |( (_) )  |
|   | ,__/'(_)  `\__,_)`\__  |(_) (_) (_)`\__,_)`\__)(_)(____/(_) (_)`\___/'  |
|   | |                ( )_) |                                                |
|   (_)                 \___/'                                                |
|                                                                             |
| General Bots Copyright (c) Pragmatismo.io. All rights reserved.             |
| Licensed under the AGPL-3.0.                                                |
|                                                                             |
| According to our dual licensing model, this program can be used either      |
| under the terms of the GNU Affero General Public License, version 3,        |
| or under a proprietary license.                                             |
|                                                                             |
| The texts of the GNU Affero General Public License with an additional       |
| permission and of our proprietary license can be found at and               |
| in the LICENSE file you have received along with this program.              |
|                                                                             |
| This program is distributed in the hope that it will be useful,             |
| but WITHOUT ANY WARRANTY, without even the implied warranty of              |
| MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                |
| GNU Affero General Public License for more details.                         |
|                                                                             |
| "General Bots" is a registered trademark of Pragmatismo.io.                 |
| The licensing of the program under the AGPLv3 does not imply a              |
| trademark license. Therefore any rights, title and interest in              |
| our trademarks remain entirely with us.                                     |
|                                                                             |
\*****************************************************************************/

/**
 * @fileoverview Dialog for handling OAuth scenarios.
 */

'use strict';

import { TokenResponse } from 'botbuilder';
import { GBLog, GBMinInstance, IGBDialog } from 'botlib';
import { Messages } from '../strings.js';

/**
 * Dialogs for handling Menu control.
 */
export class OAuthDialog extends IGBDialog {
  public static getOAuthDialog(min: GBMinInstance) {
    return {
      id: '/auth',
      waterfall: [
        async step => {
          step.activeDialog.state.options = step.options;

          return await step.beginDialog('oAuthPrompt');
        },
        async step => {
          const tokenResponse: TokenResponse = step.result;
          if (tokenResponse) {
            GBLog.info('Token acquired.');

            return await step.endDialog(tokenResponse);
          } else {
            await step.context.sendActivity('Please sign in so I can show you your profile.');

            return await step.replaceDialog('/auth');
          }
        }
      ]
    };
  }
}
