# Blitz&Blank - Vollständige Anleitung

## 🎉 Willkommen!

Ihre neue Webseite für Blitz&Blank ist fertig! Diese Anleitung hilft Ihnen, die Webseite zu starten und zu verwenden.

## 📋 Anmeldedaten

**Wichtig:** Speichern Sie diese Anmeldedaten sicher!

- **Benutzername:** `Ihsan2002`
- **Passwort:** `ii2002alattar`

## 🚀 Webseite starten

### Auf Ihrem Computer (lokal)

1. **Node.js installieren** (falls nicht vorhanden)
   - Gehen Sie zu https://nodejs.org/
   - Laden Sie die LTS-Version herunter und installieren Sie sie

2. **Projekt-Ordner öffnen**
   - Navigieren Sie zum Ordner `blitz-blank-new`

3. **Terminal öffnen**
   - Windows: Rechtsklick → "PowerShell hier öffnen"
   - Mac/Linux: Rechtsklick → "Terminal öffnen"

4. **Abhängigkeiten installieren** (nur beim ersten Mal)
   ```bash
   npm install
   ```

5. **Server starten**
   ```bash
   npm start
   ```

6. **Webseite öffnen**
   - Öffnen Sie Ihren Browser
   - Gehen Sie zu: `http://localhost:3000`

## 🌐 Webseite online stellen

Um die Webseite für andere zugänglich zu machen, können Sie folgende Optionen nutzen:

### Option 1: Netlify (kostenlos und einfach)
1. Gehen Sie zu https://netlify.com
2. Melden Sie sich an
3. Klicken Sie auf "New site from Git"
4. Verbinden Sie Ihr GitHub-Repository
5. Netlify wird die Webseite automatisch deployen

### Option 2: Heroku
1. Gehen Sie zu https://heroku.com
2. Erstellen Sie ein neues Projekt
3. Verbinden Sie Ihr Repository
4. Heroku wird die Webseite starten

### Option 3: Ihr eigener Server
Wenn Sie einen Server haben, können Sie die Dateien dort hochladen und den Node.js-Server starten.

## 🔐 Admin-Panel verwenden

### Anmelden
1. Klicken Sie auf **"Admin"** in der Navigation
2. Geben Sie ein:
   - Benutzername: `Ihsan2002`
   - Passwort: `ii2002alattar`
3. Klicken Sie auf **"Anmelden"**

### Firmeninformationen bearbeiten
Nach dem Anmelden können Sie folgende Informationen ändern:
- **Inhaber:** Name des Inhabers
- **Standort:** Stadt/Region
- **E-Mail:** Kontakt-E-Mail
- **Telefon 1, 2, 3:** Telefonnummern
- **Willkommens-Titel:** Hauptüberschrift auf der Startseite
- **Willkommens-Tagline:** Untertitel
- **Willkommens-Text:** Beschreibungstext

Klicken Sie auf **"Speichern"**, um die Änderungen zu speichern.

### Leistungen verwalten
Sie können Ihre Leistungen bearbeiten, neue hinzufügen oder löschen:

**Leistung bearbeiten:**
- Ändern Sie Icon, Titel oder Beschreibung
- Klicken Sie auf **"Speichern"**

**Neue Leistung hinzufügen:**
- Klicken Sie auf **"Neue Leistung hinzufügen"**
- Geben Sie ein:
  - Icon (Emoji, z.B. 🧹, 🏠, ✨)
  - Titel (z.B. "Fensterreinigung")
  - Beschreibung
- Klicken Sie auf **"Speichern"**

**Leistung löschen:**
- Klicken Sie auf **"Löschen"** bei der Leistung, die Sie entfernen möchten

## 📁 Projektstruktur

```
blitz-blank-new/
├── server.js              # Backend-Server
├── package.json           # Abhängigkeiten
├── .env                   # Umgebungsvariablen
├── data.db               # Datenbank (wird automatisch erstellt)
├── public/
│   ├── index.html        # Hauptseite
│   ├── styles.css        # Design
│   └── app.js            # Interaktivität
├── README.md             # Technische Dokumentation
└── SETUP_GUIDE.md        # Diese Datei
```

## 🔧 Häufig gestellte Fragen

### F: Wie ändere ich das Passwort?
A: Sie müssen den Code anpassen. Suchen Sie in `server.js` nach dem Passwort und ändern Sie es.

### F: Kann ich das Design ändern?
A: Ja! Bearbeiten Sie `public/styles.css` für Farben und Layout.

### F: Wie sichern ich meine Daten?
A: Die Datei `data.db` enthält alle Ihre Daten. Sichern Sie diese Datei regelmäßig.

### F: Was ist, wenn der Server nicht startet?
A: Überprüfen Sie, ob Port 3000 frei ist. Wenn nicht, ändern Sie den PORT in `.env`.

### F: Kann ich die Webseite auf meinem Handy testen?
A: Ja! Wenn Sie auf dem gleichen Netzwerk sind, geben Sie die IP-Adresse Ihres Computers ein.

## 📞 Support

Wenn Sie Probleme haben:
1. Überprüfen Sie die Konsole (F12) auf Fehler
2. Lesen Sie die `README.md` für technische Details
3. Überprüfen Sie die Server-Logs

## 🎯 Nächste Schritte

1. ✅ Webseite lokal testen
2. ✅ Admin-Panel testen und Daten anpassen
3. ✅ Webseite online stellen (Netlify, Heroku, etc.)
4. ✅ Domain registrieren und verbinden
5. ✅ Regelmäßig aktualisieren und warten

---

**Viel Erfolg mit Ihrer neuen Webseite! 🚀**

Bei Fragen können Sie den Code anpassen oder einen Webentwickler konsultieren.
