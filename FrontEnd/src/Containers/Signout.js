import { Auth } from "aws-amplify";
const Signout = async () => {
  try {
      console.log("session====");
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
};

export default Signout;
