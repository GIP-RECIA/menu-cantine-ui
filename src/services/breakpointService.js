function nbViewByBreakpoint(glideBreakpoints) {
    //  glideBreakpoints = this.glideOptions['breakpoints']
    var width = window.innerWidth;
    var nbView = 0;
    // eslint-disable-next-line
    console.log('nbViewByBreackpoint width =' +  width);
    if (glideBreakpoints && glideBreakpoints.every) { 
      nbView = 5;
      glideBreakpoints.every(function(item, index) {
        // on cherche le break point correspondant a la taille 
        // eslint-disable-next-line
        console.log('breakpoint (item, index)=(' +  item.perView + ", "+ index + ')');
        if (width <= index ) {

          nbView = item.perView;
          return false;
        } 
        return true;
      });
    }
    return ~~(nbView);
}

function initBreakpoints (nbJour) {
    // nbJour = this.nbJour; glideOptions = this.glideOptions
    var largeur = parseInt(process.env.VUE_APP_BREAKPOINT_WIDTH)
    var winWidth = window.innerWidth;
    var offsetWidth = document.querySelector('div#menusemaine').offsetWidth;
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
    // eslint-disable-next-line
    console.log('nbVisible =' +  nbVisible);
    var len;
    var i;
    for (i = 0, len = nbJours; i < len; i++) {
      var jour = jours[i];
      if (jour.date === dateInit) {
        var pos = i + 1 - ~~((nbVisible + 1)/2);
        if (pos > 0 ) {
          if (pos + nbVisible < len) {
            // eslint-disable-next-line
            console.log('1 active =' + pos );
            return pos;
          } 
          pos = len - nbVisible;
          // eslint-disable-next-line
          console.log('2 active =' + pos + " " + len + " " + nbVisible);
          return pos
        }// eslint-disable-next-line
        console.log('3 active =0' + pos );
        return  0;
        
      }
    }
    return 0;
}
export { nbViewByBreakpoint, initBreakpoints , activeByBreakpoint};
