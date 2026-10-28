// =========================================
// Passcode & Lock Screen Control
// =========================================
const CORRECT_PASSCODE = "1413";
let enteredCode = "";

const lockScreen = document.getElementById("lockScreen");
const passcodeScreen = document.getElementById("passcodeScreen");
const homeScreen = document.getElementById("homeScreen");
const dots = document.querySelectorAll(".dot");

function showPasscode() {
  if (lockScreen) lockScreen.style.display = "none";
  if (passcodeScreen) passcodeScreen.style.display = "flex";
}

function cancelPasscode() {
  enteredCode = "";
  updateDots();
  if (passcodeScreen) passcodeScreen.style.display = "none";
  if (lockScreen) lockScreen.style.display = "flex";
}

function handleLockNotiClick() {
  showPasscode();
}

function pressKey(num) {
  if (enteredCode.length < 4) {
    enteredCode += num;
    updateDots();
  }

  if (enteredCode.length === 4) {
    if (enteredCode === CORRECT_PASSCODE) {
      setTimeout(() => {
        if (lockScreen) lockScreen.style.display = "none";
        if (passcodeScreen) passcodeScreen.style.display = "none";

        if (homeScreen) {
          homeScreen.style.display = "flex";
        }

        if (typeof runTopBannerNotification === "function") {
          runTopBannerNotification();
        }

        enteredCode = "";
        updateDots();
      }, 300);
    } else {
      setTimeout(() => {
        enteredCode = "";
        updateDots();
      }, 400);
    }
  }
}

function deleteKey() {
  if (enteredCode.length > 0) {
    enteredCode = enteredCode.slice(0, -1);
    updateDots();
  }
}

