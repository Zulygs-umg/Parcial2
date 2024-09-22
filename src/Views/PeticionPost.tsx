import React, { useState } from "react";
import axios from "axios";
import "../assets/css/StylePost.css";

const CursoForm = () => {
  const [curso, setCurso] = useState({
    nombre: "",
    creditos: "",
    descripcion: "",
  });

  const MCambio = ({ target: { name, value } }) => {
    setCurso((prev) => ({ ...prev, [name]: value }));
  };

  const MEnvio = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://test-deploy-12.onrender.com/cursos",
        curso,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Curso ingresado correctamente");
      setCurso({ nombre: "", creditos: "", descripcion: "" });
      console.log(response);
    } catch (error) {
      alert("Error al ingresar el curso");
      console.error("Error:", error);
    }
  };
  const Limpiar = () => {
    setCurso({ nombre: "", creditos: "", descripcion: "" });
  };

  return (
    <div className="form-container">
      <h2>Agregar Curso</h2>
      <form onSubmit={MEnvio} className="form">
        {["nombre", "creditos", "descripcion"].map((field, index) => (
          <div key={field} className="inputGroup">
            <label className="label">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            {field === "descripcion" ? (
              <textarea
                name={field}
                value={curso[field]}
                onChange={MCambio}
                required
                className="textarea"
              />
            ) : (
              <input
                type={field === "creditos" ? "number" : "text"}
                name={field}
                value={curso[field]}
                onChange={MCambio}
                required
                className="input"
              />
            )}
          </div>
        ))}
        <div className="button-group">
          <button type="submit">Guardar</button>
          <button onClick={Limpiar}>Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default CursoForm;
