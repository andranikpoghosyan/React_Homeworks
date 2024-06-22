import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const AddUser = ({ onAdd, onNotify, schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAdd = (data) => {
    axios.post("http://localhost:3004/users", data).then((res) => {
      onAdd(res.data);
      onNotify();
      reset();
    });
  };

  return (
    <div>
      <h1>AddUser</h1>
      <form onSubmit={handleSubmit(handleAdd)}>
        {errors.name && <p style={{ color: "red" }}>Please fill your name</p>}
        <label>name</label>
        <input {...register("name", { required: true })} />

        {errors.surname && (
          <p style={{ color: "red" }}>Please fill your surname</p>
        )}
        <label>surname</label>
        <input {...register("surname", { required: true })} />

        {errors.salary && (
          <p style={{ color: "red" }}>Please fill your salary</p>
        )}
        <label>salary</label>
        <input {...register("salary", { required: true })} />

        <button className="save_btn">save</button>
      </form>
    </div>
  );
};
