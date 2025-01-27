import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Configura tu proyecto Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elementos del DOM
const usernameInput = document.getElementById("username");
const registerBtn = document.getElementById("register-btn");
const plantBtn = document.getElementById("plant-btn");
const userSection = document.getElementById("user-section");
const plantSection = document.getElementById("plant-section");
const displayUsername = document.getElementById("display-username");
const userTrees = document.getElementById("user-trees");
const totalTrees = document.getElementById("total-trees");
const ranking = document.getElementById("ranking");

let username = "";
let userTreeCount = 0;
let globalTreeCount = 0;

// Función para registrar usuario
registerBtn.addEventListener("click", async () => {
  username = usernameInput.value.trim();
  if (username) {
    displayUsername.textContent = username;
    userSection.style.display = "none";
    plantSection.style.display = "block";

    // Crea o actualiza el usuario en la base de datos
    const userRef = doc(db, "users", username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, { trees: 0 });
    } else {
      userTreeCount = userDoc.data().trees;
      userTrees.textContent = userTreeCount;
    }
  }
});

// Función para plantar un árbol
plantBtn.addEventListener("click", async () => {
  userTreeCount++;
  globalTreeCount++;
  userTrees.textContent = userTreeCount;
  totalTrees.textContent = globalTreeCount;

  // Actualiza los datos en la base de datos
  const userRef = doc(db, "users", username);
  await updateDoc(userRef, { trees: userTreeCount });

  const globalRef = doc(db, "global", "stats");
  await updateDoc(globalRef, { totalTrees: globalTreeCount });

  if (userTreeCount % 100 === 0) {
    alert(`¡Felicidades ${username}! ¡Has plantado ${userTreeCount} árboles!`);
  }
});

// Escucha los cambios en el conteo global
const globalRef = doc(db, "global", "stats");
onSnapshot(globalRef, (doc) => {
  if (doc.exists()) {
    globalTreeCount = doc.data().totalTrees || 0;
    totalTrees.textContent = globalTreeCount;
  }
});

// Escucha los cambios en el ranking
onSnapshot(doc(db, "users"), (querySnapshot) => {
  ranking.innerHTML = "";
  const users = [];
  querySnapshot.forEach((doc) => users.push({ name: doc.id, ...doc.data() }));
  users.sort((a, b) => b.trees - a.trees);
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.name}: ${user.trees} árboles`;
    ranking.appendChild(li);
  });
});