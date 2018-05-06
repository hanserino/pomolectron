// Henter Electron fra node_modules/ slik at vi kan ta det i bruk
const electron = require('electron')

// Electron-modul for å kontrollere livssyklusen til appen
const app = electron.app

// Electron-modul for å kontrollere nettleservinduet
const BrowserWindow = electron.BrowserWindow

// Electron-modul for å sende data mellom filer
const ipcMain = electron.ipcMain

//Electron-modul for å bygge app-topp-menyen
const Menu = electron.Menu

// Node.js-moduler
const path = require('path')
const url = require('url')

// Tom variabel for å kontrollere livssyklusen til app-vinduet
let mainWindow

function createWindow () {
    // Lager app-vinduet og setter noen innstillinger
    mainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            icon: path.join(__dirname, 'assets/icons/png/icon.png')
        }
    )
  
    // Bruker loadUrl til å åpne index.html 
    // Vi henter den fra filsystemet
    // (kunne også brukt http)
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Åpner devTools automatisk
    mainWindow.webContents.openDevTools()

    // Kjøres når hoved-vinduet lukkes
    mainWindow.on('closed', function () {
        // Setter mainWindow til null for å tømme hele objektet
        // som også tømmer minnet i datamaskinen
        // aka garbage cleaning
        mainWindow = null
    })

    // Bygg meny fra Electron-template
    //const menu = Menu.buildFromTemplate(mainMenu)

    // Legg den inn i appen
    //Menu.setApplicationMenu(menu)
}

ipcMain.on('startClick', function(event, item){
    console.log("start clicked")
    
})

const mainMenu = [
    {},
    {
        label: 'Toggle Full Screen'
    }
]


// Settes i gang når Electron har blitt lastet og initialisert 
app.on('ready', createWindow)

// Avslutt hele appen når alle vinduer er lukket
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // Når appen er aktiv, men vinduer er lukket
    // Vi velger da å åpne et nytt app-vindu
    if (mainWindow === null) {
        createWindow()
    }
})