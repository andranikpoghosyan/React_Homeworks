import { handleAdd } from "@/app/lib/actions/lecturers_actions";
import { ImagePicker } from "@/app/lib/components/image_viewer";

export default function Page() {
  return (
    <div>
      <h1 className="is-size-4">Add Lecturer</h1>
      <div>
        <div className="column is-two-fifths my-4">
          <form className="box" action={handleAdd}>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="name"
                placeholder="Enter a name"
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="surname"
                placeholder="Enter a surname"
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="age"
                placeholder="Enter age"
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="subject"
                placeholder="Enter a subject"
              />
            </div>
            <div className="field my-4">
              <ImagePicker />
            </div>
            <div className="field my-4">
              <button className="button is-danger">Add Lecturer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
