var ShortcutManager = function(app) {
  this.app = app;
  this.bindEvents();
};

ShortcutManager.name = ShortcutManager.prototype.name = 'ShortcutManager';
App.modules.push(ShortcutManager);

ShortcutManager.prototype.bindEvents = function() {
	const Keys = {
		D: 68
	};

	window.addEventListener('keydown', function(e) {
		if (e.target == document.body) {
			var main = document.querySelector('main');
			switch(e.keyCode) {
				case Keys.D:
					if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) break;
					this.app.emit('toogleDarkMode');
					break;
				default:
					break;
			}
		}
	}.bind(this), false);
};
