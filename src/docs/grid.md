# Pacman Grid Maken 

**Vereisten:** Basiskennis van JavaScript en Vue.js. Bekendheid met p5.js uit eerdere workshops is nuttig.

## Stap 1: Je Vue-component Opzetten

Maak een nieuw Vue-component aan voor je grid-sketch.

- Importeer p5 en de Vue Composition API.
- Maak een ref aan voor de sketch-container.
- Maak p5 aan in `onMounted`.

**Tip:** Dit is de standaard opzet.

**Voorbeeld:**
```javascript
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const sketchContainer = ref(null)
let p5Instance = null

// Sketch-functie hier

onMounted(() => {
  if (sketchContainer.value) {
    p5Instance = new p5(sketch, sketchContainer.value)
  }
})
```

## Stap 2: Gridconstanten Definiëren

Definieer constanten voor de gridafmetingen en celgrootte.

- Stel `CELGROOTTE`, `RIJEN` en `KOLOMMEN` in.
- Bereken `BREEDTE` en `HOOGTE` op basis hiervan.

**Tip:** Deze bepalen de canvasgrootte en de gridindeling.

**Voorbeeld:**
```javascript
const CELGROOTTE = 30;
const RIJEN = 21;
const KOLOMMEN = 21;
const BREEDTE = CELGROOTTE * KOLOMMEN;
const HOOGTE = CELGROOTTE * RIJEN;
```

## Stap 3: Het Kaartsjabloon Aanmaken

Definieer een 2D-array `KAART_SJABLOON` die het grid voorstelt.

- Gebruik getallen: 0 voor stip, 1 voor muur, 2 voor energizer, 3 voor leeg.
- Maak een 21x21-array met de doolhofindeling.

**Tip:** Je kunt een eenvoudig doolhofpatroon kopiëren of je eigen ontwerpen.

**Voorbeeld:**
```javascript
const KAART_SJABLOON = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  // ... meer rijen ...
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]
```

## Stap 4: Het Canvas Instellen

Maak in de `setup`-functie het canvas aan met de berekende breedte en hoogte.

**Tip:** Gebruik de eerder gedefinieerde constanten.

**Voorbeeld:**
```javascript
p.setup = function () {
  p.createCanvas(BREEDTE, HOOGTE)
}
```

## Stap 5: De genGrid-functie Aanmaken

Definieer een functie `genGrid` om het grid te tekenen op basis van het `KAART_SJABLOON`.

- Gebruik geneste lussen voor rijen en kolommen.
- Haal de celwaarde op uit de array.
- Bereken de x- en y-posities.
- Gebruik voorwaarden om muren, stippen of energizers te tekenen.

**Tip:** Zet `noStroke()` aan het begin.

**Voorbeeld:**
```javascript
const genGrid = () => {
  p.noStroke();
  for (let rij = 0; rij < RIJEN; rij++) {
    for (let kolom = 0; kolom < KOLOMMEN; kolom++) {
      const celWaarde = KAART_SJABLOON[rij][kolom];
      const x = kolom * CELGROOTTE;
      const y = rij * CELGROOTTE;
      if (celWaarde === 1) {
        p.fill(0, 0, 255); // Blauwe muren
        p.square(x, y, CELGROOTTE);
      } else if (celWaarde === 0) {
        p.fill(255); // Witte stippen
        p.circle(x + CELGROOTTE / 2, y + CELGROOTTE / 2, 5);
      } else if (celWaarde === 2) {
        p.fill(255, 0, 255); // Magenta energizers
        p.circle(x + CELGROOTTE / 2, y + CELGROOTTE / 2, 10);
      }
    }
  }
}
```

## Stap 6: Het Grid Tekenen

Stel in de `draw`-functie de achtergrond in en roep `genGrid` aan.

**Tip:** Houd het voorlopig eenvoudig.

**Voorbeeld:**
```javascript
p.draw = function () {
  p.background(0)
  genGrid();
}
```

## Stap 7: Testen en Aanpassen

Voer de sketch uit en controleer het grid.

- Komt het overeen met het sjabloon?
- Probeer het `KAART_SJABLOON` te wijzigen of voeg meer celtypen toe.

**Tip:** Gebruik de browserconsole om arrayproblemen op te sporen.

## Stap 8: Functies Exporteren uit Eerdere Workshops

Ervan uitgaande dat je de Pacman- en Spook-workshops hebt voltooid, exporteer je de functies `packman` en `spook` naar aparte JS-bestanden.

- Maak `packman.js` aan en exporteer de `packman`-functie.
- Maak `spook.js` aan en exporteer de `spook`-functie.

**Tip:** Gebruik `export default function packman(...)` of `export { packman }`.

**Voorbeeld (packman.js):**
```javascript
export default function packman(p, richting, x, y, grootte) {
  // ...packman-code...
}
```

## Stap 9: Functies Importeren in Grid

Importeer de functies `packman` en `spook` in je `GridView.vue`.

- Importeer bovenaan: `import packman from './packman.js'`
- Roep ze aan in de `draw`-functie om personages aan het grid toe te voegen.

**Tip:** Geef de p5-instantie mee aan de functies indien nodig.

**Voorbeeld:**
```javascript
import packman from '../scripts/packman.js'
import spook from '../scripts/spook.js'

// In draw:
packman(p, "rechts", 100, 100, 0.5)
spook(p, "red", 200, 200, 0.8)
```

## Stap 10: Personages Integreren

Combineer het grid met Pacman en spoken.

- Positioneer ze op het grid, bij voorkeur op lege plaatsen.

**Tip:** Hiermee maak je een complete scène.

## Bronnen

- [p5.js Referentie](https://p5js.org/reference/)
- [p5.js Tutorials](https://p5js.org/tutorials/)

