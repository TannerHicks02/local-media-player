document.getElementById('chooseFolder').addEventListener('click', async () => {
    const directoryHandle = await window.showDirectoryPicker();
    const audioRow = document.getElementById('audioRow');
    const videoRow = document.getElementById('videoRow');
    const audioHeader = document.getElementById('audioHeader');
    const videoHeader = document.getElementById('videoHeader');

    audioRow.innerHTML = '';
    videoRow.innerHTML = '';
    
    let hasAudio = false;
    let hasVideo = false;

    for await (const entry of directoryHandle.values()) {
        if (entry.kind === 'file') {
            const file = await entry.getFile();
            const url = URL.createObjectURL(file);

            if (file.type.startsWith('audio')) {
                audioRow.appendChild(createMediaElement('audio', url, file.name));
                hasAudio = true;
            } else if (file.type.startsWith('video')) {
                videoRow.appendChild(createMediaElement('video', url, file.name));
                hasVideo = true;
            }
        }
    }

    if (hasAudio) {
        audioHeader.classList.remove('hidden');
    } else {
        audioHeader.classList.add('hidden');
    }

    if (hasVideo) {
        videoHeader.classList.remove('hidden');
    } else {
        videoHeader.classList.add('hidden');
    }
});

function createMediaElement(type, src, name) {
    const container = document.createElement('div');
    container.classList.add('media-item');

    // Add an image placeholder for audio files
    if (type === 'audio') {
        const image = document.createElement('img');
        image.src = 'data:image/png;base64,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'; // Placeholder image URL
        image.alt = 'Album Cover';
        container.appendChild(image);
    }

    const media = document.createElement(type);
    media.src = src;
    media.controls = true;

    const label = document.createElement('p');
    label.textContent = name;

    const controlsContainer = document.createElement('div');

    const playPauseButton = createControlButton('Play/Pause', () => {
        if (media.paused) {
            media.play();
        } else {
            media.pause();
        }
    });

    const rewindButton = createControlButton('Rewind', () => {
        media.currentTime -= 10;
    });

    const fastForwardButton = createControlButton('Fast Forward', () => {
        media.currentTime += 10;
    });

    let timeDisplay, seekBar;
    if (type === 'audio') {
        timeDisplay = document.createElement('p');
        timeDisplay.textContent = '00:00 / 00:00';

        seekBar = document.createElement('input');
        seekBar.type = 'range';
        seekBar.min = 0;
        seekBar.max = 100;
        seekBar.value = 0;
        seekBar.addEventListener('input', () => {
            const seekTime = (seekBar.value / 100) * media.duration;
            media.currentTime = seekTime;
        });

        media.addEventListener('timeupdate', () => {
            seekBar.value = (media.currentTime / media.duration) * 100;
            updateTimeDisplay(media, timeDisplay);
        });

        media.addEventListener('loadedmetadata', () => {
            updateTimeDisplay(media, timeDisplay);
        });

        container.appendChild(seekBar);
        container.appendChild(timeDisplay);
    }

    controlsContainer.appendChild(playPauseButton);
    controlsContainer.appendChild(rewindButton);
    controlsContainer.appendChild(fastForwardButton);

    container.appendChild(label);
    container.appendChild(media);
    container.appendChild(controlsContainer);

    return container;
}

function createControlButton(label, onClick) {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
}

function updateTimeDisplay(media, displayElement) {
    const currentTime = formatTime(media.currentTime);
    const duration = formatTime(media.duration);
    displayElement.textContent = `${currentTime} / ${duration}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
