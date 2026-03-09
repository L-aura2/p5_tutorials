# Pacman Gevorderde : Herbruikbare Pacman met Variabelen

Voortbouwend op de basis Pacman-workshop passen we de `packman`-functie aan zodat hij parameters accepteert voor richting, grootte, x en y, waardoor hij herbruikbaar wordt voor meerdere instanties.

**Vereisten:** De basis Pacman-workshop afgerond. Bekend met functies en parameters.

## Stap 1: De packman-functie Aanpassen

Pas de `packman`-functie aan zodat hij parameters accepteert: `packman(direction, x, y, size)`.

- Gebruik `p.push()`, `p.translate(x, y)`, `p.scale(size)` voor positionering en schaling.
- Pas de richtingslogica aan om de parameter te gebruiken.

**Tip:** Stel standaardwaarden in voor de parameters.

**Voorbeeld:**

```javascript
const packman = (direction = "right", x = 250, y = 250, size = 1) => {
  p.push()
  p.translate(x, y)
  p.scale(size)
  // ...bestaande code...
  p.pop()
}
```

## Stap 2: Richtingsverwerking Aanpassen

Gebruik binnen de functie de `direction`-parameter om de hoekoffsets in te stellen.

- Gebruik de parameter in plaats van een globale richtingsvariabele.

**Tip:** Bewaar de toetsafhandeling buiten de functie indien nodig, maar geef de richting door via de parameter voor herbruikbaarheid.

**Voorbeeld:**

```javascript
let beginHoek = hapGrootte * p.sin(p.frameCount * 0.1) + hapGrootte
let eindHoek = p.TWO_PI - beginHoek
if (direction === "down") {
  beginHoek += p.HALF_PI
  eindHoek += p.HALF_PI
} // enz.
```

## Stap 3: De Draw-aanroep Bijwerken

Roep `packman` in `draw` aan met de gewenste parameters.

- Geef richting, x, y en size mee.

**Tip:** Je kunt meerdere Pacmannetjes tekenen door de functie meerdere keren aan te roepen.

**Voorbeeld:**

```javascript
p.draw = function () {
  p.background(0)
  packman("right", 250, 250, 1)
}
```

## Stap 4: Herbruikbaarheid Testen

Test met verschillende parameters.

- Verander richting, grootte en positie.

**Tip:** Hiermee kun je meerdere Pacmannetjes of variaties maken.

## Bronnen

- [p5.js Referentie](https://p5js.org/reference/)