function updateDots() {
  dots.forEach((dot, index) => {
    if (index < enteredCode.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
}

// =========================================
// App Navigation Logic (ฉบับแก้ขาด 100%)
// =========================================
function openApp(screenId) {
  const homeScreen = document.getElementById("homeScreen");
  if (homeScreen) {
    homeScreen.style.display = "none";
  }

  const allScreens = document.querySelectorAll(".app-screen");
  allScreens.forEach(s => {
    s.style.display = "none";
  });

  const target = document.getElementById(screenId);
  if (target) {
    if (screenId === "phoneScreen") {
      target.style.display = "flex";
    } else {
      target.style.display = "block";
    }
  }

  if (screenId === "notesScreen") {
    const detail = document.getElementById("noteDetailScreen");
    if (detail) detail.style.display = "none";
    renderNotesList();
  }
}

function closeApp(screenId) {
  const target = document.getElementById(screenId);
  if (target) {
    target.style.setProperty('display', 'none', 'important');
  }

  if (screenId === "notesScreen") {
    const detailScreen = document.getElementById("noteDetailScreen");
    if (detailScreen) detailScreen.style.setProperty('display', 'none', 'important');
  }

  if (screenId === "phoneScreen" && typeof endCall === 'function') {
    endCall();
  }

  // ดึงค่า homeScreen สดๆ ตรงนี้ ป้องกันค่าหายหรือเป็น null ชัวร์ 100%
  const homeScreen = document.getElementById("homeScreen");
  if (homeScreen) {
    homeScreen.style.setProperty('display', 'flex', 'important');
  }
}

// =========================================
// Top Notification Banner Logic
// =========================================
function runTopBannerNotification() {
  const banner = document.getElementById('homeNotification');
  const notiDesc = document.getElementById('notiDesc');
  if (!banner || !notiDesc) return;

  banner.classList.remove('show');
  banner.style.display = 'none';

  setTimeout(() => {
    notiDesc.textContent = "เมื่อวานที่แกบอกมา";
    banner.style.display = 'block';

    setTimeout(() => {
      banner.classList.add('show');

      setTimeout(() => {
        banner.classList.remove('show');

        setTimeout(() => {
          banner.style.display = 'none';

          setTimeout(() => {
            notiDesc.textContent = "เรานอนคิดเรื่องนี้ทั้งคืนเลย";
            banner.style.display = 'block';

            setTimeout(() => {
              banner.classList.add('show');

              setTimeout(() => {
                banner.classList.remove('show');
                setTimeout(() => {
                  banner.style.display = 'none';
                }, 500);
              }, 3000);

            }, 50);

          }, 1800);

        }, 500);

      }, 3000);

    }, 50);

  }, 3000);
}
function openChatFromNoti() {
  // 1. ตัดเสียงและวิดีโอ TikTok ทั้งหมดทันที
  forceStopAllMedia();

  // 2. ปิดหน้าฟีด TikTok ถ้าเปิดค้างไว้
  const feedContainer = document.getElementById('tiktokFeedContainer');
  if (feedContainer) feedContainer.style.display = 'none';

  const banner = document.getElementById('homeNotification');
  if (banner) {
    banner.classList.remove('show');
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
  }

  // เปิดหน้าโปรไฟล์ IG แล้วเปิดหน้า Inbox ต่อ (โค้ดเดิมของมึง)
  openApp('igScreen');
  openIgDmList();
}

// =========================================
// Messages / Chat Data
// =========================================
const chatData = {
  eom: {
    name: "my eomeom",
    avatar: "assets/locket.JPEG",
    messages: [
      { sender: "received", text: "แกชอบเราหรอ" },
      { sender: "sent", text: "มั่วจัด" },
      { sender: "received", text: "ถามเฉย ๆ เพราะเราชอบพี่โจ้ไง" },
      { sender: "sent", text: "พี่โจ้เขาเป็นสเตรทนะจะบอกให้" },
      { sender: "received", text: "แล้วแกล่ะ" },
      { sender: "received", text: "เป็นอะไร" },
      { sender: "sent", text: "ก็เป็นเพื่อนออมไง" },
      { sender: "received", text: "งั้นเป็นเพื่อนกันตลอดไปนะ" },
      { sender: "sent", text: "คร่าอีเชี่ย ฝันดี 555+" },
      { sender: "sent", text: "ไปละ แม่จะปิดเน็ต" },
      { sender: "received", text: "ไม่เชื่อ ขอดูหน้าก่อน" },
      { sender: "sent", image: "assets/kk.png" },
      { sender: "received", image: "assets/em.png" },
      { sender: "sent", text: "อ้อนจัด" },
      { sender: "received", text: "อ้อนพ่อง" }
    ]
  },
  jo: {
    name: "jo ladkrabang",
    avatar: "assets/jh.jpg",
    messages: [
      { sender: "received", text: "ชอบออมหรอ" },
      { sender: "sent", text: "ไม่ใช่สเปคครับ" },
      { sender: "sent", text: "แต่ออมบอกว่าชอบผมนะ โทษ ๆ" },
      { sender: "received", text: "ครับผม" },
      { sender: "sent", text: "เหมือนหล่อ" },
      { sender: "received", image: "assets/jojo.jpg" },
      { sender: "received", text: "ก็พอตัว" },

    ]
  },
  james: {
    name: "bro james",
    avatar: "assets/j.jpg",
    messages: [
      { sender: "received", text: "ขึ้นมานอน แม่จะปิดเน็ตแล้ว" },
      { sender: "sent", text: "โอ๊ย เดี๋ยวหนูขึ้นไป กุล่ะเบื่อ" },
      { sender: "received", text: "ล้างจานด้วยก่อนขึ้นมา" },
    ]
  },
  mint: {
    name: "nong mint",
    avatar: "assets/m.jpg",
    messages: [
      { sender: "received", text: "เราชอบโจ้อะ อย่าบอกใครนะ" },
      { sender: "sent", text: "ไม่บอกหรอก" },
      { sender: "received", text: "รู้กัน" },
      { sender: "sent", text: "กุที่บอกไปแล้ว หยอก ๆ" },
    ]
  }
};

let activeChatKey = "eom";

function openChatDetail(chatKey) {
  activeChatKey = chatKey;
  const currentChat = chatData[chatKey];
  if (!currentChat) return;

  const nameEl = document.getElementById("detailName");
  const avatarEl = document.getElementById("detailAvatar");
  const chatBody = document.getElementById("chatBody");
  const detailScreen = document.getElementById("chatDetailScreen");
  const messagesScreen = document.getElementById("messagesScreen"); // ดึงหน้า List รวมมาด้วย

  if (nameEl) nameEl.innerText = currentChat.name;
  if (avatarEl) avatarEl.src = currentChat.avatar;

  if (chatBody) {
    chatBody.innerHTML = `<div class="message-time">Yesterday 14:13</div>`;
    currentChat.messages.forEach(msg => {
      const bubbleClass = msg.sender === "sent" ? "bubble-sent" : "bubble-received";
      const bubble = document.createElement("div");
      bubble.className = `bubble ${bubbleClass}`;

      if (msg.image) {
        bubble.classList.add("msg-image");
        bubble.innerHTML = `<img src="${msg.image}" alt="Chat Photo">`;
      } else {
        bubble.innerText = msg.text;
      }

      chatBody.appendChild(bubble);
    });
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // ซ่อนหน้า List แล้วเปิดหน้า Detail แชตเดี่ยว
  if (messagesScreen) {
    messagesScreen.style.display = "none";
  }
  if (detailScreen) {
    detailScreen.style.display = "flex";
  }
}

function closeChatDetail(e) {
  if (e) e.stopPropagation(); // หยุดการส่งผ่านคลิกไม่ให้หลุดไปโดนปุ่มปิดแอป

  const detailScreen = document.getElementById("chatDetailScreen");
  const messagesScreen = document.getElementById("messagesScreen");

  // ปิดหน้า Detail แชตเดี่ยว แล้วโชว์หน้า List รวมแชตกลับมา
  if (detailScreen) {
    detailScreen.style.display = "none";
  }
  if (messagesScreen) {
    messagesScreen.style.display = "flex";
  }
}

// =========================================
// Photos Library & Viewer Logic
// =========================================
const photoList = [
  "assets/p4.jpg", "assets/p3.jpg", "assets/p16.jpg", "assets/p20.jpg",
  "assets/p21.jpg", "assets/p40.jpg", "assets/p10.jpg", "assets/p9.jpg",
  "assets/p11.jpg", "assets/p13.jpg", "assets/p14.jpg", "assets/p17.jpg"
];

let currentPhotoIndex = 0;

function openPhotoDetailByIndex(index) {
  currentPhotoIndex = index;
  const viewer = document.getElementById("photoDetailScreen");
  const largeImg = document.getElementById("detailLargePhoto");

  if (viewer && largeImg) {
    largeImg.src = photoList[currentPhotoIndex];
    viewer.style.display = "flex";
  }
}

function closePhotoDetail() {
  const photoDetailScreen = document.getElementById('photoDetailScreen');
  const photosScreen = document.getElementById('photosScreen');

  if (photoDetailScreen) photoDetailScreen.style.display = 'none';
  if (photosScreen) photosScreen.style.display = 'block'; // หรือ flex ตามสไตล์มึง
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photoList.length;
  const largeImg = document.getElementById("detailLargePhoto");
  if (largeImg) largeImg.src = photoList[currentPhotoIndex];
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photoList.length) % photoList.length;
  const largeImg = document.getElementById("detailLargePhoto");
  if (largeImg) largeImg.src = photoList[currentPhotoIndex];
}

window.addEventListener("keydown", (e) => {
  const viewer = document.getElementById("photoDetailScreen");
  if (viewer && viewer.style.display === "flex") {
    if (e.key === "ArrowRight") nextPhoto();
    else if (e.key === "ArrowLeft") prevPhoto();
    else if (e.key === "Escape") closePhotoDetail();
  }
});

// =========================================
// Apple Music Player Logic
// =========================================
const playlist = [
  { title: "เพื่อนไม่จริง", artist: "Polycat", src: "assets/song1.mp3", cover: "assets/plc.jpeg" },
  { title: "The feeling", artist: "Steve Lacy", src: "assets/song2.mp3", cover: "assets/st1.jpeg" },
  { title: "Steeeam", artist: "Shelly", src: "assets/s3.mp3", cover: "assets/shelly.jpg" },
  { title: "Be Like a Woman", artist: "Chris Rainbow", src: "assets/song4.mp3", cover: "assets/woman.jpeg" },
  { title: "E85", artist: "Don Toliver", src: "assets/E85.mp3", cover: "assets/don.jpeg" },
  { title: "Love", artist: "Keyshia Cole", src: "assets/Love.mp3", cover: "assets/love.jpeg" }


];
let currentTrackIndex = 0;
const audioPlayer = new Audio();
let isPlaying = false;

function playTrack(index) {
  document.querySelector('.mini-player').style.display = 'flex';
  currentTrackIndex = index;
  const track = playlist[currentTrackIndex];
  if (!track) return;

  audioPlayer.src = track.src;
  audioPlayer.load();
  audioPlayer.play().then(() => {
    isPlaying = true;
    updatePlayerUI();
  }).catch(err => {
    console.log(err);
    updatePlayerUI();
  });
}

function togglePlayMusic() {
  if (!audioPlayer.src) {
    playTrack(currentTrackIndex);
    return;
  }

  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
  } else {
    audioPlayer.play().then(() => {
      isPlaying = true;
      updatePlayButtonIcon();
    }).catch(err => console.log(err));
  }
  updatePlayButtonIcon();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playTrack(currentTrackIndex);
}

function updatePlayerUI() {
  const track = playlist[currentTrackIndex];
  if (!track) return;

  const titleEl = document.getElementById("nowPlayingTitle");
  const artistEl = document.getElementById("nowPlayingArtist");
  const artEl = document.getElementById("miniArt");

  if (titleEl) titleEl.textContent = track.title;
  if (artistEl) artistEl.textContent = track.artist;
  if (artEl && track.cover) artEl.src = track.cover;

  updatePlayButtonIcon();
}

function updatePlayButtonIcon() {
  const btn = document.getElementById("playPauseBtn");
  if (btn) {
    if (isPlaying) {
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#1c1c1e"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`;
    } else {
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#1c1c1e"><polygon points="6 4 19 12 6 20 6 4"></polygon></svg>`;
    }
  }
}

// =========================================
// Notes App Data & Render Logic
// =========================================
const notesData = [
  { id: 1, title: "นิสัยออม", body: "หัวเราะง่าย เส้นตื้น ใครพูดอะไรก็ขำ งั้น ๆ ไม่ได้น่ารักอะไรมากมาย แก้มแดงเหมือนหมูเด้งที่สวนสัตว์เปิดเขาเขียว" },
  { id: 2, title: "สิ่งที่กุจะไม่มีวันทำ", body: "1. ตด ขี้ เยี่ยว\n2. เดินชนเสา\n3. afk อาวีเวลาออมชวนเล่นโรบ้อก\n4. พูด 67 ตอนเห็นแบตโทรศัพท์\n5. บอกชอบออม" },
  { id: 3, title: "รายจ่ายต้นเดือนหน้า", body: "1. ยืมตังท่านโจ้เติมสกินฟรีฟาย500\n2. พาพี่เมี้ยนไปกินสเวนเส้นแต่พี่เมี้ยนออกให้ก่อน150\n3. ไปส่งเทพเจมที่หนองจอกแต่ให้พี่เขาออกให้ก่อน 300\n 4. พาออมไปทานลาบ ออมออก50 \nรวมเป็นเงินทั้งสิ้น 1000บาท เง้อ" },
  { id: 4, title: "ห้ามเปิด", body: "ออมยิ้มให้ทุกคน คุยดีกับทุกคน จนกุแยกไม่ออกเลยว่าที่ออมทำดีกับกุ มันพิเศษกว่าคนอื่นบ้างมั้ยหรือกุแค่หลอกตัวเองไปวัน ๆ 555 เห้อ น่ารัก \n\n ไม่อยากเป็นแค่คนที่คอยแอบมองอยู่ข้างหลังเลย อยากเดินเข้าไปบอกตรง ๆ แต่ก็กลัวคำตอบ กลัวว่าถ้าพูดออกไปแล้วจะมองหน้ากันไม่ติด กลัวจะเสียออมไปจากชีวิต\n\nต้องทำยังไงให้ออมรู้ดี กุต้องชัดเจนขนาดไหน ชอบจะตายอยู่แล้ว" }
];

function renderNotesList() {
  const container = document.getElementById("notesList");
  if (!container) return;

  container.innerHTML = "";
  notesData.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card-item";
    card.onclick = () => openNoteDetail(index);

    const titleEl = document.createElement("h3");
    titleEl.className = "note-card-title";
    titleEl.innerText = note.title;

    const snippetEl = document.createElement("p");
    snippetEl.className = "note-card-snippet";
    snippetEl.innerText = note.body ? note.body.replace(/\n/g, " ") : "";

    card.appendChild(titleEl);
    card.appendChild(snippetEl);
    container.appendChild(card);
  });
}

