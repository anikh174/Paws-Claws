"use client";

interface Pet {
  _id: string;
  name: string;
  breed: string;
  status: string;
}

const ManageItems = ({ pets, onDelete }: { pets: Pet[], onDelete: (id: string, name: string) => void }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">Manage Pets</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[500px]"><thead>
          <tr className="bg-gray-50 text-sm uppercase text-gray-600">
            <th className="p-4">Name</th>
            <th className="p-4">Breed</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td className="p-4 font-semibold">{pet.name}</td>
              <td className="p-4">{pet.breed}</td>
              <td className="p-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs capitalize">
                  {pet.status}
                </span>
              </td>
              <td className="p-4">
                <button 
                  onClick={() => onDelete(pet._id, pet.name)} 
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody></table>
      </div>
      {pets.length === 0 && (
        <div className="p-6 text-center text-gray-500">No pets found.</div>
      )}
    </div>
  );
};

export default ManageItems;