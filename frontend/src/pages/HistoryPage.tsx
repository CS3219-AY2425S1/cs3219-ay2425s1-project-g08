import { useParams } from "react-router-dom";
import { HistoryAttempt } from "../features/questions/types/HistoryAttempt";
import HistoryNavBar from "../components/navbars/HistoryNavBar";
import { useEffect, useState } from "react";
import apiConfig from "../config/config";
import ReadonlyReactEditor from "../features/history/ReadonlyReactEditor";

interface LabelProps {
  text: string; // Declare the prop type
}

const ComplexityLabel: React.FC<LabelProps> = ({ text }) => {
  return (
    <div className="rounded bg-green h-8 px-4 border-l-black-4 flex items-center">
      <div className="text-sm text-center font-semibold">{text}</div>
    </div>
  )
}

const CategoryLabel: React.FC<LabelProps> = ({ text }) => {
  return (
    <div className="rounded bg-orange-300 h-8 px-4 mx-2 border-l-black-4 flex items-center">
      <div className="text-sm text-center font-semibold">{text}</div>
    </div>
  )
}

const HistoryPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [attempt, setAttempt] = useState<HistoryAttempt>();
  
  useEffect(() => {
    fetch(`${apiConfig.historyServiceUrl}/attempt/${attemptId}`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": `${apiConfig.historyServiceUrl}`,
        },
      }
    ).then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`)
      }
      res.json()
        .then(data => {
          console.log(data);
          setAttempt(data)
        });
    });
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <HistoryNavBar />
        {
          !attempt
          ? <>Failed to obtain your history</>
          : <div className="flex flex-row">
              <div className="w-1/2">
                  <div className="flex flex-row justify-items-center mt-4">
                    <div className="text-2xl text-left font-bold px-2 mr-4">{attempt.title}</div>
                    <ComplexityLabel text={attempt.complexity}/>
                  </div>
                  <div className="flex flex-row flex-wrap justify-items-center mb-4">
                    {attempt.categories.map((category) => (
                      <CategoryLabel text={category} />
                    ))}
                  </div>
                <div className="max-w-full m-4">
                  <div className="text-wrap break-words">{attempt.description}</div>
                </div>
              </div>
              {/* Right side */}
              <div className="w-1/2">
                  <div className="font-bold text-xl text-center mb-2">Your attempt</div>
                  {/* <ReadonlyEditor /> */}
                  <ReadonlyReactEditor content={attempt.content}/>
              </div>
            </div>
        }
      </div>
    </>
  )
}

export default HistoryPage;