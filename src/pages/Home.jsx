import {InputForm} from "../components/InputForm.jsx";
import {ResultsDisplay} from "../components/ResultsDisplay.jsx";

export const Home = () => {
  return(
    <div className="flex flex-row items-center justify-between h-screen overflow-hidden bg-blue-400">
      <InputForm/>
      <ResultsDisplay/>
    </div>
  )

}