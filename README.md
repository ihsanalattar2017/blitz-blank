# Blitz&Blank - Webseite mit Admin-Panel

Professionelle Webseite für die Reinigungsfirma Blitz&Blank mit integriertem Admin-Panel zur Bearbeitung von Inhalten.

## Features

- ✅ Moderne, responsive Webseite
- ✅ Admin-Panel mit Authentifizierung (Benutzername + Passwort)
- ✅ Bearbeitung von Firmeninformationen
- ✅ Verwaltung von Leistungen (hinzufügen, bearbeiten, löschen)
- ✅ SQLite-Datenbank für Datenspeicherung
- ✅ Sichere Passwort-Verschlüsselung mit bcrypt

## Anmeldedaten

- **Benutzername:** `Ihsan2002`
- **Passwort:** `ii2002alattar`

## Installation

1. **Node.js installieren** (falls nicht vorhanden)
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Server starten**
   ```bash
   npm start
   ```

4. **Webseite öffnen**
   - Öffnen Sie Ihren Browser und gehen Sie zu: `http://localhost:3000`

## Verwendung

### Webseite anschauen
Die Webseite ist öffentlich zugänglich. Besucher können:
- Alle Leistungen sehen
- Kontaktinformationen abrufen
- Ein Kontaktformular ausfüllen

### Admin-Panel nutzen
1. Klicken Sie auf **"Admin"** in der Navigation
2. Geben Sie Ihre Anmeldedaten ein:
   - Benutzername: `Ihsan2002`
   - Passwort: `ii2002alattar`
3. Nach erfolgreicher Anmeldung können Sie:
   - **Firmeninformationen bearbeiten:** Name, Standort, E-Mail, Telefonnummern, Willkommenstext
   - **Leistungen verwalten:** Neue Leistungen hinzufügen, vorhandene bearbeiten oder löschen

## Projektstruktur

```
blitz-blank-new/
├── server.js              # Express-Server und API-Endpoints
├── package.json           # Abhängigkeiten
├── .env                   # Umgebungsvariablen
├── data.db               # SQLite-Datenbank (wird automatisch erstellt)
├── public/
│   ├── index.html        # Hauptseite
│   ├── styles.css        # Stylesheet
│   └── app.js            # Frontend-JavaScript
└── README.md             # Diese Datei
```

## API-Endpoints

### Öffentliche Endpoints
- `GET /api/company-info` - Firmeninformationen abrufen
- `GET /api/services` - Alle Leistungen abrufen

### Geschützte Endpoints (erfordern Authentifizierung)
- `POST /api/login` - Anmelden
- `POST /api/company-info` - Firmeninformationen aktualisieren
- `POST /api/services` - Neue Leistung hinzufügen
- `POST /api/services/:id` - Leistung aktualisieren
- `DELETE /api/services/:id` - Leistung löschen

## Datenbank

Die Anwendung verwendet SQLite mit folgenden Tabellen:

### users
- `id` - Eindeutige ID
- `username` - Benutzername
- `password` - Verschlüsseltes Passwort

### company_info
- `id` - Eindeutige ID
- `owner_name` - Name des Inhabers
- `location` - Standort
- `email` - E-Mail-Adresse
- `phone1, phone2, phone3` - Telefonnummern
- `welcome_title` - Willkommens-Titel
- `welcome_tagline` - Willkommens-Tagline
- `welcome_text` - Willkommens-Text

### services
- `id` - Eindeutige ID
- `icon` - Emoji oder Icon
- `title` - Titel der Leistung
- `description` - Beschreibung
- `order_index` - Sortierungsreihenfolge

## Sicherheit

- Passwörter werden mit bcrypt verschlüsselt
- API-Endpoints sind durch Authentifizierung geschützt
- CORS ist aktiviert für externe Anfragen

## Anpassungen

### Passwort ändern
Um das Admin-Passwort zu ändern, müssen Sie die Datenbank direkt bearbeiten oder den Code anpassen.

### Port ändern
Ändern Sie den PORT in der `.env`-Datei:
```
PORT=8080
```

### Design anpassen
Bearbeiten Sie `public/styles.css` für Farbänderungen und Layout-Anpassungen.

## Deployment

Um die Anwendung online zu stellen, können Sie folgende Optionen nutzen:

- **Heroku** - Kostenlos mit Einschränkungen
- **Railway** - Einfache Bereitstellung
- **Render** - Kostenlos mit Limits
- **Ihr eigener Server** - Vollständige Kontrolle

## Troubleshooting

### Port ist bereits in Verwendung
```bash
# Finden Sie den Prozess, der Port 3000 nutzt
lsof -i :3000

# Beenden Sie den Prozess
kill -9 <PID>
```

### Datenbank-Fehler
Löschen Sie die `data.db`-Datei und starten Sie den Server neu. Eine neue Datenbank wird automatisch erstellt.

### Anmeldung funktioniert nicht
Stellen Sie sicher, dass Sie die korrekten Anmeldedaten verwenden:
- Benutzername: `Ihsan2002`
- Passwort: `ii2002alattar`

## Support

Bei Fragen oder Problemen können Sie:
- Den Code überprüfen und anpassen
- Die Browser-Konsole (F12) auf Fehler prüfen
- Die Server-Logs überprüfen

---

**Version:** 1.0  
**Erstellt:** 2025  
**Für:** Blitz&Blank Reinigungsfirma

