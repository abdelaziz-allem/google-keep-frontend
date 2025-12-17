export async function getNotes() {
  try {
    const response = await fetch(
      "https://google-keep-backend-production.up.railway.app/note"
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (err) {
    console.error("Error:");
  }
}

export async function CreateNote(noteData) {
  try {
    const response = await fetch(
      "https://google-keep-backend-production.up.railway.app/note/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:");
  }
}

export async function deleteNote(id) {
  try {
    const response = await fetch(
      `https://google-keep-backend-production.up.railway.app/note/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:");
  }
}
