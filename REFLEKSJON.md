# Refleksjon – Video Poker

## Innledning og planlegging

Jeg startet kodingen rett etter undervisningen 8. september. Prosjektet ble initialisert med Vite, React og TypeScript. Tidlig i prosessen opprettet jeg mappestrukturen, types-definisjonene og kjernekomponentene som var spesifisert i oppgaveteksten. Siden et spill som Video Poker kan være ganske komplekst, var målet fra start å ha en ryddig kode, og være modulbasert. Og etter en sesjon med Karl-Morten, holde en konsekvent kodestandard med header-nivå TSDoc for god dokumentasjon.

## Valg av løsning og arkitektur

### Tilstandshåndtering med Zustand og persistens

Jeg valgte å benytte Zustand til all global tilstandshåndtering. Jeg startet med useState, men bygde om til Zustand etter undervisningen vi hadde med Zustand. Store-en håndterer spillere, aktiv spiller, myntbeholdning, faser i spillet, kortstokk, hånd, kasserte kort og indekser for kort som holdes. Ved hjelp av `persist`-middleware lagres tilstanden automatisk (automagisk) i `localStorage`. Dette sikrer at en pågående runde, inkludert markerte kort (HOLD) og saldo, ikke går tapt dersom spilleren navigerer til andre undersider eller oppdaterer nettleseren. Akkuratt slik kravet var.

### Design og oppbygning av `<Card>` (og kortbaksiden)

I henhold til kravspesifikasjonen er spillkortet bygget ved hjelp av ren CSS og CSS Grid. For visning av kortets bakside valgte jeg å integrere denne logikken direkte i `<Card>`-komponenten via en prop (`faceUp: boolean`), fremfor å opprette en separat komponent.

**Begrunnelse for dette valget:**

1. **Sammenheng:** Et spillkort er én og samme entitet, uavhengig av om det ligger med billedsiden opp eller ned. Å splitte dette i to ulike komponenter ville ført til unødvendig duplisering av kode, styling og klikk-logikk.
2. **Enkelhet i komponenter:** Foreldrekomponenten `<Game>` forholder seg kun til `<Card>` og trenger ikke å gjøre betinget rendering av to helt ulike komponenter basert på tilstand.
3. **Universell utforming:** Tilgjengelighetstransparens for skjermlesere og tastaturnavigasjon holdes samlet og forutsigbart i ett felles `<button>`-element.

### Sannsynlighet og stokking

For kortstokken implementerte jeg Fisher-Yates shuffle-algoritmen (takk til Karl-Morten). Dette ble valgt for å unngå skjevfordeling som ofte oppstår ved enkle snarveier som `array.sort(() => Math.random() - 0.5)`. Hver runde trekkes fra en fersk 52-korts stokk. Jeg tenkte først at jeg ville bruke en 52-korts kortstokk til det ikke var flere kort igjen, men så ikke helt behovet for å gjøre det unødig komplisert.

## Feil og utfordringer underveis

- **Tilstandstap ved navigering:** I en tidlig versjon lå listen over kort som holdes (`heldCards`) i en lokal `useState` i `Game.tsx`. Dette førte til at markerte kort forsvant hvis man navigerte til regelsiden og tilbake. Løsningen var å løfte `heldCards` og tilhørende toggle-action inn i Zustand-store-en, slik at de inngår i `localStorage`-persisteringen.
- **TypeScript og felles kilder til sannhet:** Underveis oppstod det overlappende typer for evalueringsresultat og pokerhender. Dette ble ryddet opp ved å slå sammen alle hender i `PokerHand` og hente felles data fra `rules.ts`.
- **Ess som lavt kort (Wheel Straight):** Under evaluering av straight var det en utfordring at ess normalt har verdi 14, mens `A-2-3-4-5` krever at ess teller som 1. Dette ble løst ved en eksplisitt sjekk på «The Wheel» (`[2, 3, 4, 5, 14]`). (Takk til Wiki: https://en.wikipedia.org/wiki/List_of_poker_hands)

## Konklusjon og læring

Prosjektet har gitt dypere forståelse for hvordan React, Zustand, React Router og TypeScript spiller sammen for å skape en og tilstandssikker webapplikasjon. Samtidig er jeg glad for at jeg studerer dette i 2026, hadde jeg ikke hatt mulighet til å bruke Google for å søke opp løsninger, lese opp dokumentasjon på TypeScript, React, Zustand etc. Og Samtidig kunne bruke AI (som Gemini) til en samtalepartner for å finne problemer i koden jeg slet med å finne, pga alle komponenter og filer overalt. Og måten mad koder React, med store arrow function løsninger, så trenger man å holde tunga rett i munnen. Og mot slutten så vil jeg si at jeg har brukt mye tid på å tenke på koden og hvordan jeg best burde lage den, før jeg klarte å skrive den inn, da alt er modul basert, og man må huske hvilken type er hvor, og hvilken useState eller Zustand-state er brukt.
