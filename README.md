# Calculadolar

Calculadora de tasas para Venezuela, en una sola página. Abre en el navegador del
teléfono y se puede instalar como app (PWA).

**👉 https://cimadevgroup.github.io/calculadolar/**

## Las cuatro tasas

| tasa | de dónde sale | para qué |
| --- | --- | --- |
| **BCV** | [ve.dolarapi.com](https://ve.dolarapi.com) | la oficial, la vara de medir |
| **Paralelo** | ve.dolarapi.com | la de la calle |
| **Binance** | [criptoya.com](https://criptoya.com) (P2P USDT/VES, promedio compra-venta) | la que usa medio comercio hoy |
| **Euro BCV** | ve.dolarapi.com | **la trampa** |

Lo del euro: aquí nadie paga en euros. Pero la tasa del euro del BCV está ~15 % por
encima de la del dólar, así que hay quien la cobra como si fuera "la tasa oficial".
Por eso está en la lista: para poder cacharlo. Si el cobro cae en esa tasa, la app lo
marca con bandera y dice cuánto es el sobreprecio real.

Cualquiera de las cuatro se puede escribir a mano si el comercio usa otra: queda
marcada con ✎ y todos los cálculos la usan. El botón de refrescar borra los valores
manuales y vuelve a las del día.

## Qué calcula

- **Precio en $ + descuento %** → cuántos bolívares son con cada una de las cuatro
  tasas, y el neto en dólares si hay descuento.
- **Pagando en Bs / en $** (el botón de la izquierda del campo alterna la unidad) →
  a cuánto equivale con cada tasa.
- **Tasa implícita**: con las dos casillas llenas dice a qué tasa te están cobrando de
  verdad, y la nombra si coincide (±1 %) con alguna conocida:
  *a tasa BCV* · *a tasa Binance* · *a paralelo* · *🚩 a tasa EURO* ·
  *mejor que el BCV* · *tasa mixta / inflada* · *por encima de todas*.
- **El descuento de mentira**: si te ofrecen 10 % pero cobran a una tasa inflada, la
  app compara contra pagar el precio de lista a tasa BCV y dice el descuento real —
  o cuánto estás pagando de más, que suele ser el caso.

## Un solo teclado

El teclado del teléfono no sale nunca (`inputmode="none"` en todos los campos): se
escribe siempre con el teclado de la app.

- Al tocar un campo, **ese campo y el teclado se encienden** con el mismo halo naranja
  y el resto de la pantalla se apaga. El display dice en cuál estás escribiendo.
- La **tecla decimal alterna**: punto cuando metes dólares, coma cuando metes
  bolívares, tasas o porcentajes.
- **Cualquier campo acepta una operación completa**, no solo un número: `20*3` en el
  precio vale 60, y `=` la resuelve ahí mismo. Coma decimal, paréntesis y precedencia;
  el evaluador es propio, sin `eval`.
- Los botones de tasa (**a $ BCV**, **a $ Paralelo**, **a $ Binance**, **a € BCV**)
  meten la tasa en el campo activo; si venías de un número, ponen el `×` solo, y si
  venías de `÷` no lo ponen. Así `19000 ÷ a $ BCV` da los dólares de una.
- **↑ Usar como precio $** y **↑ Usar como precio Bs** mandan el cálculo libre a las
  casillas de arriba.

## Guardar el resultado

- 📋 **Copiar**: manda el resumen completo en texto al portapapeles, para pegar en
  WhatsApp.
- 🖼 **Recibo**: arma un PNG con las tasas del día, la compra y el veredicto, y abre la
  hoja de compartir del teléfono — ahí «Guardar imagen» lo manda a Fotos. Ninguna web
  puede escribir sola en el carrete, siempre pasa por la hoja de compartir; si el
  navegador no la soporta, el recibo se descarga.

## Ajustada como app

Sin zoom, sin pinch, sin doble-toque, sin tirar-para-recargar, sin rebote y sin
selección de texto fuera de los campos. Instalada en el teléfono no hay barra de
navegador, y el gesto de atrás pide confirmación en vez de botar la sesión de una.
En pestaña de navegador, el gesto de atrás desde el borde lo maneja el sistema
operativo y ninguna página lo puede bloquear: para eso hay que instalarla.

## Sin señal

El `sw.js` guarda la página para que abra sin internet, y la última consulta de tasas
queda en `localStorage`: al abrir sin datos muestra esas y avisa
«Sin conexión · guardadas ‹fecha›».

## Archivos

Todo estático, sin build ni dependencias:

| archivo | qué es |
| --- | --- |
| `index.html` | la app completa (HTML + CSS + JS) |
| `sw.js` | service worker, cachea el cascarón |
| `manifest.webmanifest` | datos de instalación de la PWA |
| `icon*.png`, `icon.svg` | iconos |

Para correrlo local basta cualquier servidor estático, por ejemplo
`python3 -m http.server 8791` dentro de la carpeta.

Las tasas son **referenciales**.
