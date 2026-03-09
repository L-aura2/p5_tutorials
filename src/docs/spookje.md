# Interactieve Spoken Maken


**Vereisten:** Basiskennis van JavaScript en Vue.js. Bekendheid met de p5.js-basis uit de Pacman-workshop is nuttig maar niet vereist.

## Stap 1: Je Vue-component Opzetten

Maak een nieuw Vue-component aan voor je spook-sketch, vergelijkbaar met die van Pacman.

- Importeer p5 en de Vue Composition API.
- Maak een ref aan voor de sketch-container.
- Maak p5 aan in `onMounted`.

**Tip:** Hergebruik de opzet uit de Pacman-workshop.

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

## Stap 2: Een Basiscanvas Aanmaken

Definieer de `setup`-functie om het canvas aan te maken.

- Gebruik `p.createCanvas(800, 600)` voor het tekengebied.

**Tip:** Dit is hetzelfde als bij Pacman.

**Voorbeeld:**
```javascript
const sketch = (p) => {
  p.setup = function () {
    p.createCanvas(800, 600)
  }

  // Draw-functie hier
}
```

## Stap 3: Een Basis Spookvorm Tekenen

Teken een eenvoudig spook met basisvormen: een cirkel voor het hoofd en een rechthoek voor het lichaam.

- Gebruik `p.circle()` voor het hoofd.
- Gebruik `p.rect()` voor het lichaam.
- Stel een vulkleur in en verwijder de omtrek.

**Tip:** Positioneer ze zodat de rechthoek begint onder de cirkel.

**Voorbeeld:**
```javascript
p.draw = function () {
  p.background(0)
  p.noStroke()
  p.fill('red')
  p.circle(90, 50, 80)  // Hoofd
  p.rect(50, 50, 80, 60)  // Lichaam
}
```

## Stap 4: Voetjes Toevoegen

Voeg golvende voetjes toe aan de onderkant met bogen.

- Gebruik `p.arc()` voor elk voetje, met een modus die alleen de onderste helft tekent.

**Tip:** Positioneer ze onder het lichaam, met `p.PI` voor de hoeken.

**Voorbeeld:**
```javascript
p.arc(65, 110, 30, 30, 0, p.PI)
p.arc(90, 110, 30, 30, 0, p.PI)
p.arc(115, 110, 30, 30, 0, p.PI)
```

## Stap 5: Ogen Toevoegen

Teken witte cirkels voor de ogen.

- Positioneer ze op het hoofd.
- Gebruik `p.fill(255)` voor wit.

**Tip:** Plaats ze symmetrisch.

**Voorbeeld:**
```javascript
p.fill(255)
p.circle(75, 50, 30)
p.circle(105, 50, 30)
```

## Stap 6: Pupillen de Muis Laten Volgen

Voeg zwarte pupillen toe die met de muis meebewegen.

- Gebruik `p.norm()` om de muispositie te normaliseren.
- Gebruik `p.map()` om te mappen naar oogposities.
- Gebruik `p.constrain()` om binnen de oogbegrenzing te blijven.
- Teken zwarte cirkels voor de pupillen.

**Tip:** Bereken aparte x en y voor elk oog.

**Voorbeeld:**
```javascript
let waardeX = p.norm(p.mouseX, 400, 800)
let waardeY = p.norm(p.mouseY, 300, 600)

let xO1 = p.constrain(p.map(waardeX, 0, 1, 65, 85), 70, 80)
let xO2 = p.constrain(p.map(waardeX, 0, 1, 95, 115), 100, 110)
let yO1 = p.constrain(p.map(waardeY, 0, 1, 40, 65), 45, 55)
let yO2 = p.constrain(p.map(waardeY, 0, 1, 40, 65), 45, 55)

p.fill(0)
p.circle(xO1, yO1, 20)
p.circle(xO2, yO2, 20)
```

## Stap 7: Een Mond Toevoegen

Teken een eenvoudige mond met een boog.

- Gebruik `p.arc()` met een omtrek voor de glimlach.

**Tip:** Positioneer hem onder de ogen.

**Voorbeeld:**
```javascript
p.noFill()
p.stroke(0)
p.arc(90, 65, 30, 30, p.PI * 0.25, p.PI * 0.75)
```

## Stap 8: Refactoren naar een Functie met Variabelen

Verplaats de spook-tekencode naar een herbruikbare functie genaamd `spook` met parameters voor kleur, x, y en grootte.

- Definieer de functie `spook(kleur, x, y, grootte)`.
- Gebruik `p.push()`, `p.translate(x, y)`, `p.scale(grootte)` binnen de functie.
- Stel de kleur dynamisch in.

**Tip:** Roep `p.pop()` aan het einde aan om het coördinatenstelsel te herstellen.

**Voorbeeld:**
```javascript
const spook = (kleur = 'red', x = 0, y = 0, grootte = 1) => {
  p.push()
  p.translate(x, y)
  p.scale(grootte)
  p.fill(kleur)
  p.noStroke()
  p.circle(90, 50, 80)  // Hoofd
  p.rect(50, 50, 80, 60)  // Lichaam
  p.arc(65, 110, 30, 30, 0, p.PI)
  p.arc(90, 110, 30, 30, 0, p.PI)
  p.arc(115, 110, 30, 30, 0, p.PI)
  p.fill(255)
  p.circle(75, 50, 30)
  p.circle(105, 50, 30)
  let waardeX = p.norm(p.mouseX, 400, 800)
  let waardeY = p.norm(p.mouseY, 300, 600)
  let xO1 = p.constrain(p.map(waardeX, 0, 1, 65, 85), 70, 80)
  let xO2 = p.constrain(p.map(waardeX, 0, 1, 95, 115), 100, 110)
  let yO1 = p.constrain(p.map(waardeY, 0, 1, 40, 65), 45, 55)
  let yO2 = p.constrain(p.map(waardeY, 0, 1, 40, 65), 45, 55)
  p.fill(0)
  p.circle(xO1, yO1, 20)
  p.circle(xO2, yO2, 20)
  p.noFill()
  p.stroke(0)
  p.arc(90, 65, 30, 30, p.PI * 0.25, p.PI * 0.75)
  p.pop()
}

p.draw = function () {
  p.background(0)
  spook()
}
```

## Stap 9: Meerdere Spoken Tekenen

Roep in `draw` de `spook`-functie meerdere keren aan met verschillende parameters.

- Varieer kleur, positie en grootte.

**Tip:** Hiermee maak je een scène met meerdere spoken.

**Voorbeeld:**
```javascript
p.draw = function () {
  p.background(0)
  spook()
  spook('green', 150, 150, 0.8)
  spook('pink', 250, 30, 1.2)
  spook('purple', 400, 200)
}
```

## Stap 10: Testen en Verbeteren

Voer de sketch uit en test de muisinteractie.

- Volgen de ogen soepel?
- Experimenteer met verschillende kleuren, groottes, of voeg meer functies toe zoals animatie.

**Tip:** Pas de mapping-bereiken aan voor een betere oogbeweging.

## Bronnen

- [p5.js Referentie](https://p5js.org/reference/)
- [p5.js Tutorials](https://p5js.org/tutorials/)
