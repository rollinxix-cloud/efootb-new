function updateCard() {
    // Basic text updates
    document.getElementById('cardName').innerText = document.getElementById('nameInput').value || 'GAMER NAME';
    document.getElementById('cardRating').innerText = document.getElementById('ratingInput').value || '00';
    document.getElementById('cardYear').innerText = document.getElementById('yearInput').value || 'SEASON';
    document.getElementById('cardPlaystyle').querySelector('span').innerText = document.getElementById('teamPlaystyleInput').value;
    
    // Rating/Star logic
    const stars = document.getElementById('starRatingInput').value;
    document.getElementById('cardStars').innerText = '⭐'.repeat(stars);

    // Stats Bar
    document.getElementById('cardGS').innerText = document.getElementById('gsInput').value;
    document.getElementById('cardCSGC').innerText = document.getElementById('csGcInput').value;
    document.getElementById('cardCsGcLabel').innerText = document.getElementById('csGcSelector').value;
    document.getElementById('cardAMG').innerText = document.getElementById('amgInput').value;

    // Champion Status
    const isChampion = document.getElementById('championToggle').checked;
    const championBadge = document.getElementById('cardChampionBadge');
    const championText = document.getElementById('championBadgeText');
    const card = document.getElementById('card');

    if (isChampion) {
        championText.innerText = document.getElementById('championSeasonInput').value === "Season 3 Champion" ? "🏆 S3 CHAMPION" : "🏆 S5 CHAMPION";
        championBadge.classList.remove('hidden-element');
        card.classList.add('champion-glow-active');
    } else {
        championBadge.classList.add('hidden-element');
        card.classList.remove('champion-glow-active');
    }
}

function toggleChampionSelector() {
    const isChecked = document.getElementById('championToggle').checked;
    const container = document.getElementById('championSelectContainer');
    if (isChecked) container.classList.remove('hidden');
    else container.classList.add('hidden');
    updateCard();
}

function handleTournamentChange() {
    const val = document.getElementById('tournamentSelector').value;
    const watermark = document.getElementById('cardWatermark');
    watermark.innerText = val;
    
    const s7Panel = document.getElementById('season7Panel');
    const perfBar = document.getElementById('cardPerfBar');
    const scoreContainer = document.getElementById('cardScoreContainer');

    if (val === "ELITE DIV S7") {
        s7Panel.classList.remove('hidden');
        perfBar.classList.remove('hidden-element');
        scoreContainer.classList.remove('hidden-element');
    } else {
        s7Panel.classList.add('hidden');
        perfBar.classList.add('hidden-element');
        scoreContainer.classList.add('hidden-element');
    }
    updateCard();
}

function handleMatchdayTypeChange() {
    const type = document.getElementById('mdSelector').value;
    const blockA = document.getElementById('blockMD_A');
    const blockB = document.getElementById('blockMD_B');
    
    if (type === "MD9") {
        blockA.classList.add('hidden');
        blockB.classList.add('hidden');
    } else {
        blockA.classList.remove('hidden');
        blockB.classList.remove('hidden');
    }
    updateCard();
}

function handleImageUpload(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('playerImage').src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function adjustImage() {
    const zoom = document.getElementById('zoomInput').value;
    const x = document.getElementById('posXInput').value;
    const y = document.getElementById('posYInput').value;
    const img = document.getElementById('playerImage');
    img.style.transform = `scale(${zoom}) translate(${x}px, ${y}px)`;
}

function downloadCard() {
    html2canvas(document.getElementById('card'), { backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'champion-card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
