// === Frauchiger-Renner Simulation – Phasenbeschreibung ganz unten unter Buttons ===
let currentPhase = 1;
let state = {
    rOutcome: null,
    sState: null,
    fOutcome: null,
    wBarOutcome: null,
    wOutcome: null,
    paradoxDetected: false,
    history: []
};

const phases = {
    1: {
        title: "Phase 1: Vorbereitung",
        narrative: "Das Qubit R wird in den initialen Zustand präpariert: |ψ⟩_R = √(1/3)|heads⟩ + √(2/3)|tails⟩.",
        inputs: `<button id="prepareBtn" class="primary">System vorbereiten</button>`,
        description: "In dieser Phase wird das Quantensystem vorbereitet. Qubit R befindet sich in einer definierten Superposition. Es findet noch keine Messung statt. Das System ist bereit für die erste Messung.",
        action: null
    },
    2: {
        title: "Phase 2: Messung durch ¯F",
        narrative: "¯F misst das Qubit R in der {heads, tails}-Basis.",
        inputs: `<p>Klicken Sie auf „Messung durchführen“, um ¯F messen zu lassen.</p>`,
        description: "Die innere Beobachterin ¯F führt die erste Messung an Qubit R durch. Mit Wahrscheinlichkeit 1/3 misst sie „heads“ und mit 2/3 „tails“. Je nach Ergebnis wird das zweite Qubit S präpariert.",
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
        description: "Die innere Beobachterin F misst Qubit S. Das Ergebnis hängt direkt vom vorherigen Messergebnis von ¯F ab.",
        action: () => {
            state.fOutcome = (state.sState === 'down') ? 'down' : (Math.random() < 0.5 ? 'up' : 'down');
            state.history.push(`F misst S: ${state.fOutcome}`);
        }
    },
    4: {
        title: "Phase 4: Superbeobachtung durch ¯W",
        narrative: "¯W misst das gesamte Labor ¯L in der {ok, fail}-Basis.",
        inputs: `<p>Klicken Sie auf „Messung durchführen“.</p>`,
        description: "Die äußere Beobachterin ¯W führt eine Superbeobachtung des ersten Labors durch. Sie betrachtet das gesamte System inklusive der Beobachterin ¯F.",
        action: () => {
            state.wBarOutcome = (state.rOutcome === 'tails') ? (Math.random() < 0.5 ? 'ok' : 'fail') : 'fail';
            state.history.push(`¯W misst: ${state.wBarOutcome}`);
        }
    },
    5: {
        title: "Phase 5: Superbeobachtung durch W & Paradox",
        narrative: "W misst das Labor L. Hier kann das Paradoxon auftreten.",
        inputs: `<p>Klicken Sie auf „Messung durchführen“.</p>`,
        description: "Die äußere Beobachterin W misst das zweite Labor. In bestimmten Fällen entsteht ein logischer Widerspruch zwischen den sicheren Vorhersagen der Agenten – das Frauchiger-Renner-Paradoxon.",
        action: () => {
            const isParadoxPath = (state.rOutcome === 'tails' && state.fOutcome === 'up' && state.wBarOutcome === 'ok');
            state.paradoxDetected = isParadoxPath && Math.random() < 0.3;

            state.wOutcome = state.paradoxDetected 
                ? 'fail (Paradox!)' 
                : (Math.random() < 0.5 ? 'ok' : 'fail');

            if (state.paradoxDetected) {
                state.history.push("⚠ PARADOXON AUFGETRETEN: Logischer Widerspruch zwischen den Agenten!");
            }
            state.history.push(`W misst: ${state.wOutcome}`);
        }
    }
};

function updateStatus() {
    const html = `
        <p><strong>Aktuelle Phase:</strong> ${phases[currentPhase].title}</p>
        <p><strong>Zustand R (¯F):</strong> ${state.rOutcome || 'nicht gemessen'}</p>
        <p><strong>Zustand S:</strong> ${state.sState ? (state.sState === 'superposition' ? 'Superposition (|↑⟩ + |↓⟩)/√2' : '|↓⟩') : 'noch nicht präpariert'}</p>
        <table class="status-table">
            <tr><th>Agent</th><th>Ergebnis</th></tr>
            <tr><td>¯F</td><td>${state.rOutcome || '-'}</td></tr>
            <tr><td>F</td><td>${state.fOutcome || '-'}</td></tr>
            <tr><td>¯W</td><td>${state.wBarOutcome || '-'}</td></tr>
            <tr><td>W</td><td>${state.wOutcome || '-'}</td></tr>
        </table>
        <p><strong>Paradox-Status:</strong> 
            <span style="color:${state.paradoxDetected ? '#e74c3c' : '#2ecc71'}; font-weight:600;">
                ${state.paradoxDetected ? 'Ja – logischer Widerspruch!' : 'Noch nicht aufgetreten'}
            </span>
        </p>
    `;
    document.getElementById('statusContent').innerHTML = html;
}

function updateHistory() {
    const historyHTML = `
        <h3>Messungsverlauf</h3>
        <ul>${state.history.map(h => `<li>${h}</li>`).join('')}</ul>
    `;
    document.getElementById('historyContainer').innerHTML = historyHTML;
}

function loadPhase() {
    const phase = phases[currentPhase];
    
    document.getElementById('phaseTitle').textContent = phase.title;
    document.getElementById('narrative').innerHTML = `<p>${phase.narrative}</p>`;
    document.getElementById('inputArea').innerHTML = phase.inputs || '';
    
    // Phasenbeschreibung ganz unten unter den Buttons
    document.getElementById('phaseDescription').innerHTML = `
        <strong>Was passiert in dieser Phase?</strong><br>
        ${phase.description}
    `;
    
    const actionBtn = document.getElementById('actionBtn');
    if (currentPhase === 1) {
        actionBtn.disabled = true;
        actionBtn.textContent = "Keine Messung in Phase 1";
    } else {
        actionBtn.disabled = false;
        actionBtn.textContent = "Messung durchführen";
    }

    document.getElementById('nextBtn').disabled = true;
    updateStatus();
    updateHistory();

    if (currentPhase === 1) {
        setTimeout(() => {
            const prepareBtn = document.getElementById('prepareBtn');
            if (prepareBtn) {
                prepareBtn.addEventListener('click', () => {
                    state.history.push("Phase 1: System vorbereitet (R in √(1/3)|heads⟩ + √(2/3)|tails⟩)");
                    document.getElementById('narrative').innerHTML += `<p style="color:#27ae60; margin:15px 0;"><strong>✓ System erfolgreich vorbereitet.</strong></p>`;
                    document.getElementById('nextBtn').disabled = false;
                    updateHistory();
                });
            }
        }, 50);
    }
}

// Event-Listener
document.getElementById('actionBtn').addEventListener('click', () => {
    if (currentPhase === 1) return;
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
    updateHistory();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPhase < 5) {
        currentPhase++;
        loadPhase();
    } else {
        alert("Simulation abgeschlossen.");
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    currentPhase = 1;
    state = { rOutcome: null, sState: null, fOutcome: null, wBarOutcome: null, wOutcome: null, paradoxDetected: false, history: [] };
    loadPhase();
});

// Initialisierung
loadPhase();