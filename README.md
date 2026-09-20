# Calculadolar

Calculadora de tasas para Venezuela, en una sola página. Abre en el navegador del
teléfono y se puede instalar como app (PWA).

**👉 https://cimadevgroup.github.io/calculadolar/**

## Qué hace

- Trae las cuatro tasas del día: **dólar BCV**, **dólar paralelo**, **euro BCV** y
  **euro paralelo** (fuente: [ve.dolarapi.com](https://ve.dolarapi.com)).
- Cualquier tasa se puede escribir a mano si la del comercio es otra: queda marcada
  como `manual` y el resto de los cálculos la usa. El botón de refrescar borra los
  valores manuales y vuelve a las del día.
- **Precio en $** → cuánto es en bolívares a tasa oficial y a paralelo.
- **Te cobran** (en Bs o en $) → a cuánto equivale con cada tasa.
- **Tasa implícita**: con las dos casillas llenas dice a qué tasa te están cobrando
  de verdad y la califica:
  - *Excelente · oficial* — hasta 1 % por encima del BCV
  - *Tasa mixta / inflada* — entre medio
  - *Alerta · paralelo* — desde 1 % por debajo del paralelo hacia arriba
- **Calculadora**: se escribe con el teclado numérico del teléfono. Los botones son
  solo los que ese teclado no tiene: operadores, paréntesis, borrar, y **las cuatro
  tasas como botón** — al tocar una, si venías de un número mete el `×` solo.
  Soporta coma decimal, paréntesis y precedencia.
- El botón de copiar arma un resumen de texto (tasas, precio, monto y veredicto)
  para pegarlo en WhatsApp.

## Sin señal

El `sw.js` guarda la página para que abra sin internet, y la última consulta de
tasas queda en `localStorage`: al abrir sin datos muestra esas y avisa
«Sin conexión · guardadas ‹fecha›».

## Archivos

Todo es estático, sin build ni dependencias:

| archivo | qué es |
| --- | --- |
| `index.html` | la app completa (HTML + CSS + JS) |
| `sw.js` | service worker, cachea el cascarón |
| `manifest.webmanifest` | datos de instalación de la PWA |
| `icon*.png`, `icon.svg` | iconos |

Para correrlo local basta cualquier servidor estático, por ejemplo
`python3 -m http.server 8791` dentro de la carpeta.

Las tasas son **referenciales**.
