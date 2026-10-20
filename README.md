# DuoFix Service, voorbeeldsites

Drie demo's voor de pakketten Basis, Groei en Pro, plus een overzichtspagina.

- `/` overzicht met de drie pakketten
- `/basis/`, `/groei/`, `/pro/` de voorbeeldsites

Statische HTML, geen build nodig. Op Vercel: importeer de repo, Framework Preset "Other", geen build command.

De demo's staan op `noindex` (meta-tag, `robots.txt` en header in `vercel.json`) omdat ze voorbeeldreviews en een voorbeeld-BTW-nummer bevatten.

`_bron/` bevat de bronbestanden (wordt niet gedeployed).
