import * as admin from 'firebase-admin';


const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountKey) {
    console.error("ERRO: A variável de ambiente FIREBASE_SERVICE_ACCOUNT não está definida.");
   
}


if (!admin.apps.length) {
    try {
        
        const serviceAccount = JSON.parse(serviceAccountKey!);

        admin.initializeApp({
           
            credential: admin.credential.cert(serviceAccount),
            
        });
        console.log("Firebase Admin SDK inicializado com sucesso.");
    } catch (error) {
        console.error("Falha ao inicializar o Firebase Admin SDK:", error);
    }
}


export const db = admin.firestore();