function openNoteDetail(index) {
  const note = notesData[index];
  if (!note) return;

  const titleEl = document.getElementById("noteDetailTitle");
  const bodyEl = document.getElementById("noteDetailBody");
  const detailScreen = document.getElementById("noteDetailScreen");
  const notesScreen = document.getElementById("notesScreen");

  if (titleEl) titleEl.innerText = note.title;
  if (bodyEl) bodyEl.innerText = note.body;

  if (notesScreen) notesScreen.style.display = "none";
  if (detailScreen) detailScreen.style.display = "flex";
}

// ฟังก์ชันกดย้อนกลับจากหน้าอ่าน Note กลับไปหน้ารวมแบบเสถียร
function closeNoteDetail() {
  // 1. ซ่อนหน้าต่างอ่าน Note เฉพาะตัว
  const detailScreen = document.getElementById("noteDetailScreen");
  if (detailScreen) {
    detailScreen.style.setProperty('display', 'none', 'important');
  }

  // 2. เปิดหน้าลิสต์รายการ Notes กลับมา
  const notesScreen = document.getElementById("notesScreen");
  if (notesScreen) {
    notesScreen.style.setProperty('display', 'flex', 'important');
  }
}

// =========================================
// Phone Call Simulator Logic
// =========================================
const callAudio = new Audio('assets/call_voice.mp3');
let callTimer = null;
let callDelayTimer = null;
let callAutoEndTimer = null;
let callSec = 0;

function startCall() {
  const statusText = document.getElementById("callStatusText");
  const subStatus = document.getElementById("callSubStatus");
  const startBtn = document.getElementById("startCallBtnContainer");
  const endBtn = document.getElementById("endCallBtnContainer");
  const keypad = document.getElementById("callKeypadGrid");

  if (statusText) statusText.innerText = "Calling...";
  if (subStatus) subStatus.innerText = "mobile";
  if (startBtn) startBtn.style.display = "none";
  if (endBtn) endBtn.style.display = "block";
  if (keypad) keypad.style.display = "none";

  callAudio.currentTime = 0;
  callAudio.play().catch(err => console.log(err));

  if (callDelayTimer) clearTimeout(callDelayTimer);
  if (callAutoEndTimer) clearTimeout(callAutoEndTimer);
  if (callTimer) clearInterval(callTimer);

  callDelayTimer = setTimeout(() => {
    if (statusText) statusText.innerText = "Connected";
    if (keypad) keypad.style.display = "grid";

    callSec = 0;
    callTimer = setInterval(() => {
      callSec++;
      const m = String(Math.floor(callSec / 60)).padStart(2, '0');
      const s = String(callSec % 60).padStart(2, '0');
      if (subStatus) subStatus.innerText = `${m}:${s}`;
    }, 1000);
  }, 5000);

  callAutoEndTimer = setTimeout(() => {
    endCall();
  }, 22000);
}

function endCall() {
  if (callDelayTimer) clearTimeout(callDelayTimer);
  if (callAutoEndTimer) clearTimeout(callAutoEndTimer);
  if (callTimer) clearInterval(callTimer);

  callAudio.pause();
  callAudio.currentTime = 0;

  const statusText = document.getElementById("callStatusText");
  const subStatus = document.getElementById("callSubStatus");
  const startBtn = document.getElementById("startCallBtnContainer");
  const endBtn = document.getElementById("endCallBtnContainer");
  const keypad = document.getElementById("callKeypadGrid");

  if (statusText) statusText.innerText = "Call Ended";
  if (keypad) keypad.style.display = "none";

  setTimeout(() => {
    if (statusText) statusText.innerText = "Ready to call";
    if (subStatus) subStatus.innerText = "mobile";
    if (startBtn) startBtn.style.display = "block";
    if (endBtn) endBtn.style.display = "none";
  }, 1200);
}

// =========================================
// Instagram DM & Modal Logic
// =========================================
function openIgChat() {
  const chatScreen = document.getElementById("igChatScreen");
  const dmBadge = document.getElementById("igDmBadge");

  if (chatScreen) {
    chatScreen.style.display = "flex";
  }
  if (dmBadge) {
    dmBadge.style.display = "none";
  }
}


// ฟังก์ชันปิดทุกแอปและกลับหน้า Home แบบเด็ดขาด
function closeIgApp() {
  // ซ่อนหน้าจอแอปและโฟลเดอร์ทั้งหมดในระบบ
  const allScreens = document.querySelectorAll('.app-screen, .screen, .folder-modal, #folderModal, #cameraScreen, #photoDetailScreen, #chatDetailScreen, #igScreen, #igFeedScreen, #igDmListScreen, #igChatScreen, #igPostModal, #musicScreen, #notesScreen, #noteDetailScreen, #photosScreen, #messagesScreen, #phoneScreen');

  allScreens.forEach(screen => {
    if (screen) {
      screen.style.setProperty('display', 'none', 'important');
    }
  });

  // หยุดวิดีโอกล้องหรือเสียงเพลงถ้าเปิดค้างอยู่
  const camVideo = document.getElementById('fakeCameraVideo');
  if (camVideo) { try { camVideo.pause(); } catch (e) { } }

  // แสดงหน้า Home Screen หลักขึ้นมา
  const homeScreen = document.getElementById("homeScreen");
  if (homeScreen) {
    homeScreen.style.setProperty('display', 'flex', 'important');
  }
}

