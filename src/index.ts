/**
 * @description Entry Point for Application
 * @author Kennet Avila
 * @version 1.0
 */

import { Application } from './app/app'

try {
  new Application().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}
