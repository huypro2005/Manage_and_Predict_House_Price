// Import từ CDN để trình duyệt hiểu được ESM mà không cần bundler
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase config của bạn — sửa storageBucket nếu cần
const firebaseConfig = {
  apiKey: "AIzaSyAL7R2-9_wvgrwwLgNknZHvlZbHMqgxZCc",
  authDomain: "auth-e0be2.firebaseapp.com",
  projectId: "auth-e0be2",
  storageBucket: "auth-e0be2.appspot.com", // <- thường là dạng này
  messagingSenderId: "301149939517",
  appId: "1:301149939517:web:d58f814569025813a80754",
  measurementId: "G-Z7PFZEETT9"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
// Analytics chỉ hoạt động trên https hoặc localhost – có thể comment nếu chưa cần
try { getAnalytics(app); } catch (e) { /* ignore on http */ }

// Auth + Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Bắt buộc user chọn account mỗi lần đăng nhập
provider.setCustomParameters({ prompt: "select_account" });

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
        console.log("👤 User đã đăng nhập:", user.email, "UID:", uid);
        showUserInfo(user);
    } else {
        // User is signed out
        console.log("👋 User đã đăng xuất");
        showUserInfo(null);
    }
});

async function signInWithGoogle() {
  try {
    console.log("🔄 Bắt đầu quá trình đăng nhập Google...");
    
    // Hiển thị loading state
    const btnIn = document.getElementById("google-btn-signin");
    const btnUp = document.getElementById("google-btn-signup");
    const originalText = btnIn ? btnIn.textContent : "Sign In with Google";
    
    if (btnIn) btnIn.textContent = "Đang đăng nhập...";
    if (btnUp) btnUp.textContent = "Đang đăng nhập...";
    
    // Mở popup để user chọn account
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    console.log("✅ User đã chọn account:", user.email);
    console.log("🔄 Đang lấy Firebase ID token...");

    // Lấy Firebase ID token mới (force refresh)
    const idToken = await user.getIdToken(true);
    console.log(`📏 Token length: ${idToken.length}`);
    console.log(`🔑 Token preview: ${idToken.substring(0, 50)}...`);

    // Gửi ID token lên backend
    console.log("🌐 Đang gửi token lên server...");
    const res = await fetch("http://localhost:8000/api/v1/oauth/firebase/google/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken })
    });
    
    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log("✅ Server response:", data);
    
    // Khôi phục text button
    if (btnIn) btnIn.textContent = originalText;
    if (btnUp) btnUp.textContent = originalText;
    
    alert("🎉 Đăng nhập thành công! Kiểm tra console để xem chi tiết.");
    
  } catch (err) {
    console.error("❌ Lỗi đăng nhập:", err);
    
    // Khôi phục text button
    const btnIn = document.getElementById("google-btn-signin");
    const btnUp = document.getElementById("google-btn-signup");
    if (btnIn) btnIn.textContent = "Sign In with Google";
    if (btnUp) btnUp.textContent = "Sign Up with Google";
    
    if (err.code === 'auth/popup-closed-by-user') {
      alert("❌ Bạn đã đóng popup đăng nhập. Vui lòng thử lại.");
    } else if (err.code === 'auth/popup-blocked') {
      alert("❌ Popup bị chặn. Vui lòng cho phép popup và thử lại.");
    } else {
      alert("❌ Lỗi đăng nhập: " + err.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnIn  = document.getElementById("google-btn-signin");
  const btnUp  = document.getElementById("google-btn-signup");
  btnIn  && btnIn.addEventListener("click", signInWithGoogle);
  btnUp  && btnUp.addEventListener("click", signInWithGoogle);
});
