import axios from 'axios';
export const Login = () => {
  console.log("running!");
  const handleLogin = async () => {
    await axios.get(`${import.meta.env.VITE_BE_PORT}/auth/github`);


  }
  return (
    <div className="flex flex-col h-screen text-3xl font-mono italic  text-center items-center justify-center align-middle font-bold bg-blue-200 overflow-hidden">
      <p>Welcome to your personal finance tracker! Log in below:</p>

      <a href={`${import.meta.env.VITE_BE_PORT}/auth/github`} className="mt-10 bg-black text-white rounded-xl text-lg h-[5rem] w-[10rem]">Log in </a>

    </div>
  );
};
