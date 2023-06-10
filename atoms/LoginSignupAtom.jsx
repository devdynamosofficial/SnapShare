import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const LoginSignupAtom = atom("toggle", false);

export default LoginSignupAtom;
