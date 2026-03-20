export * from './common'
export { createConnect } from './core/easeApi'
export { DKID } from './core/easeId'
export { connectStraw } from './core/strawApi'
export * from './core/strawPlus'
export const LOGO = `
         __                         __                                      
   _____/ /__________ _____        / /__________  __  __________  __________
  / ___/ __/ ___/ __ \`/ __ \______/ __/ ___/ __ \/ / / / ___/ _ \/ ___/ ___/
 (__  ) /_/ /  / /_/ / /_/ /_____/ /_/ /  / /_/ / /_/ (__  )  __/ /  (__  ) 
/____/\__/_/   \__,_/ .___/      \__/_/  \____/ \__,_/____/\___/_/  /____/  
                   /_/                                                      
`
// 移除自动打印 Logo，避免污染生产环境日志。如需打印请手动调用:
// import { LOGO } from 'strap-trousers'; console.log(LOGO);
