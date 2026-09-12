// Configuração do projeto Firebase usado para o login/sincronização opcional
// da coleção entre aparelhos (ver cloud-sync.js). Estes valores NÃO são
// segredos: a segurança de um projeto Firebase vem das regras do Firestore e
// do Authentication, não de esconder esta config — por isso é normal e
// esperado commitar este arquivo já preenchido (é o mesmo objeto que o
// próprio console do Firebase mostra para colar no seu site).
//
// Para trocar de projeto (ou configurar um do zero): console.firebase.google.com
// → seu projeto → ⚙️ Configurações do projeto → aba "Geral" → seção
// "Seus apps" → app Web → "Config" mostra este mesmo objeto.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDlsG2gwkFuwPoGgzXr7eJgm0PIgljm1f8",
  authDomain: "fortnite-sprites-locker.firebaseapp.com",
  projectId: "fortnite-sprites-locker",
  storageBucket: "fortnite-sprites-locker.firebasestorage.app",
  messagingSenderId: "864592463889",
  appId: "1:864592463889:web:d81efd73e035d8012149b0",
};
