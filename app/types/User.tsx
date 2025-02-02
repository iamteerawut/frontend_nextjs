export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  hasImage?: boolean;
  imagePath?: string;
}

export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newUser: Omit<User, "id"> & { file: File | null }) => void;
  user: User | null;
  onUpdateUser: (updatedUser: User & { file: File | null }) => void;
}

export interface UserTableProps {
  users: User[];
  handleEditUser: (id: number) => void;
  handleDeleteUser: (id: number) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}
