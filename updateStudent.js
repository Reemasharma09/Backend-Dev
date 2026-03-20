const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;   // URL se id aayegi
        const { name, branch } = req.body;

        let students = await db.readStudentsFromFile();

        if (!students || students.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        // student find karo
        const index = students.findIndex(s => s.id == id);

        if (index === -1) {
            return res.status(404).json({ message: "Student not found" });
        }

        // update fields (jo aaye hain wahi update karo)
        if (name) students[index].name = name;
        if (branch) students[index].branch = branch;

        students[index].updatedAt = new Date().toLocaleString();

        // file me wapas likho
        await db.writeStudentsToFile(students);

        res.status(200).json({
            message: "Student updated successfully",
            student: students[index]
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating student" });
    }
};