"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { auth, googleProvider } from "../config/config-firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup  } from "firebase/auth";
import { useRouter } from "next/navigation";

const Sign = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try{
      if (mode === "Login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/user");
    } catch(err) {
      console.error(err)
    }
  }

  const signInGoogle = async (e :React.MouseEvent) => {
    e.preventDefault();
    try{
      await signInWithPopup(auth, googleProvider);
    } catch(err) {
      console.error(err)
    }
  }

  const [mode, setMode] = useState<"Login" | "Register">("Login");
  

  const containerRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from([".login-title", ".form-element"], {
      opacity: 0,
      filter: "blur(10px)",
      x: -50,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      onComplete: () => {
        setIsAnimationComplete(true);
      }
    });
  }); 

  
  return () => ctx.revert();


}, []);
  return (
    <header ref={containerRef}>
      <div className="flex justify-center items-center h-screen w-full bg-[url('/hero-background.jpg')]  bg-top lg:bg-center xl:bg-top">
        <div className="backdrop-blur-md bg-white/10 shadow-lg h-110 w-90 md:w-120 lg:h-125 lg:w-90 rounded-2xl border border-white/40 transition-all duration-500 ease-in-out">
          <div className="grid grid-cols-1 grid-rows-[12%_88%] gap-5 md:gap-2  lg:gap-8 h-full w-full p-5 md:p-2 lg:p-10 rounded-2xl">
            <div className="flex justify-center">
              <h1 className="text-3xl font-roboto text-white login-title">Login</h1>
            </div>
            <form
            className=""
            action="">
             <div className="flex flex-col h-full w-full items-center gap-7 lg:gap-4">
               <div className="flex justify-center w-full form-element">
                <label
                 className="sr-only"
                 htmlFor="iemail">Email</label>
                <input 
                required
                autoFocus
                type="text" 
                id="iemail" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" 
                className="w-50 border rounded-4xl p-2 border-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div className="flex flex-col items-center justify-center form-element">
                  <label 
                  className="sr-only"
                  htmlFor="ipassword">Password</label>
                  <input 
                  required
                  type="password" 
                  id="ipassword"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  className=" w-50 border rounded-4xl p-2 border-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent " />
                  <div className="flex justify-end w-full mt-1">
                    <a
                    href="#"
                    className="text-gray-300 text-sm">
                    forgot password?
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <div className={`group bg-gradient-to-bl  hover:bg-gradient-to-r from-black/30 to-blue-400 w-20 text-center p-2 rounded-3xl my-0 lg:my-6 form-element hover:bg-blue-400 hover:cursor-pointer  ${isAnimationComplete ? 'transition-all duration-500 ease-in-out' : ''}`}>
                    <button
                    onClick={signIn}
                    className="text-white font-roboto font-bold group-hover:cursor-pointer group-hover:text-blue-200 font-roboto ">
                      {mode === "Login" ? "Login" : "Register"}
                    </button>
                  </div>
                    {mode === "Login" && (
                      <div className="form-element">
                        <button
                        onClick={signInGoogle}
                        className="text-white font-roboto font-bold group-hover:cursor-pointer group-hover:text-blue-200 font-roboto ">
                          Login with Google
                        </button>
                      </div>
                    )}
                </div>
                <div className="flex flex-col items-center gap-2 w-full form-element">
                  <div className=" flex items-center gap-2">
                      <label
                      className="text-white text-nowrap text-sm font-roboto"
                      htmlFor="iremember">Remember me</label>
                      <input
                      id="iremember"
                      name="remember"
                      className="checked"
                      type="checkbox" />
                  </div>
                  <div>
                    <button
                    type="button"
                    onClick={() => setMode(mode === "Login" ? "Register" : "Login")}
                    className="text-blue-600 text-sm cursor-pointer font-bold"
                    >
                      {mode === "Login" ? `Criar conta` : `Já tenho conta`}
                    </button>
                  </div>
                </div>
             </div>
            </form>
          </div>
        </div>
      </div> 
    </header>
  )
}

export default Sign