import AddQuestion from "../../UI/AddQuestion.jsx";
import Questions from "../../UI/Questions.jsx";
import Toolbar from "../../UI/Toolbar.jsx";

function CreateTestOnline() {
  return (
    <div className="space-y-10">
      <Toolbar />
      <AddQuestion />
      <Questions />
    </div>
  );
}

export default CreateTestOnline;