// ผูกอีเวนต์คลิกกับขีดล่าง Global แบบบังคับรับแรงคลิก 100%
document.addEventListener("click", function (e) {
  const globalBar = document.getElementById("globalHomeBar");
  if (globalBar && (e.target === globalBar || globalBar.contains(e.target))) {
    e.stopPropagation();
    closeIgApp();
  }
});


let currentLikes = 0;
let isLiked = false;

// ฟังก์ชันเปิด Modal โพสต์ IG
function openPostModal(imgSrc, username, likes, caption) {
  const modal = document.getElementById('igPostModal');
  const postImg = document.getElementById('modalPostImg'); // ตรงนี้สำคัญมาก ต้องเป็น modalPostImg
  const userEl = document.getElementById('modalUsername');
  const captionUserEl = document.getElementById('modalCaptionUser');
  const captionEl = document.getElementById('modalCaptionText');
  const likesEl = document.getElementById('modalLikesCount');
  const likeBtn = document.getElementById('modalLikeBtn');

  if (modal) {
    // 1. ig post
    if (postImg) postImg.src = imgSrc;

    // 2. username
    if (userEl) userEl.innerText = username;
    if (captionUserEl) captionUserEl.innerText = username;

    // 3. cap
    if (captionEl) captionEl.innerText = caption || '';

    // 4. likes
    currentLikes = parseInt(likes, 10) || 0;
    if (likesEl) likesEl.innerText = currentLikes.toLocaleString();
    isLiked = false;
    if (likeBtn) likeBtn.innerText = '🤍';

    // 5. show display
    modal.style.display = 'flex';
  }
}

function closePostModal() {
  const modal = document.getElementById('igPostModal');
  if (modal) modal.style.display = 'none';
}

function toggleModalLike() {
  const likeBtn = document.getElementById('modalLikeBtn');
  const likesEl = document.getElementById('modalLikesCount');

  if (!isLiked) {
    isLiked = true;
    currentLikes += 1;
    if (likeBtn) likeBtn.innerText = '❤️';
  } else {
    isLiked = false;
    currentLikes -= 1;
    if (likeBtn) likeBtn.innerText = '🤍';
  }
  if (likesEl) likesEl.innerText = currentLikes.toLocaleString();
}

// ==========================================
// FOLDER SYSTEM CONTROL
// ==========================================
function openFolder() {
  const folderModal = document.getElementById("folderModal");
  if (folderModal) folderModal.style.display = 'flex';

  // ซ่อนแถบขีดล่างชั่วคราวตอนเปิดโฟลเดอร์ เพื่อไม่ให้มาบล็อกการคลิก
  const globalBar = document.getElementById("globalHomeBar");
  if (globalBar) globalBar.style.display = 'none';
}

function closeFolder() {
  const folderModal = document.getElementById("folderModal");
  if (folderModal) folderModal.style.display = 'none';

  // คืนค่าแถบขีดล่างกลับมา
  const globalBar = document.getElementById("globalHomeBar");
  if (globalBar) globalBar.style.display = 'flex';
}

function openAppFromFolder(screenId) {
  closeFolder();
  if (typeof openApp === "function") {
    openApp(screenId);
  } else {
    const home = document.getElementById('homeScreen');
    if (home) home.style.display = 'none';
    const target = document.getElementById(screenId);
    if (target) target.style.display = 'block';
  }
}

// 1. ฟังก์ชันกลางตัวเดียวจบ สั่งปิดแอปไหนก็เด้งกลับ Home ทันที
function closeApp(screenId) {
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.style.setProperty('display', 'none', 'important');
  }

  // เคลียร์พิเศษเฉพาะบางแอป (เช่น หยุดวิดีโอกล้อง หรือเคลียร์สายโทรศัพท์)
  if (screenId === 'cameraScreen') {
    const camVideo = document.getElementById('fakeCameraVideo');
    if (camVideo) { try { camVideo.pause(); } catch (e) { } }
  }
  if (screenId === 'phoneScreen' && typeof endCall === 'function') {
    endCall();
  }

  // ดีดหน้า Home กลับมาแสดงผลแบบบังคับเด็ดขาด
  const homeScreen = document.getElementById("homeScreen");
  if (homeScreen) {
    homeScreen.style.setProperty('display', 'flex', 'important');
  }
}

// 2. ฟังก์ชันปิดกล้อง (เรียกใช้ตัวกลางได้เลยทันที ไม่ง้องแง้ง)
function closeCameraApp() {
  closeApp('cameraScreen');
}

// 3. ฟังก์ชันออกหน้าโทรศัพท์
function exitPhoneApp() {
  closeApp('phoneScreen');
}
// ==========================================
// INSTAGRAM & DM NAVIGATION CONTROLLER
// ==========================================

// เปิดหน้า Inbox (หน้ารวมแชท 6 คน)
function openIgDmList() {
  const listScreen = document.getElementById("igDmListScreen");
  const chatScreen = document.getElementById("igChatScreen");
  const igScreen = document.getElementById("igScreen");

  if (igScreen) igScreen.style.display = "block";
  if (listScreen) listScreen.style.display = "flex";
  if (chatScreen) chatScreen.style.display = "none";
}

// ปิดหน้า Inbox (ซ่อนหน้าต่าง DM รวม)
function closeIgDmList() {
  const listScreen = document.getElementById("igDmListScreen");
  if (listScreen) listScreen.style.display = "none";
}

