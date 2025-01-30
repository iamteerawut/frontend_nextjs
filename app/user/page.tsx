"use client"

import { useEffect, useState } from "react";
import { User } from "../types/User";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import { getUsers, deleteUser } from "../actions/userAction";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, [])

  return (
    <div className="bg-gray-100 flex justify-center min-h-screen">
      <UserTable users={users} onAdd={handleAddUser} onEdit={handleEditUser} onDelete={handleDeleteUser} />

      {isModalOpen && (
        <UserModal user={selectedUser} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
export default Home;
