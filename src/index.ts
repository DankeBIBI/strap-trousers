// import test from './test';
import config from './utils/config';
import { DKID } from './core/easeId'
import { createConnect } from './core/easeApi'
import { connectStraw } from './core/strawApi'
import * as common from './common'
const logo = `
         __                         __                                      
   _____/ /__________ _____        / /__________  __  __________  __________
  / ___/ __/ ___/ __ \`/ __ \\______/ __/ ___/ __ \\/ / / / ___/ _ \\/ ___/ ___/
 (__  ) /_/ /  / /_/ / /_/ /_____/ /_/ /  / /_/ / /_/ (__  )  __/ /  (__  ) 
/____/\\__/_/   \\__,_/ .___/      \\__/_/  \\____/ \\__,_/____/\\___/_/  /____/  
                   /_/                                                      
                                                      
`
// console.log(`%c strap-trousers %c @${config.VERSION} `,'color:pink;background:#3d3d3d;padding:2px;border-radius:3px;font-weight:800','color:black;font-size:10px');
console.log(`%c strap-trousers %c @${require('./package.json').version}   `, 'color:pink;background:#3d3d3d;padding:2px;border-radius:3px;font-weight:800', 'color:black;font-size:10px');
export {
    DKID,
    createConnect,
    connectStraw,
}
