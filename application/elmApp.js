const elmApp = Elm.ElmRender.Main.fullscreen();
elmApp.ports.check.subscribe(console.log)

export default elmApp