// กดเลือกแชทเพื่อนแต่ละคน (เวอร์ชันรับค่าแม่นยำ ไม่หลุด)
function openIgChat(chatKey) {
  const cleanKey = chatKey ? String(chatKey).trim().toLowerCase() : "eomeomsh";
  const chatData = igChatDatabase[cleanKey] || igChatDatabase["eomeomsh"];

  const listScreen = document.getElementById("igDmListScreen");
  const chatScreen = document.getElementById("igChatScreen");

  if (listScreen) listScreen.style.display = "none";

  const headerName = document.querySelector(".ig-chat-name");
  const headerAvatar = document.querySelector(".ig-chat-avatar");
  const headerStatus = document.querySelector(".ig-chat-status");

  if (headerName) headerName.innerText = chatData.name;
  if (headerAvatar) headerAvatar.src = chatData.avatar;
  if (headerStatus) headerStatus.innerText = chatData.status;

  const chatMessagesContainer = document.querySelector(".ig-chat-messages");
  if (chatMessagesContainer) {
    let htmlContent = `<div class="ig-chat-time">Today 2:04 AM</div>`;

    chatData.messages.forEach(msg => {
      if (msg.image) {
        // ถ้าเป็นรูปภาพ ให้แสดงภาพแบบอิสระ ไม่มีกรอบบับเบิลสีฟ้าครอบ
        let imageBubbleContent = `<img src="${msg.image}" style="max-width: 180px; border-radius: 16px; display: block; object-fit: cover;" alt="attachment">`;

        if (msg.sender === "incoming") {
          htmlContent += `
            <div class="ig-msg-row incoming">
              <img src="${chatData.avatar}" class="ig-msg-avatar" alt="avatar">
              <div style="background: transparent; padding: 0;" class="ig-msg-bubble">${imageBubbleContent}</div>
            </div>`;
        } else {
          htmlContent += `
            <div class="ig-msg-row outgoing">
              <div style="background: transparent; padding: 0;" class="ig-msg-bubble">${imageBubbleContent}</div>
            </div>`;
        }
      } else {
        // ถ้าเป็นข้อความตัวหนังสือปกติ ใช้บับเบิลตามเดิม
        let bubbleContent = msg.text;
        if (msg.sender === "incoming") {
          htmlContent += `
            <div class="ig-msg-row incoming">
              <img src="${chatData.avatar}" class="ig-msg-avatar" alt="avatar">
              <div class="ig-msg-bubble">${bubbleContent}</div>
            </div>`;
        } else {
          htmlContent += `
            <div class="ig-msg-row outgoing">
              <div class="ig-msg-bubble">${bubbleContent}</div>
            </div>`;
        }
      }
    });

    // ───────────────────────────────────

    if (chatData.showTyping) {
      htmlContent += `
        <div class="ig-chat-seen">Seen</div>
        <div class="ig-msg-row incoming ig-typing-row" id="igTypingIndicator">
          <img src="${chatData.avatar}" class="ig-msg-avatar" alt="avatar">
          <div class="ig-msg-bubble typing-bubble">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>`;
    }

    chatMessagesContainer.innerHTML = htmlContent;
  }

  if (chatScreen) {
    chatScreen.style.display = "flex";
  }
}

// ปุ่มย้อนกลับจากห้องแชทเดี่ยว (ให้กลับไปที่หน้า Inbox 6 คน)
function closeIgChatToInbox() {
  const chatScreen = document.getElementById("igChatScreen");
  const listScreen = document.getElementById("igDmListScreen");

  if (chatScreen) chatScreen.style.display = "none";
  if (listScreen) listScreen.style.display = "flex"; // กลับมาหน้า Inbox
}

// ปุ่มกดออกจากหน้า IG ทั้งหมดกลับสู่หน้า Home
function closeIgAppCompletely() {
  const listScreen = document.getElementById("igDmListScreen");
  const chatScreen = document.getElementById("igChatScreen");
  const igScreen = document.getElementById("igScreen");
  const homeScreen = document.getElementById("homeScreen");

  if (listScreen) listScreen.style.display = "none";
  if (chatScreen) chatScreen.style.display = "none";
  if (igScreen) igScreen.style.display = "none";
  if (homeScreen) homeScreen.style.display = "block";
}

const igChatDatabase = {
  "eomeomsh": {
    name: "eomeomsh",
    avatar: "assets/p8.jpg",
    status: "Active now",
    showTyping: true,
    messages: [
      { sender: "incoming", text: "เราว่าเป็นเพื่อนกันไปก่อนดีกว่า" },
      { sender: "incoming", text: "เมื่อวานที่แกบอกมา" },
      { sender: "incoming", text: "เรานอนคิดเรื่องนี้ทั้งคืนเลย" },
      { sender: "outgoing", text: "แล้วที่ผ่านมาอะ" },
      { sender: "incoming", text: "หมายถึงยังไง" },
      { sender: "outgoing", text: "ที่แกคอยโทรหา คอยชวนไปนู่นไปนี่ กินข้าวด้วยกันตลอด" },
      { sender: "incoming", text: "ขอโทษ" },
      { sender: "outgoing", text: "สำหรับแก ความรู้สึกเราเคยมีความหมายบ้างมั้ย" },
      { sender: "incoming", text: "มันมีความหมายกับเรา" },
      { sender: "incoming", text: "แต่แบบเพื่อน" },
      { sender: "outgoing", text: "โอเค" },
      { sender: "incoming", text: "แก" },
      { sender: "outgoing", text: "ขอโทษที่ทำให้อึดอัด" },
      { sender: "incoming", text: "ยิ่งพูดแบบนี้ เรายิ่งอึดอัดนะรู้ปะ" },
      { sender: "incoming", text: "เราไม่ได้อยากเสียเพื่อนแบบแกไปนะ" },
      { sender: "incoming", text: "แต่เราก็ไม่รู้จะทำยังไงเหมือนกัน" },
      { sender: "outgoing", text: "ช่างมันเถอะ" },
      { sender: "outgoing", text: "จะพยายามเลิกชอบให้ได้ละกัน" },
      { sender: "incoming", text: "รับสายหน่อยได้มั้ย" },
      { sender: "outgoing", text: "มาหาเค้าดิ" }
    ]
  },
  "lamineyamal": {
    name: "lamineyamal",
    avatar: "assets/empty.png",
    status: "Active 10h ago",
    showTyping: false,
    messages: [
      { sender: "outgoing", text: "ทำไมไม่ได้บังลังดอร์" },
      { sender: "outgoing", text: "i love you" },
      { sender: "outgoing", text: "อกหักว่ะ" },
    ]
  },
  "jjojuhoon": {
    name: "jjujuhoon",
    avatar: "assets/jh.jpg",
    status: "Active now",
    showTyping: false,
    messages: [
      { sender: "incoming", text: "rov ปะ" },
      { sender: "outgoing", text: "เล่นเลย" },
      { sender: "outgoing", text: "หมดอารมณ์" },
      { sender: "incoming", text: "อกหักหรอ" },
      { sender: "outgoing", text: "มั่ว" },
      { sender: "incoming", text: "จะได้ไปชวนน้องออมเล่น" },
      { sender: "outgoing", text: "ไปซะไป" },
      { sender: "incoming", image: "assets/fat.jpg" },
      { sender: "outgoing", text: "ว่าละทำไมโทสับกุเมมเต็ม" },
      { sender: "incoming", text: "ทำไม" },
      { sender: "outgoing", text: "อ้วนจัด" },

    ]
  },
  "jamesjinja": {
    name: "jamesjinja",
    avatar: "assets/j.jpg",
    status: "Active 2h ago",
    showTyping: false,
    messages: [
      { sender: "incoming", text: " ว่าไงน้องชาย" },
      { sender: "outgoing", text: "อะไร พี่ทักผมมานะเอ้า" },
    ]
  },
  "mmitin": {
    name: "mmitin",
    avatar: "assets/m.jpg",
    status: "Active 3h ago",
    showTyping: false,
    messages: [
      { sender: "incoming", text: "เดี๋ยวเอากีต้าไปคืน" },
      { sender: "outgoing", text: "มาเลยแหม่ม เศร้า" },
      { sender: "incoming", text: "ใครทำ" },
      { sender: "outgoing", text: "มีอยู่คนเดียว" },
      { sender: "outgoing", image: "assets/cute.jpg" },
      { sender: "incoming", text: "รู้เรื่อง" },


    ]
  },
  "instagram_user": {
    name: "Instagram User",
    avatar: "assets/empty.png",
    status: "Active 9h ago",
    showTyping: false,
    messages: [
      { sender: "incoming", text: "เพื่อนฝากถามว่าโสดมั้ยคะ" }
    ]
  }
};



