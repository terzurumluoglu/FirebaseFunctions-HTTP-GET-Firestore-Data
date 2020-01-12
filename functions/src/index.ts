import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
    let user: any[] = [];
    const prom = admin.firestore().collection('users').get();
    const p2 = prom.then(p => {
        p.docs.forEach(element => {
            console.log(element.data().name);
            user.push({
                'id' : element.data().id,
                'name' : element.data().name
            });
        });
        response.send(user);
    });
    p2.catch(e => {
        console.log(e);
        console.log('Hata');
        response.status(500).send(e);
    });
    // response.send('Hello from Firebase!\n\n');
});
