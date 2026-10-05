const SECRET_KEY = "bloom";
let currentIndex = 0;
let playing = false;

const tracks = [
  {
    title: "Estudio Clásico I",
    artist: "Archivo sonoro",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Ritmo de biblioteca",
    artist: "Colección académica",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Paisaje nocturno",
    artist: "Sesión de estudio",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Composición del renacimiento",
    artist: "Archivo didáctico",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

const audio = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const nowPlaying = document.getElementById("nowPlaying");
const playPauseBtn = document.getElementById("playPauseBtn");

function renderPlaylist(items = tracks) {
  playlist.innerHTML = "";
  items.forEach((track, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "track-item";
    item.textContent = `${track.title} — ${track.artist}`;
    item.onclick = () => {
      currentIndex = index;
      loadTrack();
      play();
    };
    playlist.appendChild(item);
  });
}

function loadTrack() {
  const track = tracks[currentIndex];
  audio.src = track.url;
  nowPlaying.innerHTML = `<strong>${track.title}</strong><br><span>${track.artist}</span>`;
}

function play() {
  playing = true;
  audio.play();
  playPauseBtn.textContent = "⏸ Pausar";
}

function pause() {
  playing = false;
  audio.pause();
  playPauseBtn.textContent = "▶ Reproducir";
}

function togglePlay() {
  if (playing) pause();
  else play();
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack();
  play();
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack();
  play();
}

function checkAccess() {
  const value = document.getElementById("searchInput").value.trim().toLowerCase();

  if (value === SECRET_KEY) {
    openMusic();
    return;
  }

  const academicTerms = [
    "renacimiento",
    "literatura",
    "romano",
    "virgilio",
    "cervantes",
    "garcilaso",
    "ovidio",
    "ciceron"
  ];

  if (academicTerms.includes(value)) {
    alert("Resultado académico encontrado en la sección de recursos del portal.");
  } else {
    alert("No se encontraron resultados académicos para esa búsqueda.");
  }
}

function openMusic() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("musicSection").classList.remove("hidden");
  renderPlaylist();
  loadTrack();
}

function closeMusic() {
  document.getElementById("musicSection").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  pause();
}

function searchTracks() {
  const term = document.getElementById("musicSearch").value.trim().toLowerCase();
  if (!term) {
    renderPlaylist();
    return;
  }

  const filtered = tracks.filter(track =>
    track.title.toLowerCase().includes(term) || track.artist.toLowerCase().includes(term)
  );

  if (filtered.length === 0) {
    alert("No hay resultados en la lista de recursos sonoros.");
    return;
  }

  renderPlaylist(filtered);
  currentIndex = 0;
  loadTrack();
}

audio.addEventListener("ended", nextTrack);

window.addEventListener("DOMContentLoaded", () => {
  renderPlaylist();
  document.getElementById("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkAccess();
  });
  document.getElementById("musicSearch").addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchTracks();
  });
});