function switchIgTab(tabName) {
  const profileScreen = document.getElementById("igScreen");
  const feedScreen = document.getElementById("igFeedScreen");
  const dmScreen = document.getElementById("igDmListScreen");

  // 🟢 สั่งซ่อนหน้า DM เสมอ ไม่ว่าจะกดสลับไปหน้าไหน
  if (dmScreen) dmScreen.style.display = "none";

  if (tabName === 'feed') {
    if (profileScreen) profileScreen.style.display = "none";
    if (feedScreen) feedScreen.style.display = "flex";
  } else if (tabName === 'profile') {
    if (feedScreen) feedScreen.style.display = "none";
    if (profileScreen) profileScreen.style.display = "flex";
  }
}

// 1. ฟังก์ชันสั่งล้าง/ซ่อนหน้า IG ทั้งหมด
function closeAllIg() {
  ['igScreen', 'igFeedScreen', 'igDmListScreen'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// 2. สั่งให้ JS ดักจับและใส่คำสั่งปิด IG ให้กับแท็ก .home-bar ทั้ง 22 อันให้อัตโนมัติ
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.home-bar').forEach(bar => {
    bar.addEventListener('click', closeAllIg);
  });
});


// ฟังก์ชันกดแชร์โพสต์จริง (ใช้ Web Share API)
function sharePost(postTitle) {
  const shareData = {
    title: 'Instagram',
    text: postTitle ? `ดูโพสต์ของ ${postTitle} บน Instagram!` : 'ดูเว็บจำลอง Instagram นี้สิ!',
    url: window.location.href // แชร์ URL หน้าเว็บ GitHub Pages ของเรา
  };

  // ถ้าเปิดบนมือถือ (iOS/Android) จะเด้ง Share Sheet ของระบบขึ้นมา
  if (navigator.share) {
    navigator.share(shareData).catch((err) => console.log('Share canceled', err));
  } else {
    // ถ้าเปิดบนคอม จะก๊อปปี้ลิงก์ลง Clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('📋 คัดลอกลิงก์เว็บเรียบร้อยแล้ว!');
    }).catch(() => {
      alert('ไม่สามารถคัดลอกลิงก์ได้');
    });
  }
}


