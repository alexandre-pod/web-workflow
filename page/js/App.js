window.addEventListener('load', function() {
	let app = EventEmitter(window.App);
	initializeApp(app);
	app.emit(App.Events.initialized);

	function initializeApp(app) {
		for (var Module of app.modules) {
			if (app[Module.name] !== undefined) {
				console.error('Module name ', Module.name, ' is not available (reserved or already used)');
				continue;
			}
			app[Module.name] = new Module(app);
		}
	}
});
