const elmApp = Elm.ElmRender.Main.fullscreen();
elmApp.ports.sendSomethingBackToTheJs.subscribe(console.log)

export default elmApp
