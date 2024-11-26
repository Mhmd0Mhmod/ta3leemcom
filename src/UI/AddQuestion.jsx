import Toolbar from "./Toolbar.jsx";

function AddQuestion() {
  return (
    <>
      <Toolbar />
      <div>
        <div>
          <input type="text" placeholder="اكتب سؤالك هنا ..." />
          <input type={"number"} className={}/>
        </div>
      </div>
    </>
  );
}

export default AddQuestion;
