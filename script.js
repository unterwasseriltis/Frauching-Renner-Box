// === Frauchiger-Renner Simulation – Korrigierte Version (Phase 1 fix) ===
let currentPhase = 1;
let state = {
    rOutcome: null,        // 'heads' oder 'tails'
    sState: null,          // 'down' oder 'superposition'
    fOutcome: null,        // 'up' oder 'down'
    wBarOutcome: null,     // 'ok' oder 'fail'
    wOutcome: null,        // 'ok' oder 'fail'
    paradoxDetected: false,
    history: []
};

const phases = {
    1: {
        title: "Phase 1: Vorbereitung",
        narrative: "Das Qubit R wird in den initialen Zustand präpariert: |ψ⟩_R = √(1/3)|heads⟩ + √(2/3)|tails⟩. Keine Messung findet statt.",
        inputs: `
            <button id="prepareBtn" class="primary">System vorbereiten</button>
            <p style="margin-top:15px; color:#666; font-size:0.95rem;">
                Nach der Vorbereitung können Sie zur nächsten Phase wechseln.
            </p>`,
        action: null   // keine Aktion über den Haupt-Button
    },
    2: {
        title: "Phase 2: Messung durch ¯F",
        narrative: "¯F misst das Qubit R in der {heads, tails}-Basis.<br>Wahrscheinlichkeiten: 1/3 heads, 2/3 tails.",
        inputs: `<p>Klicken Sie auf „Messung durchführen“, um ¯F messen zu lassen.</p>`,
        action: () => {
            const probHeads = 1 / 3;
            state.rOutcome = Math.random() < probHeads ? 'heads' : 'tails';
            state.history.push(`¯F misst R: ${state.rOutcome}`);

            state.sState = (state.rOutcome === 'heads') ? 'down' : 'superposition';
        }
    },
    3: {
        title: "Phase 3: Messung durch F",
        narrative: "F misst das empfangene Qubit S in der {up, down}-Basis.",
        inputs: `<p>Klicken Sie auf „Messung durchführen“.</p>`,
        action: () => {
            if (state.sState === 'down') {
                state.fOutcome = 'down';
            } else {
                state.fOutcome = Math.random() < 0.5 ? 'up' : 'down';
            }
            state.history.push(`F misst S: ${state.fOutcome}`);
        }
    },
    4: {
        title: "Phase 4: Superbeobachtung durch ¯W",
        narrative: "¯W misst das gesamte Labor ¯L in der {ok, fail}-Basis.",
        inputs: `<p>Klicken Sie auf „Messung durchführen“.</p>`,
        action: () => {
            state.wBarOutcome = (state.rOutcome === 'tails') ? 
                (Math.random() < 0.5 ? 'ok' : 'fail') : 'fail';
            state.history.push(`¯W misst: ${state.wBarOutcome}`);
        }
    },
    5: {
        title: "Phase 5: Superbeobachtung durch W & Paradox-Detektion",
        narrative: "W misst das Labor L. Hier kann das Paradoxon auftreten.",
        inputs: `<p>Klicken Sie auf „Messung durchführen“.</p>`,
        action: () => {
            const isParadoxPath = (state.rOutcome === 'tails' && 
                                   state.fOutcome === 'up' && 
                                   state.wBarOutcome === 'ok');
            
            state.paradoxDetected = isParadoxPath && Math.random() < 0.3; // gut sichtbar für Demonstration
            
            state.wOutcome = state.paradoxDetected 
                ? 'fail (Paradox!)' 
                : (Math.random() < 0.5 ? 'ok' : 'fail');
            
            if (state.paradoxDetected) {
                state.history.push("⚠ PARADOXON AUFGETRETEN: Widerspruch zwischen den Agenten!");
            }
            state.history.push(`W misst: ${state.wOutcome}`);
        }
    }
};

