var DarkMode = function DarkMode(app) {
  this.app = app;

  app.on('toogleDarkMode', function() {
    document.body.classList.toggle('dark');

    var theme = document.body.classList.contains("dark") ? "dark" : "";
    localStorage.setItem('main-theme', theme);
  }.bind(this));
};

DarkMode.name = DarkMode.prototype.name = 'DarkMode';
App.modules.push(DarkMode);

// Instantly apply the stored theme
(function(){
  let theme = localStorage['main-theme'];
  if (theme) document.body.classList.add(theme);
})();
