let uploadedImgData = '';

function handleTournamentChange() {
    const selectedTourney = document.getElementById('tournamentSelector').value;
    const watermark = document.getElementById('cardWatermark');
    const s7Panel = document.getElementById('season7Panel');
    const scoreBadge = document.getElementById('cardScoreBadge');

    // Update internal card watermarking string values dynamically
    watermark.innerText = selectedTourney;

    // Interface toggles specific to Season 7 active parameters
    if (selectedTourney === 'ELITE DIV S7') {
        s7Panel.classList.remove('hidden');
        scoreBadge.classList.remove('hidden-element');
    } else {
        s7Panel.classList.add('hidden');
        scoreBadge.classList.add('hidden-element');
    }
    updateCard();
}

function adjustImage() {
    const zoom = document.getElementById('zoomInput').value;
    const posX = document.getElementById('posXInput').value;
    const posY = document.getElementById('posYInput').value;
    const frame = document.getElementById('playerFrame');
    
    frame.style.backgroundSize = `${zoom}%`;
    frame.style.backgroundPosition = `${posX}% ${posY}%`;
}

function handleImageUpload(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        uploadedImgData = event.target.result;
        const frame = document.getElementById('playerFrame');
        frame.style.backgroundImage = `url(${uploadedImgData})`;
        adjustImage(); // Reset layout alignments
    }
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
}

function updateCard() {
    // Sync textual metadata structures safely
    document.getElementById('cardName').innerText = document.getElementById('nameInput').value.trim().toUpperCase() || 'PLAYER NAME';
    document.getElementById('cardRating').innerText = document.getElementById('ratingInput').value || '76';
    document.getElementById('cardYear').innerText = document.getElementById('yearInput').value.trim() || '2026';
    
    // Sync metrics structures safely
    document.getElementById('cardGS').innerText = document.getElementById('gsInput').value || '35';
    document.getElementById('cardCS').innerText = document.getElementById('csInput').value || '12';
    document.getElementById('cardAMR').innerText = document.getElementById('amrInput').value || '7.8';
    
    // Card skin type management variations
    const card = document.getElementById('card');
    card.className = `card ${document.getElementById('cardStyleInput').value}`;

    // Manage Season 7 metadata if configured active
    const selectedTourney = document.getElementById('tournamentSelector').value;
    if (selectedTourney === 'ELITE DIV S7') {
        const md = document.getElementById('mdSelector').value;
        const score = document.getElementById('scorelineInput').value.trim() || '0-0';
        document.getElementById('cardScoreBadge').innerText = `${md} | ${score}`;
    }
}

function downloadCard() {
    const targetElement = document.getElementById('card');
    
    // Hard check parameters forcing canvas background processing stability
    html2canvas(targetElement, {
        scale: 3, 
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        removeContainer: true
    }).then(canvas => {
        const link = document.createElement('a');
        const filename = document.getElementById('nameInput').value.trim().toLowerCase() || 'player';
        link.download = `${filename}-efootball-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// System baseline initialization
window.onload = function() {
    updateCard();
};
