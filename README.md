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
marca con bandera roja y dice cuánto es el sobreprecio real.

Cualquiera de las cuatro se puede escribir a mano si el comercio usa otra: queda
marcada con ✎ y todos los cálculos la usan. El botón de refrescar borra los valores
manuales y vuelve a las del día.

## Qué calcula

- **Precio en $ + descuento %** → cuántos bolívares son con cada una de las cuatro
  tasas, y el neto en dólares si hay descuento.
- **Te cobran** (Bs o $) → a cuánto equivale con cada tasa.
- **Tasa implícita**: con las dos casillas llenas dice a qué tasa te están cobrando de
  verdad, y la nombra si coincide (±1 %) con alguna conocida:
  *a tasa BCV* · *a tasa Binance* · *a paralelo* · *🚩 a tasa EURO* ·
  *mejor que el BCV* · *tasa mixta / inflada* · *por encima de todas*.
- **El descuento de mentira**: si te ofrecen 10 % pero cobran a una tasa inflada, la
  app compara contra pagar el precio de lista a tasa BCV y dice el descuento real —
  o cuánto estás pagando de más, que suele ser el caso.
- El botón de copiar arma un resumen de texto (tasas, precio, cobro y veredicto) para
  pegarlo en WhatsApp.

## La calculadora

Tiene teclado completo, y además el campo de arriba se puede escribir con el teclado
numérico del teléfono. Las cuatro tasas son botones: al tocar una, si venías de un
número mete el `×` solo (`78` + Binance → `78*950,96`). Coma decimal, paréntesis y
precedencia; el evaluador es propio, sin `eval`. Los botones **↑ Usar como precio $**
y **↑ Usar como te cobran** mandan el resultado a las casillas de arriba.

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
