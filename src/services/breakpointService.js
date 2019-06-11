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

function initBreakpoints (nbJour) {
    // nbJour = this.nbJour; glideOptions = this.glideOptions
    var largeur = parseInt(process.env.VUE_APP_BREAKPOINT_WIDTH)
    var winWidth = window.innerWidth;
    var offsetWidth = document.querySelector('menu-cantine-menu-semaine').offsetWidth;
    var delta = ~~(2 * (winWidth - offsetWidth)/ ((nbJour +1) * nbJour) )
  
    var breakpoints = [];

    var idx = largeur;
    for (var nbCol = 1; nbCol <= nbJour;) {
      idx  = idx + largeur + nbCol * delta;
      var o = { perView: nbCol++ };
      breakpoints[idx] = o;
    }
    return breakpoints;
  }

function activeByBreakpoint(breakpoints, dateInit, nbJours, jours) {
    // dateInit = json.requete.dateJour, nbJours = json.nbJours, jours = json.jours
    var nbVisible = nbViewByBreakpoint(breakpoints);
    var len;
    var i;
    for (i = 0, len = nbJours; i < len; i++) {
      var jour = jours[i];
      if (jour.date === dateInit) {
        var pos = i + 1 - ~~((nbVisible + 1)/2);
        if (pos > 0 ) {
          if (pos + nbVisible < len) {
            return pos;
          } 
          return len - nbVisible;
        }
        return  0;
        
      }
    }
}
export { nbViewByBreakpoint, initBreakpoints , activeByBreakpoint};
