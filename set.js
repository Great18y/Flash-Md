const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkszMnNHQlN4WGNiQkVmS1plckZsM216TGZqYTV3SzB0aSs0VFdBQUxtbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1ZUUWxORHlIN3ZHeWxpM1F0bnNOd3g4L1JNb2R1ZE1SS29BcHVvVzNDdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLQy9lblhEVm04elFvRkVvc3lPY3ZXdmsrYlNGTjJ4Zy9mSzZ1Nis3aVYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWcXpvb1pwYUFSWnREdVkzd3dHQXpmb08zVFFVKytBVlBBZXUwWk5rN3ljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVLQWNHbDdMdllvcTRCd2xOck1ENU9NalZmWXc2YVNndUdEeE5tSEpzMU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBUQjZyTEtoQkd4RGtnYmovMnZmeG9BekQ1T1NqTFVCdExFMDlpdE5CbEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0N3bzR2SzR5cisrSGJyUEkrS3E3cXowbG13TGZXRSs1VTEwRFhLZlUybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmJjREVIMUhVSWRVQnVtcXozRkZ2bnNGTTNIczhraFIvQUZjZDVKQ1JWQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktWbU84Qy92M2hWVUR2QVNZU2lPUmhFbU1adzNuR013TFlqME5ub3laUnZVcnIzcE5ZWnBvcFFKcmllNXUvYklDWldPeGlsZ0VEUnBqbVNQeHBBWWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTMsImFkdlNlY3JldEtleSI6ImNHNmhQVHdhQjZueE1CWmlFdkVlSG1uaysveWFnMW0yWmkxRUJBanZML0U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Inh5ZllMa1dvVDJxamtyR2hRZWhlcXciLCJwaG9uZUlkIjoiYzFiZTM0MDktM2VkNC00NjI5LWJjYTEtZmNlZjZmM2JhOWFlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF2RDNsaTM3R0NDMTlnTXpQK3NkdzhoL1BUbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0cE54TGFiS3N3bk9OWmpZVThuTFVOS0NPVmc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQUozRE1GRk0iLCJtZSI6eyJpZCI6IjIzNDgwNzA1NDk0NDM6NzJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01hZzhLUUVFUEhuMDdRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjhNWUsrQlE2RDRUYVdMQ3JXSk5pNlR3eDNPSEo2QTVxakhXVWUwTzNHbWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlMrSVAxZDZIZDBvOXAzbHdGbWJiQnJuLzJsVy9vWUd3SHpsTEpkYUZhMlpxcWR4b0UwQ1ZoZHhkSk8wanMva05SczF4K1YrRW5UYUVITnV6anFiREJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsVmQ4dW5mUUJlUDg4RU11ZklBU0ppUWlqNzVDWjhqT3drQ0NSSGFocUFJeVZCMDZINWhUSlFnSzEyci9OTXExM3lxU2xMeVNUM2crS2RML0NXa0VqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwNzA1NDk0NDM6NzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkRHQ3ZnVU9nK0UybGl3cTFpVFl1azhNZHpoeWVnT2FveDFsSHREdHhwcCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTAzNzgyMn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348070549443", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'on',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
