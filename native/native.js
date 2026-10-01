/* Calculadolar — solo dentro de la app de tienda (Capacitor). La web no lo carga.
   1) Pone el anuncio real de AdMob en el hueco que la app calcula para cada vista
      (evento «calculadolar:ad»). Mientras está la portada no se muestra nada.
   2) La compra única «Quitar anuncios» con RevenueCat (window.CalcCompras). */
(function(){
  var C = window.Capacitor;
  if(!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  // sin empaquetador no está registerPlugin: se habla directo con el puente nativo
  function plugin(nombre){
    if(C.registerPlugin) return C.registerPlugin(nombre);
    return new Proxy({}, {get: function(_, metodo){
      return function(opciones){ return C.nativePromise(nombre, metodo, opciones || {}); };
    }});
  }
  var AdMob = plugin('AdMob');
  var Purchases = plugin('Purchases');
  var ios = C.getPlatform() === 'ios';

  // Unidades de PRUEBA de Google. Al tener la cuenta de AdMob de Modular Mango se
  // cambian por las reales y PRUEBA pasa a false.
  var PRUEBA = true;
  var BANNER = ios ? 'ca-app-pub-3940256099942544/2934735716' : 'ca-app-pub-3940256099942544/6300978111';
  var TAMANO = {'300x250':'MEDIUM_RECTANGLE', '320x100':'LARGE_BANNER', '320x50':'BANNER'};

  // RevenueCat: llaves públicas del proyecto (appl_… / goog_…). Vacías = compra apagada.
  var RC_LLAVE = ios ? '' : '';
  var DERECHO = 'sin_anuncios';           // «entitlement» que desbloquea la compra

  var listo = false, sinAnuncios = false, pedido = null, puesto = '', t = null;

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
    var l = sinAnuncios ? null : pedido;
    // se ancla por abajo: el plugin en iOS invierte el margen de arriba
    var margen = l ? Math.max(0, Math.round(window.innerHeight - seguroAbajo() - l.top - l.alto)) : 0;
    var clave = l ? (l.ancho + 'x' + l.alto + '@' + margen) : '';
    if(clave === puesto) return;
    puesto = clave;
    if(!l){ AdMob.removeBanner().catch(function(){}); return; }
    AdMob.removeBanner().catch(function(){}).then(function(){
      return AdMob.showBanner({
        adId: BANNER, adSize: TAMANO[l.ancho + 'x' + l.alto],
        position: 'BOTTOM_CENTER', margin: margen,
        // isTesting en iOS mete el ID de prueba de Android: las unidades de prueba ya van en BANNER
        isTesting: false
      });
    }).catch(function(e){ console.warn('AdMob', e && e.message); });
  }
  window.addEventListener('calculadolar:ad', function(e){
    pedido = e.detail;
    clearTimeout(t); t = setTimeout(aplicar, 200);   // al cambiar de vista rápido, solo el último
  });

  /* ---------- compra «Quitar anuncios» ---------- */
  function revisar(info){
    var activos = info && info.entitlements && info.entitlements.active;
    sinAnuncios = !!(activos && activos[DERECHO]);
    if(sinAnuncios){ puesto = '#'; aplicar(); }
    return sinAnuncios;
  }
  var rcListo = RC_LLAVE
    ? Purchases.configure({apiKey: RC_LLAVE})
        .then(function(){ return Purchases.getCustomerInfo(); })
        .then(function(r){ revisar(r.customerInfo); return true; })
        .catch(function(e){ console.warn('RevenueCat', e && e.message); return false; })
    : Promise.resolve(false);

  window.CalcCompras = {
    get sinAnuncios(){ return sinAnuncios; },
    precio: function(){
      return rcListo.then(function(ok){
        if(!ok) return null;
        return Purchases.getOfferings().then(function(o){
          var p = o && o.current && o.current.availablePackages && o.current.availablePackages[0];
          return p ? p.product.priceString : null;
        }).catch(function(){ return null; });
      });
    },
    comprar: function(){
      return rcListo.then(function(ok){
        if(!ok) return 'La compra se activa cuando la app esté en la tienda';
        return Purchases.getOfferings().then(function(o){
          var p = o && o.current && o.current.availablePackages && o.current.availablePackages[0];
          if(!p) return 'La compra no está disponible ahora';
          return Purchases.purchasePackage({aPackage: p}).then(function(r){
            return revisar(r.customerInfo) ? 'Listo: sin anuncios. ¡Gracias!' : 'No se completó la compra';
          });
        }).catch(function(e){
          return (e && (e.userCancelled || e.code === '1')) ? '' : 'No se pudo comprar';
        });
      });
    },
    restaurar: function(){
      return rcListo.then(function(ok){
        if(!ok) return 'La compra se activa cuando la app esté en la tienda';
        return Purchases.restorePurchases().then(function(r){
          return revisar(r.customerInfo) ? 'Compra restaurada: sin anuncios' : 'No hay compras para restaurar';
        }).catch(function(){ return 'No se pudo restaurar'; });
      });
    }
  };

  /* ---------- arranque de anuncios ---------- */
  AdMob.initialize({initializeForTesting: PRUEBA}).then(function(){
    return ios ? AdMob.requestTrackingAuthorization().catch(function(){}) : null;
  }).then(function(){ return rcListo; }).then(function(){
    listo = true;
    console.log('Calculadolar: anuncios listos');
    aplicar();
  }).catch(function(e){ console.warn('AdMob init', e && e.message); });
})();
