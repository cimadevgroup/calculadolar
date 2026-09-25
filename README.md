# Calculadolar

Calculadora de tasas para Venezuela, en una sola página. Abre en el navegador del
teléfono y se puede instalar como app (PWA).

**👉 https://cimadevgroup.github.io/calculadolar/**

## Las ocho tasas

| tasa | de dónde sale |
| --- | --- |
| **BCV** | [ve.dolarapi.com](https://ve.dolarapi.com) |
| **Paralelo** | ve.dolarapi.com |
| **Binance P2P** | [criptoya.com](https://criptoya.com) (USDT/VES, promedio compra-venta) |
| **Bybit P2P** | criptoya.com |
| **Euro BCV** | ve.dolarapi.com — **la trampa** |
| **Zelle ✎** | a mano: no hay API pública que la publique |
| **PayPal ✎** | a mano: igual que Zelle |
| **Promedio** | calculado: promedio de las tasas de mercado cargadas (paralelo, Binance, Bybit, Zelle y PayPal) |

Lo del euro: aquí nadie paga en euros, pero la tasa del euro del BCV está ~15 % por
encima de la del dólar, así que hay quien la cobra como si fuera "la tasa oficial".
Si el cobro cae en esa tasa, la app lo marca con bandera.

Zelle y PayPal quedan guardadas en el teléfono y el botón de refrescar **no las borra**
(no tienen fuente automática). Las otras cinco bajan solas y se pueden pisar a mano:
quedan con ✎ hasta que refresques.

## Los dos precios

En una tienda te dan dos precios por lo mismo:

- **Precio pagando en $** — lo que cuesta si pagas en efectivo verde.
- **Precio pagando en Bs** — lo que cuesta si pagas en bolívares. Ese precio te lo
  pueden decir en bolívares («son 9.412») o en dólares («pagando en Bs te sale en 11»),
  y por eso el botón dice **mostrar en Bs / mostrar en $**: es el mismo precio visto en
  una u otra moneda, convertido al BCV, que es como lo cotizan. El precio no cambia al
  tocarlo, solo cómo lo lees.

Con los dos llenos la app calcula:

- **Tasa implícita**: a qué tasa te están cobrando de verdad, y la nombra si coincide
  (±1 %) con alguna conocida — *a tasa BCV*, *a paralelo*, *a tasa Binance*,
  *🚩 a tasa EURO*, *por encima de todas*…
- **Cómo te conviene pagar**: la conclusión, que es para lo que existe esta app.
  Compara los dos precios midiendo tu dólar a la mejor tasa de mercado que tengas
  cargada (la más alta entre paralelo, Binance, Bybit, Zelle y PayPal) y dice
  **paga en Bs** o **paga en $**, con cuánto te ahorras y de dónde sale la cuenta.
- **El descuento de mentira**: si te ofrecen 10 % pero cobran a una tasa inflada,
  compara contra pagar el precio de lista a tasa BCV y dice el descuento real.

## Un solo teclado

El teclado del teléfono no sale nunca (`inputmode="none"`): se escribe siempre con el
teclado de la app.

- Al tocar un campo, **ese campo y el teclado se encienden** con el mismo halo y el
  resto se apaga. El display dice en cuál estás escribiendo.
- La **tecla decimal alterna**: punto para dólares, coma para bolívares.
- **Escribiendo en un campo de arriba** solo quedan vivos números, `AC`, decimal y `⌫`;
  signos, paréntesis y tasas se apagan porque ahí no aplican.
- La calculadora tiene **su propia unidad** y los botones de tasa **convierten** según
  ella: en `$` multiplican (dan Bs) y en `Bs` dividen (dan $), cambiando la unidad sola.
- **↑ Al precio en $** y **↑ A pagando en Bs/$** suben el cálculo a las casillas.

## Guardar el resultado

- 📋 **Copiar**: el resumen completo en texto, para pegar en WhatsApp.
- 🖼 **Recibo**: un PNG con las tasas del día, los dos precios, el veredicto y la
  recomendación, que sale por la hoja de compartir del teléfono («Guardar imagen» lo
  manda a Fotos). Ninguna web puede escribir sola en el carrete.

## Ajustada como app

Sin zoom, sin pinch, sin doble-toque, sin tirar-para-recargar, sin rebote y sin
selección de texto fuera de los campos. Nada se desborda de su recuadro aunque las
tasas pasen de mil. Instalada no hay barra de navegador y el gesto de atrás pide
confirmación; en pestaña normal ese gesto lo maneja el sistema operativo.

## Sin señal

El `sw.js` guarda la página y la última consulta de tasas queda en `localStorage`: al
abrir sin datos muestra esas y avisa «Sin conexión · guardadas ‹fecha›».

## Archivos

Todo estático, sin build ni dependencias:

| archivo | qué es |
| --- | --- |
| `index.html` | la app completa (HTML + CSS + JS) |
| `sw.js` | service worker, cachea el cascarón |
| `manifest.webmanifest` | datos de instalación de la PWA |
| `icon*.png`, `icon.svg` | iconos |

Las tasas son **referenciales**.
