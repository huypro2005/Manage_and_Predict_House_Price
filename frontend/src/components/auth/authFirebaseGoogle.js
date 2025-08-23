const app = initializeApp(firebaseConfig);
// Analytics chỉ hoạt động trên https hoặc localhost – có thể comment nếu chưa cần
try { getAnalytics(app); } catch (e) { /* ignore on http */ }

// Auth + Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// (tùy chọn) yêu cầu user chọn account mỗi lần
// provider.setCustomParameters({ prompt: "select_account" });

// Biến để lưu trạng thái user
let currentUser = null;

// Function để hiển thị thông tin user
function showUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    if (!userInfoDiv) return;

    if (user) {
        userInfoDiv.innerHTML = `
            <div class="user-profile">
                <img src="${user.photoURL || 'https://via.placeholder.com/50'}" alt="Profile" class="user-avatar">
                <div class="user-details">
                    <h3>Welcome, ${user.displayName || user.email}</h3>
                    <p>Email: ${user.email}</p>
                    <p>User ID: ${user.uid}</p>
                    <button id="signout-btn" class="signout-btn">Sign Out</button>
                </div>
            </div>
        `;
        
        // Thêm event listener cho nút sign out
        document.getElementById('signout-btn').addEventListener('click', signOutUser);
        
        // Ẩn form đăng nhập
        const cont = document.querySelector('.cont');
        if (cont) cont.style.display = 'none';
        
    } else {
        userInfoDiv.innerHTML = '';
        // Hiện lại form đăng nhập
        const cont = document.querySelector('.cont');
        if (cont) cont.style.display = 'block';
    }
}

// Function đăng xuất
async function signOutUser() {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
        alert("Đăng xuất thành công!");
    } catch (error) {
        console.error("Sign out error:", error);
        alert("Lỗi khi đăng xuất: " + error.message);
    }
}

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("User signed in:", user.email, "UID:", uid);
        showUserInfo(user);
    } else {
        // User is signed out
        console.log("User signed out");
        showUserInfo(null);
    }
});

async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Lấy Firebase ID token để gửi về backend của bạn
    const idToken = await user.getIdToken(true);
    console.log(`idToken: ${idToken}`);

    // Gửi ID token lên Django (endpoint bạn đã/ sẽ tạo)
    const res = await fetch("http://localhost:8000/api/v1/oauth/firebase/google/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken})
    });
    const data = await res.json();
    console.log("Server JWT:", data);

    alert("Google sign-in OK! Mở console để xem chi tiết.");
  } catch (err) {
    console.error("Google sign-in error:", err.code, err.message);
    alert("Sign-in failed: " + err.message);
  }
}

export { signInWithGoogle, signOutUser, showUserInfo };