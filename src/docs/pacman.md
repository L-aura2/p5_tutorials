# Een Draaiende Pacman Maken met p5.js

**Vereisten:** Basiskennis van JavaScript en Vue.js (omdat we werken in een Vue-component). Als je nieuw bent met p5.js, geen zorgen — we leiden je stap voor stap door het proces.

## Stap 1: Je Vue-component Opzetten

Begin met het aanmaken van een nieuw Vue-component voor je Pacman-sketch. Je hebt p5 nodig en een ref voor de sketch-container.

- Importeer in je Vue-bestand (bijv. `PacmanView.vue`) p5 en de Vue Composition API.
- Maak een ref aan voor de container-div waar p5 het canvas zal renderen.
- Maak in `onMounted` een nieuw p5-instantie aan met je sketch-functie.

**Tip:** Kijk hoe andere views in je project p5 instellen. Wat moet je importeren en hoe maak je de p5-instantie aan?

**Voorbeeld:**

```javascript
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const sketchContainer = ref(null)
let p5Instance = null

// Je sketch-functie hier

onMounted(() => {
  if (sketchContainer.value) {
    p5Instance = new p5(sketch, sketchContainer.value)
  }
})
```

## Stap 2: Een Basiscanvas Aanmaken

Definieer in je sketch-functie de `setup`-functie om een canvas aan te maken.

- Gebruik `p.createCanvas(breedte, hoogte)` om je tekengebied in te stellen.
- Kies geschikte afmetingen, zoals 800x600.

**Tip:** De `setup`-functie wordt eenmalig uitgevoerd bij het begin. Waar definieer je hem in je sketch?

**Voorbeeld:**

```javascript
const sketch = (p) => {
  p.setup = function () {
    p.createCanvas(800, 600)
  }

  // Andere functies zoals draw komen hier
}
```

## Stap 3: Een Statische Pacman Tekenen

Laten we Pacman tekenen als een eenvoudige vorm. Pacman is in principe een gele cirkel met een hap eruit.

- Stel in de `draw`-functie de achtergrond in op zwart.
- Gebruik `p.fill()` om de kleur in te stellen op geel (255, 255, 0).
- Gebruik `p.arc()` om een taartvormige boog te tekenen voor Pacman.

**Tip:** De `arc`-functie heeft de volgende parameters: x, y, breedte, hoogte, beginhoek, eindhoek, modus. Voor een volledige cirkel, wat zouden de begin- en eindhoek dan zijn? Voor Pacman willen we een hap, dus pas de hoeken aan.

**Voorbeeld:**

```javascript
p.draw = function () {
  p.background(0)
  p.fill(255, 255, 0)
  p.arc(250, 250, 280, 280, 0, p.TWO_PI, p.PIE)  // Volledige cirkel voor nu
}
```

## Stap 4: De Hap Animeren

Laat de mond van Pacman open- en dichtgaan om eten te simuleren.

- Gebruik `p.frameCount` om animatie te maken.
- Bereken de hapgrootte met een sinusgolf: zoiets als `hapGrootte * sin(frameCount * snelheid)`.
- Pas de begin- en eindhoek hierop aan.

**Tip:** Onthoud dat hoeken in p5.js in radialen zijn. `PI` is ongeveer 3,14, `TWO_PI` is een volledige cirkel.

**Voorbeeld:**

```javascript
let hapGrootte = p.PI / 16
let beginHoek = hapGrootte * p.sin(p.frameCount * 0.1) + hapGrootte
let eindHoek = p.TWO_PI - beginHoek
p.arc(250, 250, 280, 280, beginHoek, eindHoek, p.PIE)
```

## Stap 5: Richting Bijhouden

Introduceer een variabele om de richting van Pacman bij te houden.

- Declareer een variabele zoals `let richting = "rechts";` buiten de sketch-functie.
- Denk na over mogelijke richtingen: omhoog, omlaag, links, rechts.

**Tip:** Waar moet je deze variabele declareren zodat hij toegankelijk is in de sketch?

**Voorbeeld:**

```javascript
let richting = "rechts"  // Declareer buiten de sketch-functie
```

## Stap 6: Toetsenbordinvoer Verwerken

Laat de gebruiker van richting wisselen met toetsen.

- Controleer in de `draw`-functie of een toets ingedrukt is met `p.keyIsPressed`.
- Koppel toetsen aan richtingen: bijv. 'z' voor omhoog, 'q' voor links, 's' voor omlaag, 'd' voor rechts.

**Tip:** Gebruik `p.key` om de ingedrukte toets op te halen. Vergeet niet om zowel hoofdletters als kleine letters te verwerken indien nodig.

**Voorbeeld:**

```javascript
if (p.keyIsPressed) {
  if (p.key === 'z') {
    richting = "omhoog"
  } else if (p.key === 'q') {
    richting = "links"
  } else if (p.key === 's') {
    richting = "omlaag"
  } else if (p.key === 'd') {
    richting = "rechts"
  }
}
```

## Stap 7: Pacman Draaien op Basis van Richting

Pas de booghoeken aan zodat Pacman de juiste kant op kijkt.

- Voeg afhankelijk van de richting een offset toe aan de begin- en eindhoek.
- Voor "omlaag" voeg je bijvoorbeeld `HALF_PI` (90 graden) toe.

**Tip:** `HALF_PI` is 90 graden, `PI` is 180, enzovoort. Hoeveel moet je optellen voor elke richting?

**Voorbeeld:**

```javascript
if (richting === "omlaag") {
  beginHoek += p.HALF_PI
  eindHoek += p.HALF_PI
} else if (richting === "links") {
  beginHoek += p.PI
  eindHoek += p.PI
} else if (richting === "omhoog") {
  beginHoek += 3 * p.HALF_PI
  eindHoek += 3 * p.HALF_PI
}
// Teken daarna de boog
```

## Stap 8: Een Oog Toevoegen

Pacman heeft een oog nodig om meer op het karakter te lijken.

- Teken een kleine zwarte cirkel voor het oog.
- Positioneer hem relatief aan het middelpunt van Pacman en pas de positie aan op basis van de richting.

**Tip:** Gebruik een extra `arc` of `ellipse` voor het oog. Waar moet het geplaatst worden voor elke richting?

**Voorbeeld:**

```javascript
p.fill(0)
let x = 250
let y = 200  // Boven het middelpunt voor naar rechts kijken
if (richting === "omlaag" || richting === "omhoog") {
  x = 200  // Links voor verticale richtingen
  y = 250
}
p.arc(x, y, 40, 40, 0, p.PI + p.PI)
```

## Stap 9: Refactoren naar een Functie

Verplaats de tekenlogica van Pacman naar een aparte functie om je code overzichtelijk te houden.

- Maak een `pacman()`-functie aan binnen de sketch.
- Roep hem aan vanuit `draw`.

**Tip:** Je kunt hem zelfs naar een apart bestand verplaatsen, zoals `pacman.js`, en importeren.

**Voorbeeld:**

```javascript
const pacman = () => {
  // Alle Pacman-tekencode hier
}

p.draw = function () {
  p.background(0)
  pacman()
}
```

## Stap 10: Testen en Verbeteren

Voer je sketch uit en test de bediening.

- Draait Pacman soepel?
- Kun je meer functies toevoegen, zoals beweging of botsingsdetectie?

**Tip:** Gebruik de ontwikkelaarstools van de browser om problemen op te sporen.

## Bronnen

- [p5.js Referentie](https://p5js.org/reference/)
- [p5.js Tutorials](https://p5js.org/tutorials/)