function updateStatus() {
    const html = `
        <p><strong>Aktuelle Phase:</strong> ${phases[currentPhase].title}</p>
        <p><strong>Zustand R (¯F):</strong> ${state.rOutcome || 'nicht gemessen'}</p>
        <p><strong>Zustand S:</strong> ${state.sState 
            ? (state.sState === 'superposition' ? 'Superposition (|↑⟩ + |↓⟩)/√2' : '|↓⟩') 
            : 'noch nicht präpariert'}</p>
        <table class="status-table">
            <tr><th>Agent</th><th>Ergebnis</th></tr>
            <tr><td>¯F</td><td>${state.rOutcome || '-'}</td></tr>
            <tr><td>F</td><td>${state.fOutcome || '-'}</td></tr>
            <tr><td>¯W</td><td>${state.wBarOutcome || '-'}</td></tr>
            <tr><td>W</td><td>${state.wOutcome || '-'}</td></tr>
        </table>
        <p><strong>Paradox-Status:</strong> 
            <span style="color:${state.paradoxDetected ? '#e74c3c' : '#2ecc71'};">
                ${state.paradoxDetected ? 'Ja – logischer Widerspruch!' : 'Noch nicht aufgetreten'}
            </span>
        </p>
        <details open>
            <summary>Messungsverlauf (${state.history.length} Einträge)</summary>
            <ul>${state.history.map(h => `<li>${h}</li>`).join('')}</ul>
        </details>
    `;
    document.getElementById('statusContent').innerHTML = html;
}

function loadPhase() {
    const phase = phases[currentPhase];
    document.getElementById('phaseTitle').textContent = phase.title;
    document.getElementById('narrative').innerHTML = `<p>${phase.narrative}</p>`;
    document.getElementById('inputArea').innerHTML = phase.inputs || '';

    // Haupt-Button "Messung durchführen" nur in Phasen 2-5 aktivieren
    const actionBtn = document.getElementById('actionBtn');
    if (currentPhase === 1) {
        actionBtn.disabled = true;
        actionBtn.style.opacity = "0.5";
        actionBtn.textContent = "Keine Messung in Phase 1";
    } else {
        actionBtn.disabled = false;
        actionBtn.style.opacity = "1";
        actionBtn.textContent = "Messung durchführen";
    }

    document.getElementById('nextBtn').disabled = true;
    updateStatus();

    // Spezieller Handler für "System vorbereiten" in Phase 1
    if (currentPhase === 1) {
        setTimeout(() => {
            const prepareBtn = document.getElementById('prepareBtn');
            if (prepareBtn) {
                prepareBtn.addEventListener('click', () => {
                    state.history.push("Phase 1: System vorbereitet (R in √(1/3)|heads⟩ + √(2/3)|tails⟩)");
                    document.getElementById('narrative').innerHTML += 
                        `<p style="color:#27ae60; margin-top:10px;"><strong>✓ System erfolgreich vorbereitet.</strong></p>`;
                    document.getElementById('nextBtn').disabled = false;
                    updateStatus();
                });
            }
        }, 50);
    }
}

// Haupt-Button "Messung durchführen"
document.getElementById('actionBtn').addEventListener('click', () => {
    if (currentPhase === 1) return; // Sicherheit

    const phase = phases[currentPhase];
    if (phase.action) phase.action();

    let resultText = `<p><strong>Ergebnis dieser Phase:</strong> `;
    if (currentPhase === 2) resultText += `¯F misst <strong>${state.rOutcome}</strong>.`;
    else if (currentPhase === 3) resultText += `F misst <strong>${state.fOutcome}</strong>.`;
    else if (currentPhase === 4) resultText += `¯W misst <strong>${state.wBarOutcome}</strong>.`;
    else if (currentPhase === 5) resultText += `W misst <strong>${state.wOutcome}</strong>.`;
    resultText += `</p>`;

    document.getElementById('narrative').innerHTML += resultText;
    document.getElementById('nextBtn').disabled = false;
    updateStatus();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPhase < 5) {
        currentPhase++;
        loadPhase();
    } else {
        alert("Simulation abgeschlossen. Starten Sie die Simulation erneut, um das Paradoxon erneut zu beobachten.");
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    currentPhase = 1;
    state = { rOutcome: null, sState: null, fOutcome: null, wBarOutcome: null, wOutcome: null, paradoxDetected: false, history: [] };
    loadPhase();
});

// Initialisierung
loadPhase();