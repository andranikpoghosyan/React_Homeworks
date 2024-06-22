import Types from "prop-types";

export const UserList = ({ users, onDelete, onSalaryUp }) => {
  return (
    <div>
      <h1>UserList</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>surname</th>
            <th>salary</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((elem) => (
            <tr
              key={elem.id}
              className={
                parseInt(elem.salary) > 800000 ? "junioriAshxatavarc" : ""
              }
            >
              <td>{elem.id}</td>
              <td>{elem.name}</td>
              <td>{elem.surname}</td>
              <td>{elem.salary}</td>
              <td className="td_delete">
                <button
                  onClick={() => onDelete(elem.id)}
                  className="delete_btn"
                >
                  Delete user
                </button>
                <button
                  className="btn_salaryUp"
                  onClick={() => onSalaryUp(elem.id)}
                >
                  Salary Up
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserList.propTypes = {
  users: Types.arrayOf(
    Types.exact({
      id: Types.string,
      name: Types.string,
      surname: Types.string,
      salary: Types.any,
    })
  ),
  onDelete: Types.func,
};
