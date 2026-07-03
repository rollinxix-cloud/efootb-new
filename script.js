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
        document.getElementById('playerFrame').style.backgroundImage = `url(${event.target.result})`;
    }
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
}

function switchSection(title) {
    document.getElementById('cardWatermark').innerText = title;
    updateCard();
}

function updateCard() {
    document.getElementById('cardName').innerText = document.getElementById('nameInput').value.toUpperCase() || 'PLAYER NAME';
    document.getElementById('cardRating').innerText = document.getElementById('ratingInput').value || '77';
    document.getElementById('cardYear').innerText = document.getElementById('yearInput').value || '2026';
    document.getElementById('cardGS').innerText = document.getElementById('gsInput').value || '0';
    document.getElementById('cardCS').innerText = document.getElementById('csInput').value || '0';
    document.getElementById('cardAMR').innerText = document.getElementById('amrInput').value || '0.0';
    
    const card = document.getElementById('card');
    card.className = `card ${document.getElementById('cardStyleInput').value}`;
}

function downloadCard() {
    html2canvas(document.getElementById('card'), { scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'tournament-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