// ฟังก์ชันกดรูปโปรไฟล์ แล้วเด้งไปหน้า Feed พร้อมเลื่อนไปที่รูปนั้นทันที
function goToPost(postId) {
  const profileScreen = document.getElementById("igScreen");
  const feedScreen = document.getElementById("igFeedScreen");
  const dmScreen = document.getElementById("igDmListScreen");

  if (profileScreen) profileScreen.style.display = "none";
  if (dmScreen) dmScreen.style.display = "none";

  if (feedScreen) {
    feedScreen.style.display = "flex";

    setTimeout(() => {
      const targetPost = document.getElementById(postId);
      if (targetPost) {
        targetPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
}

// ฟังก์ชันเปิดฟีด 6 โพสต์ของ keon แล้วสกรอลล์ไปรูปที่เลือกทันที
function openKeonFeed(postId) {
  const modal = document.getElementById("igPostModal");
  if (!modal) return;
  modal.style.display = "flex";

  if (postId) {
    setTimeout(() => {
      const targetPost = document.getElementById(postId);
      if (targetPost) {
        targetPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
}

// ปิดหน้าฟีด keon กลับไปตารางโปรไฟล์
function closePostModal() {
  const modal = document.getElementById("igPostModal");
  if (modal) modal.style.display = "none";
}

// ฟังก์ชันกดขีดล่าง iPhone เพื่อปิดแอป IG ออกไปหน้า Home จากทุกหน้า
function closeIgApp() {
  // 1. ซ่อนหน้าจอ IG ทั้งหมด
  const igScreens = ["igScreen", "igFeedScreen", "igDmListScreen", "igPostModal"];
  igScreens.forEach(id => {
    const screen = document.getElementById(id);
    if (screen) screen.style.display = "none";
  });

  // 2. แสดงหน้า Home Screen หลักของ iPhone
  const homeScreen = document.getElementById("homeScreen");
  if (homeScreen) {
    homeScreen.style.display = "flex";
  }
}


// สร้างและแปะ Global Home Bar ลงในหน้าจอ iPhone อัตโนมัติ ป้องกัน HTML ซ้อนทับพัง
document.addEventListener("DOMContentLoaded", () => {
  const iphoneFrame = document.querySelector(".iphone-frame");
  if (iphoneFrame && !document.getElementById("globalHomeBar")) {
    const globalBar = document.createElement("div");
    globalBar.id = "globalHomeBar";
    globalBar.innerHTML = '<div style="width: 134px; height: 5px; background: #ffffff; border-radius: 10px; pointer-events: none;"></div>';

    // ตั้งสไตล์ให้ลอยอยู่ชั้นบนสุดตลอดเวลา ไม่ว่าเปิดแอปไหน
    globalBar.style.cssText = "position: absolute; bottom: 0; left: 0; width: 100%; height: 45px; display: flex; justify-content: center; align-items: flex-end; padding-bottom: 8px; cursor: pointer; z-index: 2147483647 !important; pointer-events: auto !important;";

    // ผูกคำสั่งคลิกเพื่อปิดแอปกลับหน้า Home ทันที
    globalBar.addEventListener("click", (e) => {
      e.stopPropagation();
      closeIgApp();
    });

    iphoneFrame.appendChild(globalBar);
  }
});


// ดักจับการคลิกทุกจุดบนหน้าจอ ถ้ากดโดนขีดล่างหรือปุ่มย้อนกลับ สั่งปิดแอปทันทีแบบเด็ดขาด
document.addEventListener("click", function (e) {
  if (e.target.closest('.home-bar-container') || e.target.closest('#globalHomeBar') || e.target.classList.contains('nav-back-btn') || e.target.classList.contains('back-btn')) {

    // 🚨 1. สั่งหยุดเสียงและวิดีโอทุกตัวบนหน้าจอทันที! (แก้บั๊กเสียงค้างตอนกด Home 100%)
    document.querySelectorAll('audio, video').forEach(media => {
      try {
        media.pause();
        media.currentTime = 0;
      } catch (err) { }
    });

    // หาว่าตอนนี้หน้าแอปไหนเปิดอยู่
    const activeScreens = document.querySelectorAll('.app-screen, .screen, .folder-modal');
    activeScreens.forEach(screen => {
      if (screen && screen.id !== 'homeScreen' && window.getComputedStyle(screen).display !== 'none') {
        screen.style.setProperty('display', 'none', 'important');
      }
    });

    // เคลียร์สายโทรศัพท์ถ้ามี
    if (typeof endCall === 'function') { endCall(); }

    // ดีดหน้า Home กลับมาแสดงผล
    const home = document.getElementById('homeScreen');
    if (home) {
      home.style.setProperty('display', 'flex', 'important');
    }
  }
});


// 🟢 ฟังก์ชันกลางสำหรับกดขีดล่าง Home Bar เพื่อกลับหน้า Home ทันทีทุกแอป
function goHomeUniversal() {
  // 🚨 2. ดักตัดเสียงอีกชั้นนึงเพื่อความชัวร์ 
  document.querySelectorAll('audio, video').forEach(media => {
    try {
      media.pause();
      media.currentTime = 0;
    } catch (err) { }
  });

  const allScreens = document.querySelectorAll('.app-screen, .screen, .folder-modal');
  allScreens.forEach(screen => {
    if (screen && screen.id !== 'homeScreen') {
      screen.style.setProperty('display', 'none', 'important');
    }
  });

  if (typeof endCall === 'function') { endCall(); }

  const homeScreen = document.getElementById("homeScreen");
  if (homeScreen) {
    homeScreen.style.setProperty('display', 'flex', 'important');
  }
}


// เปิดแอปกล้อง (เวอร์ชันสมบูรณ์ สั่งปิดโฟลเดอร์และบังคับแสดงผลหน้ากล้อง)
function openCameraApp() {
  // 1. ซ่อนหน้า Home และปิดโฟลเดอร์ทันที
  const homeScreen = document.getElementById("homeScreen");
  if (homeScreen) {
    homeScreen.style.setProperty('display', 'none', 'important');
  }

  const folderModal = document.getElementById("folderModal");
  if (folderModal) {
    folderModal.style.setProperty('display', 'none', 'important');
  }

  // 2. ปิดหน้าแอปอื่นๆ เผื่อค้างอยู่
  const allScreens = document.querySelectorAll('.app-screen, .screen');
  allScreens.forEach(s => {
    if (s.id !== 'cameraScreen') {
      s.style.setProperty('display', 'none', 'important');
    }
  });

  // 3. เปิดหน้ากล้องขึ้นมาแบบบังคับแสดงผล
  const camScreen = document.getElementById("cameraScreen");
  if (camScreen) {
    camScreen.style.setProperty('display', 'flex', 'important');
  }

  // 4. เล่นวิดีโอจำลองกล้องหน้า
  const camVideo = document.getElementById("fakeCameraVideo");
  if (camVideo) {
    camVideo.currentTime = 0;
    camVideo.muted = false;
    camVideo.play().catch(e => console.log("Auto-play prevented", e));
  }
}



// เปิดหน้า Drafts ของ TikTok
function openTikTokDrafts() {
  const profileScreen = document.getElementById("tiktokScreen");
  const draftsScreen = document.getElementById("tiktokDraftsScreen");
  if (profileScreen) profileScreen.style.setProperty('display', 'none', 'important');
  if (draftsScreen) draftsScreen.style.setProperty('display', 'flex', 'important');
}

// ปิดหน้า Drafts กลับมาหน้าโปรไฟล์ TikTok
function closeTikTokDrafts() {
  const profileScreen = document.getElementById("tiktokScreen");
  const draftsScreen = document.getElementById("tiktokDraftsScreen");
  if (draftsScreen) draftsScreen.style.setProperty('display', 'none', 'important');
  if (profileScreen) profileScreen.style.setProperty('display', 'flex', 'important');
}

// กดที่ Drafts แล้วเล่นเพลงจำลอง
function playTikTokDraftMusic() {
  alert("🎵 Playing audio: Karl (Sample Track)");
}



// ฟังก์ชันเปิด TikTok จากในโฟลเดอร์แบบปลอดภัย ไม่เด้งหลุด
function openTikTokFromFolder() {
  // 1. ปิดหน้าต่างโฟลเดอร์ก่อน
  const folderModal = document.getElementById("folderModal");
  if (folderModal) {
    folderModal.style.setProperty('display', 'none', 'important');
  }

  // 2. ปิดหน้า Home
  const homeScreen = document.getElementById("homeScreen");
  if (homeScreen) {
    homeScreen.style.setProperty('display', 'none', 'important');
  }

  // 3. เปิดหน้าจอ TikTok ขึ้นมา
  const tiktokScreen = document.getElementById("tiktokScreen");
  if (tiktokScreen) {
    tiktokScreen.style.setProperty('display', 'flex', 'important');
  }
}


// ตัวแปรเก็บเสียงเพลงแยกของ TikTok Drafts
const tiktokMusic = new Audio("assets/audio.mp3"); // เปลี่ยนชื่อไฟล์เสียงตามที่มึงมีใน assets ได้เลย

function openTikTokVideoPlayer(videoSrc, audioSrc, songTitle) {
  const draftsScreen = document.getElementById("tiktokDraftsScreen");
  if (draftsScreen) draftsScreen.style.setProperty('display', 'none', 'important');

  const playerScreen = document.getElementById("tiktokVideoPlayerScreen");
  if (playerScreen) {
    playerScreen.style.setProperty('display', 'flex', 'important');
  }

  // เซ็ตและเล่นวิดีโอ
  const videoEl = document.getElementById("tiktokDraftVideo");
  if (videoEl) {
    videoEl.src = videoSrc;
    videoEl.currentTime = 0;
    videoEl.play();
  }

  // เซ็ตและเล่นไฟล์เสียง tiktoksound.mp3
  const audioEl = document.getElementById("tiktokAudioPlayer");
  if (audioEl) {
    audioEl.src = audioSrc;
    audioEl.currentTime = 0;
    audioEl.play().catch(e => console.log("Audio play blocked:", e));
  }

  // เปลี่ยนชื่อเพลงด้านบน
  const titleEl = document.getElementById("tiktokSongTitleText");
  if (titleEl) {
    titleEl.innerText = "🎵 " + songTitle;
  }
}


// ==========================================
// 📌 SECTION 1: ระบบดราฟต์ (TikTok Drafts)
// ==========================================

// 1. กด Back จากหน้าเล่นคลิปดราฟต์เดี่ยว -> ถอยกลับหน้า Drafts List
function closeTikTokVideoPlayer(e) {
  if (e) e.stopPropagation();

  const playerScreen = document.getElementById("tiktokVideoPlayerScreen");
  if (playerScreen) playerScreen.style.setProperty('display', 'none', 'important');

  forceStopAllMedia();

  const draftsScreen = document.getElementById("tiktokDraftsScreen");
  if (draftsScreen) draftsScreen.style.setProperty('display', 'flex', 'important');
}

// 2. กด Back จากหน้า Drafts List -> ปิดหน้าดราฟต์กลับไป Profile
function closeTikTokDrafts(e) {
  if (e) e.stopPropagation();

  const draftsScreen = document.getElementById("tiktokDraftsScreen");
  if (draftsScreen) draftsScreen.style.setProperty('display', 'none', 'important');

  forceStopAllMedia();
}

// 3. เปิดหน้า Drafts List
function openTikTokDrafts() {
  forceStopAllMedia();
  const draftScreen = document.getElementById('tiktokDraftsScreen');
  if (draftScreen) draftScreen.style.setProperty('display', 'flex', 'important');
}

// 4. เปิดดูคลิปดราฟต์เดี่ยว
function openTikTokVideoPlayer(videoPath, audioPath, songTitle) {
  forceStopAllMedia();

  const draftsScreen = document.getElementById("tiktokDraftsScreen");
  if (draftsScreen) draftsScreen.style.setProperty('display', 'none', 'important');

  const playerScreen = document.getElementById('tiktokVideoPlayerScreen');
  const videoElem = document.getElementById('tiktokDraftVideo');
  const audioElem = document.getElementById('tiktokAudioPlayer');
  const songTitleElem = document.getElementById('tiktokSongTitleText');

  if (playerScreen) playerScreen.style.setProperty('display', 'flex', 'important');

  if (videoElem && videoPath) {
    videoElem.src = videoPath;
    videoElem.muted = true;
    videoElem.currentTime = 0;
    videoElem.play().catch(err => console.log(err));
  }

  if (audioElem && audioPath) {
    audioElem.src = audioPath;
    audioElem.currentTime = 0;
    audioElem.play().catch(err => console.log(err));
  }

  if (songTitleElem && songTitle) {
    songTitleElem.innerText = '🎵 ' + songTitle;
  }
}


// ==========================================
// 📌 SECTION 2: ระบบฟีดคลิปหลัก (ช่อง 2 & ช่อง 3)
// ==========================================

// 1. กดเปิดฟีดคลิปจากรูปแรก (เสื้อขาว - คลิปที่ 1)
function openTiktokPostedVideo() {
  forceStopAllMedia();
  const container = document.getElementById('tiktokFeedContainer');
  
  if (container) {
    container.style.setProperty('display', 'block', 'important');
    container.scrollTop = 0; // ตั้งเริ่มที่คลิปแรกสุด
  }

  playMediaAtItem(0);
}

// 2. กดเปิดฟีดคลิกจากรูปสอง (น้องออม - คลิปที่ 2)
function openTikTokVideoPlayer3() {
  forceStopAllMedia();
  const container = document.getElementById('tiktokFeedContainer');
  
  if (container) {
    container.style.setProperty('display', 'block', 'important');
    // เลื่อนลงไปตำแหน่งคลิปที่ 2
    container.scrollTop = container.clientHeight;
  }

  playMediaAtItem(1);
}

// 3. กด Back ปิดหน้าฟีดคลิป
function closeTiktokPostedVideo(e) {
  if (e) e.stopPropagation();

  const container = document.getElementById('tiktokFeedContainer');
  if (container) container.style.setProperty('display', 'none', 'important');

  forceStopAllMedia();
}

// 4. ฟังก์ชันควบคุมเล่นมีเดียตามลำดับคลิป (0 = เสื้อขาว, 1 = น้องออม)
function playMediaAtItem(index) {
  const items = document.querySelectorAll('#tiktokFeedContainer .tiktok-feed-item');
  
  items.forEach((item, i) => {
    const audios = item.querySelectorAll('audio');
    const videos = item.querySelectorAll('video');

    if (i === index) {
      videos.forEach(v => { v.muted = true; v.currentTime = 0; v.play().catch(e => console.log(e)); });
      audios.forEach(a => { a.currentTime = 0; a.play().catch(e => console.log(e)); });
    } else {
      videos.forEach(v => { v.pause(); v.currentTime = 0; });
      audios.forEach(a => { a.pause(); a.currentTime = 0; });
    }
  });
}

// 5. ระบบตรวจจับการเลื่อนสกรอลล์หน้าฟีด (Scroll Listener)
document.addEventListener('DOMContentLoaded', function() {
  const feedContainer = document.getElementById('tiktokFeedContainer');
  if (feedContainer) {
    feedContainer.addEventListener('scroll', () => {
      const containerHeight = feedContainer.clientHeight;
      if (containerHeight === 0) return;

      const currentIndex = Math.round(feedContainer.scrollTop / containerHeight);
      playMediaAtItem(currentIndex);
    });
  }
});


// ==========================================
// 📌 SECTION 3: ฟังก์ชันปิดแอปหลัก & Home Bar
// ==========================================

// ปิด TikTok ทั้งหมด
function closeTikTok(e) {
  if (e) e.stopPropagation();

  const tiktokScreen = document.getElementById("tiktokScreen");
  if (tiktokScreen) tiktokScreen.style.setProperty('display', 'none', 'important');

  const container = document.getElementById('tiktokFeedContainer');
  if (container) container.style.setProperty('display', 'none', 'important');

  const draftsScreen = document.getElementById("tiktokDraftsScreen");
  if (draftsScreen) draftsScreen.style.setProperty('display', 'none', 'important');

  const playerScreen = document.getElementById("tiktokVideoPlayerScreen");
  if (playerScreen) playerScreen.style.setProperty('display', 'none', 'important');

  forceStopAllMedia();
}

// ฟังก์ชันหยุดสื่อทั้งหมดฉุกเฉิน
function forceStopAllMedia() {
  document.querySelectorAll('audio, video').forEach(media => {
    try {
      media.pause();
      media.currentTime = 0;
    } catch (e) {
      console.log(e);
    }
  });
}

// Global Home Bar
window.goHomeUniversal = function() {
  forceStopAllMedia();

  const allScreens = document.querySelectorAll('.app-screen, .screen');
  allScreens.forEach(s => {
    if (s.id !== 'homeScreen') {
      s.style.setProperty('display', 'none', 'important');
    }
  });

  const home = document.getElementById('homeScreen');
  if (home) home.style.setProperty('display', 'flex', 'important');
};


// ==========================================
// 📌 ระบบ Search ของ Instagram (IG Search)
// ==========================================

// 1. เปิดหน้า Search IG
function openIgSearch() {
  const searchScreen = document.getElementById("igSearchScreen");
  if (searchScreen) {
    searchScreen.style.setProperty('display', 'flex', 'important');
    searchScreen.style.setProperty('z-index', '99999', 'important'); // ดึงขึ้นมาบังหน้าสุด
  }
  
  setTimeout(() => {
    const input = document.getElementById("igSearchInput");
    if (input) {
      input.focus();
    }
  }, 100);
}

// 2. ปิดหน้า Search IG
function closeIgSearch(e) {
  if (e) e.stopPropagation();

  const searchScreen = document.getElementById("igSearchScreen");
  if (searchScreen) {
    searchScreen.style.setProperty('display', 'none', 'important');
    searchScreen.style.setProperty('z-index', '-1', 'important'); // ส่งลงไปข้างหลังสุด ไม่ให้บังปุ่มอื่น
  }
}

// 3. ฟังก์ชันค้นหาในช่อง Input (ถ้ามี)
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById("igSearchInput");
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      const searchResults = document.querySelectorAll('.ig-search-item'); // หรือ class รายการค้นหาของมึง
      
      searchResults.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});

function goHomeFromChat(e) {
  if (e) e.stopPropagation();

  // 1. ปิดหน้าแชตเดี่ยว
  const chatDetail = document.getElementById('chatDetailScreen');
  if (chatDetail) chatDetail.style.setProperty('display', 'none', 'important');

  // 2. ปิดหน้ารวมแชต iMessage
  const messagesScreen = document.getElementById('messagesScreen');
  if (messagesScreen) messagesScreen.style.setProperty('display', 'none', 'important');

  // 3. ปิดทุกแอปสกรีน
  document.querySelectorAll('.screen, .app-screen').forEach(s => {
    if (s.id !== 'homeScreen') {
      s.style.setProperty('display', 'none', 'important');
    }
  });

  // 4. เปิดหน้า Home หลัก
  const home = document.getElementById('homeScreen');
  if (home) home.style.setProperty('display', 'flex', 'important');
}