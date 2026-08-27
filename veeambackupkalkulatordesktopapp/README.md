# Veeam Backup Kalkulator – desktop-app (MSI)

Denne mappe er en færdig opskrift til at pakke `veeambackupkalkulator.html` som en
rigtig Windows-app med en `.msi`-installer – ikon i Startmenuen, eget app-vindue
uden browserens adresselinje, osv.

Selve kalkulatoren (`veeambackupkalkulator.html`) er uændret og fuldt selvstændig;
`main.js` er bare et tyndt Electron-vindue der åbner den.

## Sådan får du en færdig .msi-fil

Jeg kan ikke selv bygge og teste en Windows-installer her (intet Windows-miljø),
så MSI'en skal bygges af GitHub Actions på en rigtig Windows-maskine i skyen –
det er allerede sat op i `.github/workflows/build-msi.yml`. Du skal blot:

1. Opret et nyt (gerne privat) repo på GitHub, fx `veeam-backup-kalkulator`.
2. Push indholdet af denne mappe til repo'et:
   ```bash
   cd veeam-app
   git init
   git add .
   git commit -m "Initial desktop-app opsætning"
   git branch -M main
   git remote add origin https://github.com/<dit-brugernavn>/veeam-backup-kalkulator.git
   git push -u origin main
   ```
3. Gå ind på GitHub-repo'et → fanen **Actions**. Workflowet "Build MSI" starter
   automatisk (det kører også ved fremtidige pushes, og kan altid startes manuelt
   via "Run workflow").
4. Når den er færdig (et par minutter), åbn workflow-kørslen og hent artifact'en
   **veeam-backup-kalkulator-msi** – det er en zip med den færdige `.msi`-fil.

## Efterfølgende opdateringer

Når kalkulatoren opdateres, erstat blot `veeambackupkalkulator.html` i repo'et
med den nye version, push, og en ny MSI bygges automatisk.

## Udrulning til medarbejdere

MSI'en kan køres direkte af en bruger (dobbeltklik), eller rulles ud centralt via
jeres IT-værktøjer (Intune, GPO-softwareinstallation, SCCM osv.), da det er en
standard Windows Installer-pakke. Installationen er "per-bruger" som standard
(ingen admin-rettigheder krævet) – se `msi.perMachine` i `package.json` hvis I
hellere vil installere den for alle brugere på maskinen.

## Lokal test uden MSI (valgfrit)

Hvis en kollega med Node.js installeret vil teste appen uden at bygge en MSI:

```bash
npm install
npm start
```

## Filoversigt

- `main.js` – Electron-vinduet, indlæser `veeambackupkalkulator.html`.
- `veeambackupkalkulator.html` – selve kalkulatoren (kildesandheden – redigér her).
- `package.json` – app-info og build-opsætning (electron-builder, MSI-target).
- `build/icon.ico` – app-ikon.
- `.github/workflows/build-msi.yml` – bygger MSI'en automatisk på GitHub.
