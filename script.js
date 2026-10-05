const SECRET_CODE = "bloom";
let currentTrackIndex = 0;
let isPlaying = false;
let allTracks = [];

// Canciones de ejemplo (streaming desde fuentes libres)
const defaultTracks = [
    {
        title: "Night Owl",
        artist: "Broke For Free",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Ambient Frequencies",
        artist: "Kevin MacLeod",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Summer Breeze",
        artist: "Anno Domini Beats",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        title: "Urban Jungle",
        artist: "Ólafur Arnalds",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        title: "Coffee Break",
        artist: "Silent Partner",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        title: "Midnight Ride",
        artist: "Dyalla",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
];

const audioPlayer = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");

function renderPlaylist(filteredTracks = allTracks) {
    playlist.innerHTML = "";
    filteredTracks.forEach((track, index) => {
        const item = document.createElement("div");
        item.className = "track";
        item.textContent = `${track.title} — ${track.artist}`;
        item.onclick = () => {
            currentTrackIndex = allTracks.indexOf(track);
            loadTrack();
            play();
        };
        playlist.appendChild(item);
    });
}

function loadTrack() {
    const track = allTracks[currentTrackIndex];
    if (!track) return;
    audioPlayer.src = track.url;
    nowPlaying.innerHTML = `<strong>${track.title}</strong><br><span style="font-size: 0.9rem;">${track.artist}</span>`;
}

function play() {
    isPlaying = true;
    audioPlayer.play();
    playBtn.textContent = "⏸ Pausar";
}

function pause() {
    isPlaying = false;
    audioPlayer.pause();
    playBtn.textContent = "▶ Reproducir";
}

function togglePlay() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % allTracks.length;
    loadTrack();
    play();
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + allTracks.length) % allTracks.length;
    loadTrack();
    play();
}

function checkAccess() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();

    if (input === SECRET_CODE) {
        unlockMusicPlayer();
        return;
    }

    // Búsquedas académicas normales
    const academicResults = [
        "renacimiento",
        "literatura",
        "romano",
        "virgilio",
        "cervantes",
        "garcilaso",
        "ovidio",
        "cicerón"
    ];

    if (academicResults.includes(input)) {
        alert("Resultado encontrado: Información académica sobre literatura clásica disponible en la sección de recursos.");
    } else {
        alert("No se encontraron resultados. Intenta buscar términos relacionados con literatura o historia clásica.");
    }
}

function unlockMusicPlayer() {
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("musicPlayer").style.display = "block";
    if (allTracks.length === 0) {
        allTracks = [...defaultTracks];
        renderPlaylist();
        loadTrack();
    }
}

function backToMain() {
    document.getElementById("musicPlayer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    pause();
}

function searchMusic() {
    const term = document.getElementById("musicSearch").value.trim().toLowerCase();

    if (!term) {
        renderPlaylist(allTracks);
        return;
    }

    const filtered = allTracks.filter(track =>
        track.title.toLowerCase().includes(term) ||
        track.artist.toLowerCase().includes(term)
    );

    if (filtered.length === 0) {
        alert("No se encontraron canciones con ese término.");
        return;
    }

    renderPlaylist(filtered);
}

function handleMusicSearch(event) {
    if (event.key === "Enter") {
        searchMusic();
    }
}

// Auto-play siguiente canción
audioPlayer.addEventListener("ended", nextTrack);

// Evento Enter en buscador principal
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") checkAccess();
        });
    }

    const musicSearch = document.getElementById("musicSearch");
    if (musicSearch) {
        musicSearch.addEventListener("keydown", handleMusicSearch);
    }
});
