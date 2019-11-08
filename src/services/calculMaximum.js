function calculMaxSemaine (jours, startAt, perView) {
    var maxSemaine = {};
    if (perView) {
      var idxJour;
      var stopAt = startAt + perView;
      for (idxJour = startAt; idxJour < stopAt; idxJour++) {
        var jour = jours[idxJour];
        if (jour) {
          var maxJour = jour.serviceChoixNbPlats;
          if (maxJour) {
            for (const service in maxJour) {
              var ssMenu = maxJour[service];
              if (ssMenu) {
                var ssMenuMax = maxSemaine[service]
                if (ssMenuMax) {
                  for (const choix in ssMenu) {
                    var nb = ssMenu[choix];
                    if (nb) {
                      var max = ssMenuMax[choix];
                      if (nb > (max || -1)) {
                        ssMenuMax[choix] = nb;
                      }
                    }
                  }
                } else {
                  // on clone
                  maxSemaine[service] = JSON.parse(JSON.stringify(ssMenu));
                }
              }
            }
          }
        }
      }
    }
    return maxSemaine;
  }

function calculMaxJour (service, partie, maxPlats) {
    if (maxPlats) {
      maxPlats = maxPlats[service];
      if (maxPlats) {
        if (partie) {
          var nb = maxPlats[partie];
          if (nb) {
            return nb;
          }
        } else {
          return 1;
        }
      }
    }
    return 0;
  }


export { calculMaxJour , calculMaxSemaine };
  