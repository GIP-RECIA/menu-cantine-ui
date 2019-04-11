function nbViewByBreakpoint(glideBreakpoints) {
    //  glideBreakpoints = this.glideOptions['breakpoints']
    var width = window.innerWidth;
    var nbView = 0;
    glideBreakpoints.every(function(item, index) {
      if (width <= index ) {
        nbView = item.perView;
        return false;
      } 
      return true;
    });
    return ~~(nbView);
}

function setBreakpoint (nbJour, glideOptions) {
    // nbJour = this.nbJour; glideOptions = this.glideOptions
    var largeur = parseInt(process.env.VUE_APP_BREAKPOINT_WIDTH)
    var winWidth = window.innerWidth;
    var offsetWidth = document.getElementsByTagName('menu-cantine-menu-semaine')[0].offsetWidth;
    var delta = ~~(2 * (winWidth - offsetWidth)/ ((nbJour +1) * nbJour) )
  
    glideOptions.breakpoints = [];

    var idx = largeur;
    for (var nbCol = 1; nbCol <= nbJour;) {
      idx  = idx + largeur + nbCol * delta;
      var o = { perView: nbCol++ };
      glideOptions.breakpoints[idx] = o;
      // eslint-disable-next-line
        console.log('index = '  + idx);
      
    }
    return nbViewByBreakpoint(glideOptions.breakpoints);
  }

export { nbViewByBreakpoint, setBreakpoint };
