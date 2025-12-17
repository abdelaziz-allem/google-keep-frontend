import { useEffect, useState } from "react";
import { CreateNote, deleteNote, getNotes } from "./lib/api/note";
import { Loader, Trash } from "lucide-react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    if (formData.title === "" || formData.content === "") return;
    await CreateNote(formData);
    setFormData({ title: "", content: "" });
    loadNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const loadNotes = async () => {
    setLoading(true);
    const notes = await getNotes();
    setNotes(notes);
    setLoading(false);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div
      className="flex flex-col items-center h-screen bg-slate-100"
      onClick={handleSave}
    >
      <div className="flex gap-2 justify-start items-center mt-10">
        <img src="keep.png" alt="" className="h-16 w-16" />
        <h1 className="text-4xl font-bold">Keep</h1>
      </div>
      <div className="flex flex-col justify-center mt-10 w-96">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="bg-slate-100 h-12 rounded-t-lg shadow-lg px-3"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          className="bg-slate-100 h-24 rounded-b-lg shadow-lg px-3"
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      {loading ? (
        <Loader className="animate-spin text-yellow-500 mt-10" size={45} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-12 w-full">
          {notes.map((note, index) => (
            <div
              key={index}
              className="border border-slate-400 hover:border-slate-700 rounded-xl p-4 relative"
            >
              <h3 className="font-semibold text-sm">{note.title}</h3>
              <p className="text-xs text-gray-600 mb-8">{note.content}</p>
              <button
                onClick={() => handleDelete(note._id)}
                className="absolute bottom-2 right-2"
              >
                <Trash className="text-red-400 cursor-pointer" size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
