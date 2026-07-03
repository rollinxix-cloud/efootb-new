function handleTournamentChange() {
    const selectedTourney = document.getElementById('tournamentSelector').value;
    const watermark = document.getElementById('cardWatermark');
    const s7Panel = document.getElementById('season7Panel');
    const scoreBadge = document.getElementById('cardScoreBadge');

    watermark.innerText = selectedTourney;

    if (selectedTourney === 'ELITE DIV S7') {
        s7Panel.classList.remove('hidden');
        scoreBadge.classList.remove('hidden-element');
    } else {
        s7Panel.classList.add('hidden');
        scoreBadge.classList.add('hidden-element');
    }
    updateCard();
}

// Fixed: Uses CSS transform properties so html2canvas renders image scaling accurately
function adjustImage() {
    const zoom = document.getElementById('zoomInput').value;
    const posX = document.getElementById('posXInput').value;
    const posY = document.getElementById('posYInput').value;
    const imgElement = document.getElementById('playerImage');
    
    if(imgElement.src && !imgElement.src.includes('data:image/gif;blank')) {
        imgElement.style.transform = `translate(${posX}px, ${posY}px) scale(${zoom})`;
    }
}

function handleImageUpload(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgElement = document.getElementById('playerImage');
        imgElement.src = event.target.result;
        imgElement.onload = function() {
            adjustImage(); // Initialize alignments
        };
    }
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
}

function updateCard() {
    // Identity values
    document.getElementById('cardName').innerText = document.getElementById('nameInput').value.trim().toUpperCase() || 'PLAYER NAME';
    document.getElementById('cardRating').innerText = document.getElementById('ratingInput').value || '76';
    document.getElementById('cardYear').innerText = document.getElementById('yearInput').value.trim() || '2026';
    
    // Core stats
    document.getElementById('cardGS').innerText = document.getElementById('gsInput').value || '35';
    document.getElementById('cardCS').innerText = document.getElementById('csInput').value || '12';
    document.getElementById('cardAMR').innerText = document.getElementById('amrInput').value || '7.8';
    
    // Dynamic eFootball Star Rating logic
    const totalStars = parseInt(document.getElementById('starRatingInput').value) || 5;
    document.getElementById('cardStars').innerText = '⭐'.repeat(totalStars);
    
    // Card Style variants
    const card = document.getElementById('card');
    card.className = `card ${document.getElementById('cardStyleInput').value}`;

    // Active Season 7 state settings
    const selectedTourney = document.getElementById('tournamentSelector').value;
    if (selectedTourney === 'ELITE DIV S7') {
        const md = document.getElementById('mdSelector').value;
        const score = document.getElementById('scorelineInput').value.trim() || '0-0';
        document.getElementById('cardScoreBadge').innerText = `${md} | ${score}`;
    }
}

function downloadCard() {
    const targetElement = document.getElementById('card');
    
    html2canvas(targetElement, {
        scale: 3, 
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        const filename = document.getElementById('nameInput').value.trim().toLowerCase() || 'player';
        link.download = `${filename}-efootball-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

window.onload = function() {
    updateCard();
};
