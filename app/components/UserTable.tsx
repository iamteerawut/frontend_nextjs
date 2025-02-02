import { User } from "../types/User";

interface UserTableProps {
  users: User[];
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (userId: number | undefined) => void;
}

export default function UserTable({
  users,
  onAdd,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => {
            onAdd();
          }}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="text-left text-sm font-medium text-gray-700 bg-gray-200">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {user.firstName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {user.lastName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
