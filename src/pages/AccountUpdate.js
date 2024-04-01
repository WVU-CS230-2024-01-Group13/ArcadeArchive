import { getAuth, updateEmail, sendEmailVerification, updatePassword, deleteUser } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    //are we doing email verification?
    const emailVerified = user.emailVerified;
    const uid = user.uid;
} else {
  // No user is signed in.
  //Prompt sign in? Should they even be able to get to this point?
}

const newEmail = //read in email;
//email input const
updateEmail(auth.currentUser, newEmail).then(() => {
    // Email updated!
    sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
  });
  }).catch((error) => {
    // An error occurred
    // ...
  });

const newPassword = getASecureRandomPassword();

updatePassword(user, newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});

deleteUser(user).then(() => {
    // User deleted.
  }).catch((error) => {
    // An error ocurred
    // ...
  });