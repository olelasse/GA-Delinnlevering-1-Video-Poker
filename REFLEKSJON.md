# Refleksjon – Video Poker

## Innledning og planlegging

Jeg startet kodingen rett etter undervisningen 8. september. Prosjektet ble initialisert med Vite, React og TypeScript. Tidlig i prosessen opprettet jeg mappestrukturen, types-definisjonene og kjernekomponentene som var spesifisert i oppgaveteksten. Siden et spill som Video Poker fort kan vokse i kompleksitet, var målet fra start å ha en ryddig og modulær arkitektur, samt holde en konsekvent kodestandard med header-nivå TSDoc for god dokumentasjon.

## Valg av løsning og arkitektur

### Tilstandshåndtering med Zustand og persistens

Jeg valgte å benytte Zustand til all global tilstandshåndtering. Store-en håndterer spillere, aktiv spiller, myntbeholdning, faser i spillet, kortstokk, hånd, kasserte kort og indekser for kort som holdes. Ved hjelp av `persist`-middleware lagres tilstanden automatisk i `localStorage`. Dette sikrer at en pågående runde, inkludert markerte kort (HOLD) og saldo, ikke går tapt dersom spilleren navigerer til andre undersider eller oppdaterer nettleseren.

### Design og oppbygning av `<Card>` (og kortbaksiden)

I henhold til kravspesifikasjonen er spillkortet bygget ved hjelp av ren CSS og CSS Grid[cite: 1]. For visning av kortets bakside valgte jeg å integrere denne logikken direkte i `<Card>`-komponenten via en prop (`faceUp: boolean`), fremfor å opprette en separat komponent[cite: 1].

**Begrunnelse for dette valget:**

1. **Domene-sammenheng:** Et fysisk spillkort er én og samme entitet, uavhengig av om det ligger med billedsiden opp eller ned. Å splitte dette i to ulike komponenter ville ført til unødvendig duplisering av ytre dimensjoner, wrapper-elementer, tilgjengelighetshåndtering (`aria-pressed`) og klikk-logikk[cite: 1].
2. **Enkelhet i konsumerende komponenter:** Foreldrekomponenten `<Game>` forholder seg kun til `<Card>` og trenger ikke å gjøre betinget rendering av to helt ulike komponenter basert på tilstand[cite: 1].
3. **Universell utforming:** Tilgjengelighetstransparens for skjermlesere og tastaturnavigasjon holdes samlet og forutsigbart i ett felles `<button>`-element[cite: 1].

### Sannsynlighet og stokking

For kortstokken implementerte jeg Fisher-Yates shuffle-algoritmen[cite: 1]. Dette ble valgt for å unngå skjevfordeling (bias) som ofte oppstår ved enkle snarveier som `array.sort(() => Math.random() - 0.5)`. Hver runde trekkes fra en fersk 52-korts stokk[cite: 1].

## Feil og utfordringer underveis

- **Tilstandstap ved navigering:** I en tidlig versjon lå listen over kort som holdes (`heldCards`) i en lokal `useState` i `Game.tsx`[cite: 1]. Dette førte til at markerte kort forsvant hvis man navigerte til regelsiden og tilbake[cite: 1]. Løsningen var å løfte `heldCards` og tilhørende toggle-action inn i Zustand-store-en, slik at de inngår i `localStorage`-persisteringen[cite: 1].
- **TypeScript og felles kilder til sannhet:** Underveis oppstod det overlappende typer for evalueringsresultat og pokerhender[cite: 1]. Dette ble ryddet opp ved å konsolidere alle hender i `PokerHand` og hente felles data fra `rules.ts`[cite: 1].
- **Ess som lavt kort (Wheel Straight):** Under evaluering av straight var det en utfordring at ess normalt har verdi 14, mens `A-2-3-4-5` krever at ess teller som 1[cite: 1]. Dette ble løst ved en eksplisitt sjekk på «The Wheel» (`[2, 3, 4, 5, 14]`)[cite: 1].

## Konklusjon og læring

Prosjektet har gitt dypere forståelse for hvordan React, Zustand, React Router og TypeScript spiller sammen for å skape en robust og tilstandssikker webapplikasjon[cite: 1].
