/* Calculadolar — solo dentro de la app de tienda (Capacitor). La web no lo carga.
   Pone el anuncio real de AdMob en el hueco que la app calcula para cada vista
   (evento «calculadolar:ad»). Mientras está la portada no se muestra nada. */
(function(){
  var C = window.Capacitor;
  if(!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  var AdMob = C.Plugins.AdMob;
  if(!AdMob) return;
  var ios = C.getPlatform() === 'ios';

  // Unidades de PRUEBA de Google. Al tener la cuenta de AdMob de Modular Mango se
  // cambian por las reales y PRUEBA pasa a false.
  var PRUEBA = true;
  var BANNER = ios ? 'ca-app-pub-3940256099942544/2934735716' : 'ca-app-pub-3940256099942544/6300978111';
  var TAMANO = {'300x250':'MEDIUM_RECTANGLE', '320x100':'LARGE_BANNER', '320x50':'BANNER'};

  var listo = false, pedido = null, puesto = '', t = null;

  // alto de la franja segura de abajo (la barra de inicio del iPhone)
  function seguroAbajo(){
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;bottom:0;height:env(safe-area-inset-bottom);visibility:hidden';
    document.body.appendChild(d);
    var h = d.getBoundingClientRect().height;
    d.remove();
    return h;
  }
  function portadaVisible(){
    var p = document.getElementById('portada');
    return p && p.style.display !== 'none';
  }
  function aplicar(){
    if(!listo) return;
    if(portadaVisible()){ clearTimeout(t); t = setTimeout(aplicar, 250); return; }
    var l = pedido;
    // se ancla por abajo: el plugin en iOS invierte el margen de arriba
    var clave = l ? (l.ancho + 'x' + l.alto + '@' + Math.round(window.innerHeight - seguroAbajo() - l.top - l.alto)) : '';
    if(clave === puesto) return;
    puesto = clave;
    if(!l){ AdMob.removeBanner().catch(function(){}); return; }
    AdMob.removeBanner().catch(function(){}).then(function(){
      return AdMob.showBanner({
        adId: BANNER,
        adSize: TAMANO[l.ancho + 'x' + l.alto],
        position: 'BOTTOM_CENTER',
        margin: Math.max(0, Math.round(window.innerHeight - seguroAbajo() - l.top - l.alto)),
        isTesting: PRUEBA
      });
    }).catch(function(e){ console.warn('AdMob', e); });
  }
  window.addEventListener('calculadolar:ad', function(e){
    pedido = e.detail;
    clearTimeout(t); t = setTimeout(aplicar, 200);   // al cambiar de vista rápido, solo el último
  });

  AdMob.initialize({initializeForTesting: PRUEBA}).then(function(){
    return ios ? AdMob.requestTrackingAuthorization().catch(function(){}) : null;
  }).then(function(){
    listo = true;
    aplicar();
  }).catch(function(e){ console.warn('AdMob init', e); });
})();
