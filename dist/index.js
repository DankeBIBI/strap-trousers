"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logo = exports.connectStraw = exports.createConnect = exports.DKID = void 0;
// import test from './test';
const config_1 = __importDefault(require("./utils/config"));
var easeId_1 = require("./core/easeId");
Object.defineProperty(exports, "DKID", { enumerable: true, get: function () { return easeId_1.DKID; } });
var easeApi_1 = require("./core/easeApi");
Object.defineProperty(exports, "createConnect", { enumerable: true, get: function () { return easeApi_1.createConnect; } });
var strawApi_1 = require("./core/strawApi");
Object.defineProperty(exports, "connectStraw", { enumerable: true, get: function () { return strawApi_1.connectStraw; } });
__exportStar(require("./common"), exports);
__exportStar(require("./core/mixComputing"), exports);
exports.logo = `
         __                         __                                      
   _____/ /__________ _____        / /__________  __  __________  __________
  / ___/ __/ ___/ __ \`/ __ \\______/ __/ ___/ __ \\/ / / / ___/ _ \\/ ___/ ___/
 (__  ) /_/ /  / /_/ / /_/ /_____/ /_/ /  / /_/ / /_/ (__  )  __/ /  (__  ) 
/____/\\__/_/   \\__,_/ .___/      \\__/_/  \\____/ \\__,_/____/\\___/_/  /____/  
                   /_/                                                      
                                                      
`;
// console.log(`%c strap-trousers %c @${config.VERSION} `,'color:pink;background:#3d3d3d;padding:2px;border-radius:3px;font-weight:800','color:black;font-size:10px');
console.log(`%c strap-trousers %c @${config_1.default.VERSION}   `, 'color:pink;background:#3d3d3d;padding:2px;border-radius:3px;font-weight:800', 'color:black;font-size:10px');
