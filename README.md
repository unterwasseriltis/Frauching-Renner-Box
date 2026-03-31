# Simulation des Frauchiger-Renner-Gedankenexperiments

Eine interaktive, browserbasierte Webanwendung zur Simulation des berühmten Frauchiger-Renner-Gedankenexperiments aus der Quantenmechanik. Die Anwendung ermöglicht es, das Experiment schrittweise durchzuspielen, Messungen durchzuführen und das auftretende Paradoxon zu beobachten.

## Projektübersicht

Diese Simulation veranschaulicht das 2018 von Daniela Frauchiger und Renato Renner vorgeschlagene Gedankenexperiment. Es handelt sich um eine Erweiterung des klassischen Wigner’s-Friend-Paradoxons und stellt die Frage, ob die Quantentheorie universell anwendbar ist – auch auf komplexe Systeme, die selbst Beobachter (Agenten) enthalten, welche die Quantentheorie anwenden.

Die Anwendung bietet:
- Schritt-für-Schritt-Durchlauf durch die fünf Phasen des Experiments
- Interaktive Messungen mit korrekten Wahrscheinlichkeiten
- Permanente Statusanzeige auf der rechten Bildschirmseite (Quantenzustände, Wissen der Agenten, Paradox-Status)
- Modernes, vollflächiges Design mit Glassmorphism-Effekt und optionalem Hintergrundbild
- Möglichkeit, die Simulation mehrmals zu wiederholen, um das Paradoxon (mit einer Wahrscheinlichkeit von ca. 1/12) zu beobachten

## Technische Voraussetzungen

- Ein moderner Webbrowser (Chrome, Firefox, Edge oder Safari)
- Optional: VS Code mit der Erweiterung „Live Server“ für komfortable Entwicklung

## Installation und Start

1. Öffnen Sie den Projektordner in Visual Studio Code.
2. Stellen Sie sicher, dass die folgenden Dateien vorhanden sind:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md` (diese Datei)
3. (Optional) Fügen Sie ein Hintergrundbild hinzu:
   - Legen Sie eine Bilddatei (z. B. `background.jpg`) in den Projektordner.
   - Passen Sie den Dateinamen in `style.css` an (Zeile mit `url('background.jpg')`).
4. Öffnen Sie `index.html` mit der Live-Server-Erweiterung oder direkt im Browser.

Die Simulation startet sofort und läuft vollständig clientseitig (kein Server notwendig).

## Bedienung der Simulation

Die Oberfläche ist in zwei Bereiche unterteilt:
- **Linker Hauptbereich**: Narrativer Ablauf, Phasenbeschreibung, Eingabemöglichkeiten und Ergebnisanzeige.
- **Rechte Sidebar**: Permanenter „Aktueller Stand“ mit Quantenzuständen, Wissen der vier Agenten und Messungsverlauf.

**Ablauf:**
1. **Phase 1**: System vorbereiten (initialer Quantenzustand von Qubit R).
2. **Phase 2–5**: Klicken Sie jeweils auf „Messung durchführen“, um die entsprechende Messung auszuführen.
3. Nach jeder Phase auf „Weiter zur nächsten Phase“ klicken.
4. Wiederholen Sie die Simulation mehrmals, um das seltene Paradoxon zu beobachten.

**Reset**: Über den Button oben rechts kann die Simulation jederzeit zurückgesetzt werden.

## Erläuterung des Frauchiger-Renner-Gedankenexperiments

### Hintergrund und Ziel
Das Gedankenexperiment von Frauchiger und Renner (veröffentlicht 2018 in *Nature Communications*) untersucht, ob die Quantenmechanik konsistent auf sich selbst angewendet werden kann. Konkret: Kann die Theorie komplexe Systeme beschreiben, die selbst Agenten (Beobachter) enthalten, welche wiederum die Quantentheorie zur Vorhersage von Messergebnissen nutzen?

Das Experiment erweitert das klassische **Wigner’s-Friend-Paradoxon** um eine zweite Laborebene und führt zu einer scheinbaren logischen Inkonsistenz.

### Die vier Agenten und die Quantensysteme
- **¯F** (innere Beobachterin im ersten Labor ¯L)
- **F** (innere Beobachterin im zweiten Labor L)
- **¯W** (äußere Beobachterin, „Superbeobachterin“ von ¯L)
- **W** (äußere Beobachterin, „Superbeobachterin“ von L)

**Quantensysteme**:
- Qubit **R** (initial in einer Superposition: √(1/3)|heads⟩ + √(2/3)|tails⟩)
- Qubit **S** (wird abhängig vom Messergebnis von ¯F präpariert und an das zweite Labor gesendet)

### Ablauf des Experiments (vereinfacht)
1. ¯F misst R in der {heads, tails}-Basis.
2. Je nach Ergebnis präpariert ¯F Qubit S und sendet es an F.
3. F misst S in der {up, down}-Basis.
4. ¯W misst das gesamte Labor ¯L (inkl. ¯F und R) in einer speziellen {ok, fail}-Basis.
5. W misst das gesamte Labor L (inkl. F und S) in derselben Basis.

### Das Paradoxon
Unter bestimmten Bedingungen (mit einer Wahrscheinlichkeit von etwa 1/12) gelangen die Agenten zu folgenden Schlussfolgerungen:
- ¯F, F und ¯W sind sich jeweils **sicher**, dass W das Ergebnis „ok“ messen wird.
- W selbst misst jedoch mit Sicherheit **„fail“**.

Dies führt zu einem logischen Widerspruch: Alle Vorhersagen wurden streng nach den Regeln der Quantenmechanik getroffen, dennoch sind die Aussagen inkonsistent.

### Wissenschaftliche Bedeutung
Das Experiment zeigt, dass mindestens eine der folgenden Annahmen aufgegeben werden muss:
- **(Q)**: Die Quantentheorie ist universell gültig (auch für komplexe Systeme mit Agenten).
- **(S)**: Einzelne Beobachter können innerhalb der Theorie konsistente Vorhersagen treffen.
- **(C)**: Die Schlussfolgerungen verschiedener Beobachter sind miteinander konsistent (Transitivität des Wissens).

Das Paradoxon hat intensive Diskussionen in der Quantengrundlagenforschung ausgelöst und dient als Testfall für verschiedene Interpretationen der Quantenmechanik (z. B. Viele-Welten-Interpretation, Kopenhagener Interpretation, Bohmsche Mechanik u. a.).

**Originalarbeit**:  
Frauchiger, D., & Renner, R. (2018). Quantum theory cannot consistently describe the use of itself. *Nature Communications*, 9, 3711.  
(arXiv: 1604.07422)

## Weiterentwicklungsmöglichkeiten

- Detailliertere mathematische Darstellung der Zustände (Ket-Notation, Wahrscheinlichkeitsberechnungen)
- Visuelle Quantenschaltkreis-Darstellung
- Export der Simulationsergebnisse als JSON
- Erweiterter Erklärungsmodus mit Quellenverweisen
- Mehrsprachige Unterstützung

## Lizenz

Dieses Projekt dient ausschließlich Bildungszwecken und der Veranschaulichung eines wissenschaftlichen Gedankenexperiments. Die Simulation ist frei nutzbar und anpassbar.

---

**Erstellt mit Unterstützung einer interaktiven Entwicklungsumgebung.**  
Fragen oder Verbesserungsvorschläge sind jederzeit willkommen.